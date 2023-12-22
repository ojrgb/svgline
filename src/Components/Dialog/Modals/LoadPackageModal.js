import React from 'react';
import Modal from '../Modal';
import EntityList from 'Components/EntityList';
import { entitiesStore } from 'Context/entitiesStore.js'
import { contextStore } from 'Context/contextStore.js'


function LoadPackageModal(props) {
  const {entitiesState,entitiesDispatch} = React.useContext(entitiesStore)
  const {contextState,contextDispatch, getSingle} = React.useContext(contextStore)
  
  const onConfirm = () => {
    const targetPackage = getSingle('packages',contextState.selectedPackages.paths)
    console.log('Loading selected packages:', targetPackage);
    
    entitiesDispatch({
      type:'RESET'
    })
    entitiesDispatch({
      type:'REPLACE',
      data: targetPackage
    })
    props.onClose()
  }
  return (
    <Modal {...props} onConfirm={onConfirm}>
        <EntityList entity='packages' module='context' load df={Date.now()}/>
    </Modal>    
  );
}

export default LoadPackageModal;
