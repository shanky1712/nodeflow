import React, { useState } from "react";
import 'react-modern-drawer/dist/index.css';

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
    // setFormData({})
    // console.log("widgetkey")
    // console.log(formData)
    // console.log(filteredWidgets)
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
      <Tabs defaultActiveKey={defaultTab} id="flow-form" className="mb-3" onSelect={handleTabSelect} >
        {/* Text */}
        <Tab eventKey="text" title="Text" >
        { (defaultTab === 'text') ? <TextWidget formData={formData} setFormData={setFormData} /> : <></> }
          {/* <TextWidget formData={formData} setFormData={setFormData} /> */}
        </Tab>
        {/* Image */}
        <Tab eventKey="image" title="Image">
          { (defaultTab === 'image') ? <ImageWidget formData={formData} setFormData={setFormData} /> : <></> }
          {/* <ImageWidget formData={formData} setFormData={setFormData} /> */}
        </Tab>
        {/* Video */}
        {/* <Tab eventKey="video" title="Video">
          { (defaultTab === 'video') ? <VideoWidget formData={formData} setFormData={setFormData} /> : <></> }
        </Tab> */}

        {/* Document */}
        <Tab eventKey="doc" title="Docs" >
          { (defaultTab === 'doc') ? <DocWidget formData={formData} setFormData={setFormData} /> : <></> }
          {/* <DocWidget formData={formData} setFormData={setFormData} /> */}
        </Tab>

        {/* Audio */}
        {/* <Tab eventKey="audio" title="Audio" >
          { (defaultTab === 'audio') ? <AudioWidget formData={formData} setFormData={setFormData} /> : <></> }
        </Tab> */}

        {/* Location */}
        <Tab eventKey="loc" title="Place" >
          { (defaultTab === 'loc') ? <LocationWidget formData={formData} setFormData={setFormData} /> : <></> }
          {/* <LocationWidget formData={formData} setFormData={setFormData} /> */}
        </Tab>

        {/* Contact */}
        {/* <Tab eventKey="contact" title="Contacts" >
          { (defaultTab === 'contact') ? <ContactWidget formData={formData} setFormData={setFormData} /> : <></> }
        </Tab> */}

        {/* Interactive */}
        <Tab eventKey="interactive" title="Interactive" >
          { (defaultTab === 'interactive') ? <InteractiveWidget formData={formData} setFormData={setFormData} /> : <></> }
          {/* <InteractiveWidget formData={formData} setFormData={setFormData} /> */}
        </Tab>

        {/* Templates */}
        {/* <Tab eventKey="template" title="Templates">
          { (defaultTab === 'template') ? <TemplateWidget formData={formData} setFormData={setFormData} /> : <></> }
        </Tab> */}
      </Tabs>
    </div>
  )
}
export default CustomForm
