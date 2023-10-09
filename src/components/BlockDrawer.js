import React from 'react';

// import component 👇
import Drawer from 'react-modern-drawer';
import WaForm from './WaForm';
//import styles 👇
import 'react-modern-drawer/dist/index.css';

const BlockDrawer = ({currentNodeId, isOpen, toggleDrawer, onAddHandle}) => {
    return (
        <Drawer open={isOpen} onClose={toggleDrawer} direction='bottom' className='blockdrawer'>
            <WaForm onAddHandle={onAddHandle} currentNodeId={currentNodeId} />
            {currentNodeId}
        </Drawer>
    )
}

export default BlockDrawer