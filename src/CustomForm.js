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
  const handleTabSelect = key => {
    setDefaultTab(key)
    setFormData({})
   }
  // console.log(defaultTab)
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
        <Tab eventKey="document" title="Docs" >
          <DocWidget formData={formData} setFormData={setFormData} />
        </Tab>

        {/* Audio */}
        <Tab eventKey="audio" title="Audio" >
          <AudioWidget formData={formData} setFormData={setFormData} />
        </Tab>

        {/* Location */}
        <Tab eventKey="location" title="Place" >
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
        <Tab eventKey="templates" title="Templates">
          <TemplateWidget formData={formData} setFormData={setFormData} />
        </Tab>
      </Tabs>
    </div>
  )
}
export default CustomForm