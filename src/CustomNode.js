import { useCallback, useState, useEffect, memo } from 'react';
import { Handle, Position, useUpdateNodeInternals, NodeToolbar } from 'reactflow';
import Popup from './components/modal/Popup';
import CustomForm from './CustomForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function CustomNode({ id, data, isConnectable, onDeleteNode }) {
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

  return (
    <>
      <NodeToolbar>
        <button onClick={() => onDeleteNode(id)} className='raw-btn danger'>
          <FontAwesomeIcon icon="fa-solid fa-trash" />
        </button>
        <button onClick={() => handleOpenNewsletterModal()} className='raw-btn dark'>
          <FontAwesomeIcon icon="fa-solid fa-gear" />
        </button>
      </NodeToolbar>
      Cus.{data.label}
      {/* <div className="speech-wrapper">
        <div className="bubble">
          <div className="txt">
            <p className="name"><FontAwesomeIcon icon="fa-solid fa-user" /> Benni</p>
            <p className="message">Hey, check out this Pure CSS speech bubble...</p>
            <span className="timestamp">10:20 pm</span>
          </div>
          <div className="bubble-arrow"></div>
        </div>
        <div className="bubble alt">
          <div className="txt">
            <p className="name alt">+353 87 1234 567<span> ~ John</span></p>
            <p className="message">Nice... this will work great for my new project.</p>
            <span className="timestamp">10:22 pm</span>
          </div>
          <div className="bubble-arrow alt"></div>
        </div>
      </div>       */}
      <Popup isOpen={isNewsletterModalOpen} onClose={handleCloseNewsletterModal} sourceHandles={sourceHandles} setSourceHandles={setSourceHandles}>
        {/* <button className='raw-btn success' onClick={() => setSourceHandles([...sourceHandles, {}])}>
          <FontAwesomeIcon icon="fa-solid fa-grip-vertical" />
        </button> */}
        <CustomForm />
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
            style={{ top: 40 + 15 * index }}
          />
        </div>
      ))}
    </>
  );
}

export default memo(CustomNode);
