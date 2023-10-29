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
const CustomForm = () => {
    const handleSaveModal = () => { }
    const [defaultTab, setDefaultTab] = useState("text");
    return (
        <div>
          <Tabs defaultActiveKey = {defaultTab} id="uncontrolled-tab-example" className="mb-3" >
            {/* Text */}
            <Tab eventKey="text" title="Text" onClick={(e) => setDefaultTab("text")}>
              <TextWidget />
            </Tab>
            {/* Image */}
            <Tab eventKey="image" title="Image" onClick={(e) => setDefaultTab("image")}>
              <ImageWidget />
            </Tab>
            {/* Video */}
            <Tab eventKey="video" title="Video" onClick={(e) => setDefaultTab("video")}>
              <VideoWidget />
            </Tab>

            {/* Document */}
            <Tab eventKey="document" title="Docs" onClick={(e) => setDefaultTab("document")}>
              <DocWidget />
            </Tab>

            {/* Audio */}
            <Tab eventKey="audio" title="Audio" onClick={(e) => setDefaultTab("audio")}>
              <AudioWidget />
            </Tab>

            {/* Location */}
            <Tab eventKey="location" title="Place" onClick={(e) => setDefaultTab("location")}>
              <LocationWidget />
            </Tab>

            {/* Contact */}
            <Tab eventKey="contact" title="Contacts" onClick={(e) => setDefaultTab("contact")}>
              <ContactWidget/>
            </Tab>

            {/* Interactive */}
            <Tab eventKey="interactive" title="Interactive" onClick={(e) => setDefaultTab("interactive")}>
              <InteractiveWidget />
            </Tab>

            {/* Templates */}
            <Tab eventKey="templates" title="Templates" onClick={(e) => setDefaultTab("templates")}>
              <TemplateWidget/>
            </Tab>
          </Tabs>
      </div>
    )
}
export default CustomForm