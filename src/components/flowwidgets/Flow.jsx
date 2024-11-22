import {useNavigate, useParams} from "react-router-dom";
import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import {useStateContext} from "../../context/ContextProvider";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  updateEdge,
  Controls,
  Panel,
  Background,
  useReactFlow,
  MarkerType,
  ReactFlowProvider,
} from 'reactflow';
// import BlockDrawer from './components/flowwidgets/BlockDrawer';
import axiosClient from "../../axios-client"
import ContextMenu from './ContextMenu';
import { initialEdges, initialNodes } from './nodes-and-edges';
import ButtonEdge from './ButtonEdge';
import CustomNode from './CustomNode';
import 'reactflow/dist/style.css';
import './flow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TriggerPopup from './modal/TriggerPopup';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const flowKey = 'example-flow';
const proOptions = { hideAttribution: false }
const edgeTypes = { buttonedge: ButtonEdge, };

const InteractionFlow = () => {
  // const nodeTypes = {customNode: CustomNode};
  const navigate = useNavigate();
  let {id} = useParams();
  const [loading, setLoading] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  if (id) {
    useEffect(() => {
      setLoading(true)
      setIsLocked(true)
      axiosClient.get(`/flows/${id}`)
        .then(({data}) => {
          // console.log(data);
          if (typeof data.message != "undefined") {
            setNotification([data.message,"success"])
          }
          setLoading(false)
          if (data.data) {
            const { x = 0, y = 0, zoom = 0.1 } = data.data.viewport;
            setNodes(data.data.nodes || []);
            setEdges(data.data.edges || []);
            setViewport({ x, y, zoom });
            // setNotification('Flow loaded successfully !!!')
          }
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }
  const nodeTypes = useMemo(
    () => ({
      customNode: (props) => <CustomNode onConfigNode={onConfigNode} onDeleteNode={onDeleteNode} {...props} />,
    }), []
  );
  const onAddHandle = curNId => {
    // console.log('Current NID: ' + curNId);
  }
  const onConfigNode = curNid => {
    setCurrentNodeId(curNid);
    toggleDrawer();
  }

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const {setNotification} = useStateContext();

  const reactFlow = useReactFlow()
  const onDeleteNode = id => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
    setEdges((edges) => edges.filter((edge) => edge.target !== id));
  };
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), [setEdges]);
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
      // console.log('On Save');
      const flow = rfInstance.toObject();
      if ( flow.nodes[0].data.formData.flow_title ) {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const bodyParameters = {
          "title": "Testing",
          "data": flow
        };
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        axiosClient.post('/flows', bodyParameters, config)
          .then((data) => {
            setNotification([data.message,"success"])
            navigate(`/flows/new/?token=${token}`)
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors)
            }
          })
      }
      else{
        setNotification(["Input trigger node data needs to be updated!","error"])
      }
      // localStorage.setItem(flowKey, JSON.stringify(flow));
      // const flow1 = JSON.parse(localStorage.getItem(flowKey));
      // console.log(flow1);
    }
  }, [rfInstance]);

  const onUpdate = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const token = localStorage.getItem('ACCESS_TOKEN');
      const bodyParameters = {
        "title": "Testing",
        "data": flow
      };
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      axiosClient.put(`/flows/${id}`, bodyParameters, config)
        .then((data) => {
          // console.log(data.data.message);
          if (typeof data.data.message != "undefined") {
            setNotification([data.data.message,"success"])
          }
          // setNotification('flows was successfully updated')
          navigate(`/flows/${id}?token=${token}`)
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
      // localStorage.setItem(flowKey, JSON.stringify(flow));
      // const flow1 = JSON.parse(localStorage.getItem(flowKey));
      // console.log(flow1);
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

  const [inputNodeData, setInputNodeData] = useState('');

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  const onNodeClick = (event, node) => {
    // setCurrentNode(node);
    if (node.type == "input") {
      setInputNodeData(node)
      handleOpenNewsletterModal()
    }
    // console.log(node)
    // toggleDrawer();
  }
  // New changes end------------------------

  const yPos = useRef(0);
  const xPos = useRef(0);
  const addNode = useCallback(() => {
    xPos.current += 50;
    yPos.current += 50;
    setNodes((nodes) => {
      // console.log(nodes);
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
      // console.log(nodes);
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
  const { setViewport } = useReactFlow();
  // const onRestore = useCallback(() => {
  //   const restoreFlow = async () => {
  //     const flow = JSON.parse(localStorage.getItem(flowKey));
  //     console.log(flow)
  //     if (flow) {
  //       const { x = 0, y = 0, zoom = 1 } = flow.viewport;
  //       setNodes(flow.nodes || []);
  //       setEdges(flow.edges || []);
  //       setViewport({ x, y, zoom });
  //       setNotification('Restored successfully !!!')
  //     }
  //   };

  //   restoreFlow();
  // }, [setNodes, setViewport]);

  const [isNewsletterModalOpen, setNewsletterModalOpen] = useState(false)
  const handleOpenNewsletterModal = () => {
    setNewsletterModalOpen(true)
  }

  const handleCloseNewsletterModal = () => {
    setNewsletterModalOpen(false)
  }
  setViewport({
    x: 280,
    y: 280,
    zoom: 1,
  });
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
      nodesConnectable={!isLocked}
      nodesDraggable={!isLocked}
      elementsSelectable={!isLocked}
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
      <TriggerPopup inputNodeData={inputNodeData} isOpen={isNewsletterModalOpen} onClose={handleCloseNewsletterModal} />
      <Background />
      {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
      <Panel position="top-left">
        {/* <nav class="navbar navbar-light bg-light">
          <div class="container">
            <a class="navbar-brand" href="https://127.0.0.1:8000/automation/waflows">
              <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
            </a>
          </div>
        </nav>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title={(<FontAwesomeIcon icon="fa-solid fa-bars" />)} id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    <Button onClick={addNode} variant="secondary">
                      <FontAwesomeIcon icon="fa-solid fa-arrows-h" /> Custom
                    </Button>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    <Button onClick={addTargetNode} variant="danger">
                      <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> End
                    </Button>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar> */}
        <Button onClick={addNode} variant="secondary">
          <FontAwesomeIcon icon="fa-solid fa-arrows-h" /> Custom
        </Button>
        &nbsp;
        <Button onClick={addTargetNode} variant="danger">
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> End
        </Button>

        {/* <BlockDrawer currentNodeId={currentNodeId} isOpen={isOpen} toggleDrawer={toggleDrawer} onAddHandle={onAddHandle} /> */}
      </Panel>
      <Panel position='top-right'>
        {/* <Button onClick={onRestore} variant="primary">
          <FontAwesomeIcon icon="fa-solid fa-save" /> restore
        </Button> */}
        {id &&
          <Button onClick={onUpdate} variant="primary">
            <FontAwesomeIcon icon="fa-solid fa-save" /> Update
          </Button>
        }
        &nbsp;
        {!id &&
          <Button onClick={onSave} variant="success">
            <FontAwesomeIcon icon="fa-solid fa-save" /> Save
          </Button>
        }
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
