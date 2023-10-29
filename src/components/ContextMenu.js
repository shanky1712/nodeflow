import React, { useCallback } from 'react';
import { useReactFlow } from 'reactflow';

export default function ContextMenu({ id, top, left, right, bottom, ...props }) {
  const { getNode, setNodes, addNodes, getEdges, setEdges } = useReactFlow();
  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
    console.log('nodes')
    console.log(getNode)
    console.log('edges')
    console.log(getEdges)    
  }, [id, setNodes, setEdges]);

  return (
    <div style={{ top, left, right, bottom }} className="context-menu" {...props}>
      <p style={{ margin: '0.5em' }}>
        <small>node: {id}</small>
      </p>
      <button onClick={deleteNode}>delete</button>
    </div>
  );
}
