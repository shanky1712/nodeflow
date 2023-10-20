import { useCallback, useState, useEffect, memo } from 'react';
import { Handle, Position, useUpdateNodeInternals, NodeToolbar } from 'reactflow';
import Popup from './components/modal/Popup';
import CustomForm from './CustomForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function CustomNode({ id, data, isConnectable, onConfigNode, onDeleteNode }) {
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

  const [isNewsletterModalOpen, setNewsletterModalOpen] = useState(false)
  const handleOpenNewsletterModal = () => {
    setNewsletterModalOpen(true)
  }

  const handleCloseNewsletterModal = () => {
    setNewsletterModalOpen(false)
  }

  const handleSubmit = () => { }
  return (
    <>
      <NodeToolbar>
        <button onClick={() => onDeleteNode(id)} className='raw-btn danger'>
          <FontAwesomeIcon icon="fa-solid fa-trash" />
        </button>
        {/* <button onClick={() => onConfigNode(id)} className='raw-btn dark'>
          <FontAwesomeIcon icon="fa-solid fa-gear" />
        </button> */}
        <button onClick={() => handleOpenNewsletterModal()} className='raw-btn dark'>
          <FontAwesomeIcon icon="fa-solid fa-gear" />
        </button>
      </NodeToolbar>
      Custom Node
      <Popup hasCloseBtn={true} isOpen={isNewsletterModalOpen} onClose={handleCloseNewsletterModal}>
        <button  className='raw-btn success' onClick={() => setSourceHandles([...sourceHandles, {}])}>
          <FontAwesomeIcon icon="fa-solid fa-grip-vertical" />
        </button>
        <CustomForm/>
      </Popup>
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

export default memo(CustomNode);