import React, { useState, useCallback, useRef, useMemo, memo } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  updateEdge,
  removeElements,
  Controls,
  Panel,
  Background,
  useReactFlow,
  MarkerType,
  ReactFlowProvider,
  applyEdgeChanges,
  applyNodeChanges,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from 'reactflow';
// import BlockDrawer from './components/BlockDrawer';
import ContextMenu from './components/ContextMenu';
import { initialEdges, initialNodes } from './components/nodes-and-edges';
import ButtonEdge from './ButtonEdge';
import CustomNode from './CustomNode';
import 'reactflow/dist/style.css';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const flowKey = 'example-flow';
const proOptions = { hideAttribution: true }
const edgeTypes = { buttonedge: ButtonEdge, };

const InteractionFlow = () => {
  // const nodeTypes = {customNode: CustomNode};
  const nodeTypes = useMemo(
    () => ({
      customNode: (props) => <CustomNode onConfigNode={onConfigNode} onDeleteNode={onDeleteNode} nodes={nodes} setNodes={setNodes} {...props} />,
    }), []
  );
  const onAddHandle = curNId => {
    console.log('Current NID: ' + curNId);
  }
  const onConfigNode = curNid => {
    setCurrentNodeId(curNid);
    toggleDrawer();
  }

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlow = useReactFlow()
  const onDeleteNode = id => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
    setEdges((edges) => edges.filter((edge) => edge.target !== id));
  };
  console.log(nodes)
  console.log(edges)
  // const [nodes, setNodes] = useState(initialNodes);
  // const [edges, setEdges] = useState(initialEdges);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);

  // const onNodesChange = useCallback(
  //   (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
  //   [setNodes]
  // );
  // const onEdgesChange = useCallback(
  //   (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  //   [setEdges]
  // );
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), [setEdges]);

  // const onNodesDelete = useCallback(
  //   (deleted) => {
  //     setEdges(
  //       deleted.reduce((acc, node) => {
  //         const incomers = getIncomers(node, nodes, edges);
  //         const outgoers = getOutgoers(node, nodes, edges);
  //         const connectedEdges = getConnectedEdges([node], edges);

  //         const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

  //         const createdEdges = incomers.flatMap(({ id: source }) =>
  //           outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
  //         );

  //         return [...remainingEdges, ...createdEdges];
  //       }, edges)
  //     );
  //   },
  //   [nodes, edges]
  // );  
  const [captureZoomClick, setCaptureZoomClick] = useState(true);
  const [captureElementClick, setCaptureElementClick] = useState(true);
  const defaultEdgeOptions = { animated: true, markerEnd: { type: MarkerType.Arrow }, type: 'buttonedge', };

  const edgeUpdateSuccessful = useRef(true);
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);
  const onSave = useCallback(() => {
    if (rfInstance) {
      console.log('On Save');
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      const flow1 = JSON.parse(localStorage.getItem(flowKey));
      console.log(flow1);
    }
  }, [rfInstance]);

  const onNodeContextMenu = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom: event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu])
  // New changes start------------------------
  const [currentNodeId, setCurrentNodeId] = useState('');
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  const onNodeClick = (event, node) => {
    // setCurrentNode(node);
    // toggleDrawer();
  }
  // New changes end------------------------

  const yPos = useRef(0);
  const xPos = useRef(0);
  const addNode = useCallback(() => {
    xPos.current += 50;
    yPos.current += 50;
    setNodes((nodes) => {
      console.log(nodes);
      const nC = nodes.length;
      return [
        ...nodes,
        {
          id: 'interaction-' + (nC + 1),
          sourcePosition: 'right',
          targetPosition: 'left',
          type: 'customNode',
          position: { x: xPos.current, y: yPos.current },
          data: { label: "Node " + (nC + 1) }
        }
      ];
    });
  }, []);
  const addTargetNode = useCallback(() => {
    xPos.current += 50;
    yPos.current += 50;
    setNodes((nodes) => {
      console.log(nodes);
      const nC = nodes.length;
      return [
        ...nodes,
        {
          id: 'interaction-' + (nC + 1),
          sourcePosition: 'right',
          targetPosition: 'left',
          type: 'output',
          position: { x: xPos.current, y: yPos.current },
          data: { label: "End" }
        }
      ];
    });
  }, []);
  return (

    <ReactFlow
      nodes={nodes}
      ref={ref}
      edges={edges}
      // onNodesDelete={onNodesDelete}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onEdgeUpdate={onEdgeUpdate}
      onEdgeUpdateStart={onEdgeUpdateStart}
      onEdgeUpdateEnd={onEdgeUpdateEnd}
      nodesConnectable={true}
      nodesDraggable={true}
      zoomOnScroll={true}
      zoomOnDoubleClick={true}
      onConnect={onConnect}
      onNodeClick={captureElementClick ? onNodeClick : undefined}
      defaultEdgeOptions={defaultEdgeOptions}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      // onNodeDragStart={onNodeDragStart}
      // onNodeDragStop={onNodeDragStop}
      panOnDrag={true}
      onPaneContextMenu={captureElementClick ? onNodeClick : undefined}
      onPaneClick={onPaneClick}
      // onNodeContextMenu={onNodeContextMenu}
      fitView
      proOptions={proOptions}
      onInit={setRfInstance}
    >
      {/* <MiniMap /> */}
      <Controls />
      <Background />
      {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
      <Panel position="top-left">
        <Button onClick={addNode} variant="secondary">
          <FontAwesomeIcon icon="fa-solid fa-arrows-h" /> Custom
        </Button>
        &nbsp;
        <Button onClick={addTargetNode} variant="secondary">
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> End
        </Button>
        {/* <BlockDrawer currentNodeId={currentNodeId} isOpen={isOpen} toggleDrawer={toggleDrawer} onAddHandle={onAddHandle} /> */}
      </Panel>
      <Panel position='top-right'>
        <Button onClick={onSave} variant="secondary">
          <FontAwesomeIcon icon="fa-solid fa-save" /> Save
        </Button>
      </Panel>
    </ReactFlow>

  );
};

export default function () {
  return (
    <ReactFlowProvider>
      <InteractionFlow />
    </ReactFlowProvider>
  );
}

library.add(fas)
// export default memo(InteractionFlow);
