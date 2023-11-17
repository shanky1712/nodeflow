import React, { useState } from "react";
import 'react-modern-drawer/dist/index.css';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TextWidget from '././components/FormGrp/TextWidget'
import ImageWidget from '././components/FormGrp/ImageWidget'
import VideoWidget from '././components/FormGrp/VideoWidget'
import DocWidget from '././components/FormGrp/DocWidget'
import AudioWidget from '././components/FormGrp/AudioWidget'
import LocationWidget from '././components/FormGrp/LocationWidget'
import ContactWidget from '././components/FormGrp/ContactWidget'
import InteractiveWidget from '././components/FormGrp/InteractiveWidget'
import TemplateWidget from '././components/FormGrp/TemplateWidget'
const CustomForm = ({formData, setFormData, defaultTab, setDefaultTab}) => {
  const widgets = ["text_", "image_", "video_", "audio_", "doc_", "loc_", "contact_", "interactive_", "template_"];
  const handleTabSelect = key => {
    setDefaultTab(key)
    const filteredWidgets = widgets.filter(element => element !== key+'_');
    // setFormData({})
    // console.log("widgetkey")
    console.log(formData)
    // console.log(filteredWidgets)
    Object.keys(formData).forEach((k, i) => {
      filteredWidgets.map((widgetkey, index) => {
        if (k.indexOf(widgetkey) !== -1) {
          delete formData[k];
        }
      })
      console.log(k);
      // console.log(formData);
    });
   }
  return (
    <div>
      <Tabs defaultActiveKey={defaultTab} id="flow-form" className="mb-3" onSelect={handleTabSelect} >
        {/* Text */}
        <Tab eventKey="text" title="Text" >
          <TextWidget formData={formData} setFormData={setFormData} />
        </Tab>
        {/* Image */}
        <Tab eventKey="image" title="Image">
          <ImageWidget formData={formData} setFormData={setFormData} />
        </Tab>
        {/* Video */}
        <Tab eventKey="video" title="Video">
          <VideoWidget formData={formData} setFormData={setFormData} />
        </Tab>

        {/* Document */}
        <Tab eventKey="doc" title="Docs" >
          <DocWidget formData={formData} setFormData={setFormData} />
        </Tab>

        {/* Audio */}
        <Tab eventKey="audio" title="Audio" >
          <AudioWidget formData={formData} setFormData={setFormData} />
        </Tab>

        {/* Location */}
        <Tab eventKey="loc" title="Place" >
          <LocationWidget formData={formData} setFormData={setFormData} />
        </Tab>

        {/* Contact */}
        <Tab eventKey="contact" title="Contacts" >
          <ContactWidget formData={formData} setFormData={setFormData} />
        </Tab>

        {/* Interactive */}
        <Tab eventKey="interactive" title="Interactive" >
          <InteractiveWidget formData={formData} setFormData={setFormData} />
        </Tab>

        {/* Templates */}
        <Tab eventKey="template" title="Templates">
          <TemplateWidget formData={formData} setFormData={setFormData} />
        </Tab>
      </Tabs>
    </div>
  )
}
export default CustomForm