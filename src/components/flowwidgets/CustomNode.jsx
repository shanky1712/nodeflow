import { useCallback, useState, useEffect, memo } from 'react';
import { Handle, Position, useUpdateNodeInternals, NodeToolbar } from 'reactflow';
import Popup from './modal/Popup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function CustomNode({ id, data, isConnectable, onDeleteNode }) {

  const updateNodeInternals = useUpdateNodeInternals();
  const [sourceHandles, setSourceHandles] = useState([]);
  const handles = data.handles || [];
  useEffect(() => {
    handles.map((sourceHandle, index) => {
      updateNodeInternals(`handle-${index}`)
    })
  }, [handles]);

  const [isNewsletterModalOpen, setNewsletterModalOpen] = useState(false)
  const handleOpenNewsletterModal = () => {
    setNewsletterModalOpen(true)
  }

  const handleCloseNewsletterModal = () => {
    setNewsletterModalOpen(false)
  }
  let body = ''
  const nodeLbl = () => {
    switch (data.formType) {
      case "text":
        
        body = data.formData.text_bodyTxt ? data.formData.text_bodyTxt : "Text Node"
        var trimmedString = body.substring(0, 50);
        return trimmedString+".."
      case "image":
        
        body = data.formData.image_captionTxt ? data.formData.image_captionTxt : "Image Node"
        var trimmedString = body.substring(0, 50);
        return trimmedString+".."
      case "audio":
        
        var trimmedString = "Audio Nodde";
        return trimmedString+".."
      case "video":
        
        body = data.formData.video_captionTxt ? data.formData.video_captionTxt : "Video Node"
        var trimmedString = body.substring(0, 50);
        return trimmedString+".."
      case "doc":
        
        body = data.formData.doc_fileName ? data.formData.doc_fileName : "Document Node"
        var trimmedString = body.substring(0, 50);
        return trimmedString+".."
      case "loc":
        
        body = data.formData.loc_name ? data.formData.loc_name : "Location Node"
        var trimmedString = body.substring(0, 50);
        return trimmedString+".."
      case "contact":
        
        body = data.formData.contact_firstName ? data.formData.contact_firstName : "Contact Node"
        var trimmedString = body.substring(0, 50);
        return trimmedString+".."
      case "interactive":
        
        body = data.formData.interactive_interactiveBody ? data.formData.interactive_interactiveBody : "Interactive Node"
        var trimmedString = body.substring(0, 50);
        return trimmedString+".."
      case "template":
        
        body = "Template Node"
        var trimmedString = body.substring(0, 50);
        return trimmedString+".."
      default:
        return "Node"
    }
  }
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div className="speech-wrapper">
        <div className="bubble">
          <div className="txt">
            <p className="name"><FontAwesomeIcon icon="fa-solid fa-user" /> User</p>
            <p className="message">{nodeLbl()}</p>
            <span className="timestamp">10:20 pm</span>
          </div>
          <div className="bubble-arrow"></div>
        </div>
      </div>
    </Tooltip>
  );
  return (
    <>
      <NodeToolbar>
        <button onClick={() => onDeleteNode(id)} className='raw-btn danger'>
          <FontAwesomeIcon icon="fa-solid fa-trash" />
        </button>
        <button onClick={() => handleOpenNewsletterModal()} className='raw-btn dark'>
          <FontAwesomeIcon icon="fa-solid fa-gear" />
        </button>
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <button className='raw-btn dark'>
            <FontAwesomeIcon icon="fa-solid fa-circle-info" />
          </button>
        </OverlayTrigger>
      </NodeToolbar>
      <div className='nodeLbl'>{nodeLbl()}</div>
      <Popup getData={data} isOpen={isNewsletterModalOpen} onClose={handleCloseNewsletterModal} />
      <Handle type="target" position={Position.Left} />

      {handles.map((handleData, index) => (
        <div key={(index + 100)}>
          <div className='handleLbl'>{handleData.label}</div>
          <Handle
            position={Position.Right}
            key={handleData.id}
            isConnectable={isConnectable}
            id={`handle-${index}`}
            type={handleData.type}
            style={{ top: 55 + 15 * index }}
          />
        </div>
      ))}
    </>
  );
}

export default memo(CustomNode);