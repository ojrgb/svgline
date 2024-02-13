import React from 'react';
import Modal from '../Modal';
import { contextStore } from 'Context/contextStore'
import LoadList from 'Components/LoadList';
import { loadStore } from 'Context/loadStore';


function LoadPackageModal(props) {
  const {loadState,loadFlow, setLoadTarget} = React.useContext(loadStore)
  React.useEffect(() => {
    setLoadTarget(undefined)
  },[])
  console.log(loadState)
  const onConfirm = () => {
    
    loadFlow()
    props.onClose()
  }
  return (
    <Modal {...props} onConfirm={onConfirm}>
        <LoadList/>
    </Modal>    
  );
}

export default LoadPackageModal;
