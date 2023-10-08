import { useCallback, useState, useEffect, memo } from 'react';
import { Handle, Position, useUpdateNodeInternals, NodeToolbar } from 'reactflow';

function TextUpdaterNode({ id, data, isConnectable, onConfigNode, onDeleteNode }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  const updateNodeInternals = useUpdateNodeInternals();
  const [sourceHandles, setSourceHandles] = useState([]);
  useEffect(() => {
    sourceHandles.map((sourceHandle, index) => {
        updateNodeInternals(`handle-${index}`)
    })
  }, [sourceHandles]);

  return (
    <>
      <NodeToolbar>
        <button onClick={() => onDeleteNode(id)}>Delete</button>
        <button onClick={() => onConfigNode(id)}>Config</button>
        <button onClick={() => setSourceHandles([...sourceHandles, {}])}>Add Handle</button>
      </NodeToolbar>
      Custom Node
      <Handle type="target" position={Position.Left} />
      {sourceHandles.map((sourceHandle, index) => (
        <div key={(index + 100)}>
            <div style={{ height: 16 }}>Handle {index}</div>
            <Handle
                type="source"
                onConnect={(params) => console.log('Handle Connect', params)}
                position={Position.Right}
                isConnectable={isConnectable}
                id={`handle-${index}`}
                style={{ top: 30 + 15 * index }}
            />
        </div>
      ))}
    </>
  );
}

export default memo(TextUpdaterNode);
