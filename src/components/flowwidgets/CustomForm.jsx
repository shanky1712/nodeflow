import React, { useState } from "react";
import 'react-modern-drawer/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TextWidget from './FormGrp/TextWidget'
import ImageWidget from './FormGrp/ImageWidget'
import VideoWidget from './FormGrp/VideoWidget'
import DocWidget from './FormGrp/DocWidget'
import AudioWidget from './FormGrp/AudioWidget'
import LocationWidget from './FormGrp/LocationWidget'
import ContactWidget from './FormGrp/ContactWidget'
import InteractiveWidget from './FormGrp/InteractiveWidget'
import TemplateWidget from './FormGrp/TemplateWidget'
const CustomForm = ({formData, setFormData, defaultTab, setDefaultTab}) => {
  const widgets = ["text_", "image_", "video_", "audio_", "doc_", "loc_", "contact_", "interactive_", "template_"];
  const handleTabSelect = key => {
    setDefaultTab(key)
    const filteredWidgets = widgets.filter(element => element !== key+'_');
    Object.keys(formData).forEach((k, i) => {
      filteredWidgets.map((widgetkey, index) => {
        if (k.indexOf(widgetkey) !== -1) {
          delete formData[k];
        }
      })
    });
   }
  return (
    <div>
      <Tabs fill defaultActiveKey={defaultTab} id="flow-form" className="mb-3" onSelect={handleTabSelect} >
        {/* Text */}
        <Tab eventKey="text" title={<><img src="../../assets/icons/text.svg" className="tabsIcon" /><div className="tabsText">Text</div></>} >
        { (defaultTab === 'text') ? <TextWidget formData={formData} setFormData={setFormData} /> : <></> }
          {/* <TextWidget formData={formData} setFormData={setFormData} /> */}
        </Tab>
        {/* Image */}
        <Tab eventKey="image" title={<><img src="../../assets/icons/image.svg" className="tabsIcon" /><div className="tabsText">Image</div></>}>
          { (defaultTab === 'image') ? <ImageWidget formData={formData} setFormData={setFormData} /> : <></> }
          {/* <ImageWidget formData={formData} setFormData={setFormData} /> */}
        </Tab>
        {/* https://www.svgrepo.com/svg/106661/interactive */}


        {/* Document */}
        <Tab eventKey="doc" title={<><img src="../../assets/icons/documents.svg" className="tabsIcon" /><div className="tabsText">Document</div></>} >
          { (defaultTab === 'doc') ? <DocWidget formData={formData} setFormData={setFormData} /> : <></> }
          {/* <DocWidget formData={formData} setFormData={setFormData} /> */}
        </Tab>

        {/* Video */}
        {/* <Tab eventKey="video" title={<><img src="../../assets/icons/video.svg" className="tabsIcon" /><div className="tabsText">Video</div></>}>
          { (defaultTab === 'video') ? <VideoWidget formData={formData} setFormData={setFormData} /> : <></> }
        </Tab> */}

        {/* Audio */}
        {/* <Tab eventKey="audio" title={<><img src="../../assets/icons/audio.svg" className="tabsIcon" /><div className="tabsText">Audio</div></>} >
          { (defaultTab === 'audio') ? <AudioWidget formData={formData} setFormData={setFormData} /> : <></> }
        </Tab> */}

        {/* Location */}
        <Tab eventKey="loc" title={<><img src="../../assets/icons/place.svg" className="tabsIcon" /><div className="tabsText">Place</div></>} >
          { (defaultTab === 'loc') ? <LocationWidget formData={formData} setFormData={setFormData} /> : <></> }
          {/* <LocationWidget formData={formData} setFormData={setFormData} /> */}
        </Tab>

        {/* Interactive */}
        <Tab eventKey="interactive" title={<><img src="../../assets/icons/interactive.svg" className="tabsIcon"/><div className="tabsText">Options</div></>} >
          { (defaultTab === 'interactive') ? <InteractiveWidget formData={formData} setFormData={setFormData} /> : <></> }
          {/* <InteractiveWidget formData={formData} setFormData={setFormData} /> */}
        </Tab>

        {/* Contact */}
        {/* <Tab eventKey="contact" title={<><img src="../../assets/icons/contact.svg" className="tabsIcon" /><div className="tabsText">Contact</div></>} >
          { (defaultTab === 'contact') ? <ContactWidget formData={formData} setFormData={setFormData} /> : <></> }
        </Tab> */}

        {/* Templates */}
        <Tab eventKey="template" title={<><img src="../../assets/icons/template.svg" className="tabsIcon" /><div className="tabsText">Template</div></>}>
          { (defaultTab === 'template') ? <TemplateWidget formData={formData} setFormData={setFormData} /> : <></> }
        </Tab>

        {/* Flows */}
        {/* <Tab eventKey="template" title={<><img src="../../assets/icons/flow.svg" className="tabsIcon" /><div className="tabsText">Flow</div></>}>
          { (defaultTab === 'template') ? <TemplateWidget formData={formData} setFormData={setFormData} /> : <></> }
        </Tab> */}
      </Tabs>
    </div>
  )
}
export default CustomForm
