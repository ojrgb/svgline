import React from 'react';
import Modal from '../Modal';
import { contextStore } from 'Context/contextStore'


function LoadPackageModal(props) {
  const {contextState,contextDispatch, getSingle} = React.useContext(contextStore)
  
  const onConfirm = () => {
    const targetPackage = getSingle('packages',contextState.selectedPackages.paths)
    
    
    props.onClose()
  }
  return (
    <Modal {...props} onConfirm={onConfirm}>
        {/* <EntityList entity='packages' module='context' load df={Date.now()}/> */}
    </Modal>    
  );
}

export default LoadPackageModal;
