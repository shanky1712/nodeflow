import React from 'react';

// import component 👇
import Drawer from 'react-modern-drawer';
import WaForm from './WaForm';
//import styles 👇
import 'react-modern-drawer/dist/index.css';

const BlockDrawer = ({currentNodeId, isOpen, toggleDrawer}) => {
    return (
        <Drawer open={isOpen} onClose={toggleDrawer} direction='right' className='blockdrawer'>
            <WaForm/>
            {currentNodeId}
        </Drawer>
    )
}

export default BlockDrawer