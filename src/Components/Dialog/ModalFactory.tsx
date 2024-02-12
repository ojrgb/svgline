
import React from 'react';
import Modal from './Modal';
import LoadPackageModal from './Modals/LoadPackageModal';
import { contextStore } from 'Context/contextStore';
import SavePackageModal from './Modals/SavePackageModal';

const ModalFactory = () => {
  const modals = [
    {_id: 'loadFlow', title: 'Load Package', description: 'Select a package to load', component: <LoadPackageModal/>},
    {_id: 'saveFlow', title: 'Save Package', description: 'Save this package', component: <SavePackageModal/>}
  ]
  const {contextState,contextDispatch} = React.useContext(contextStore)
  return (
    <div id="modal-factory">
      {
        modals.map(modal => {
          return (
            React.cloneElement(modal.component, {
              key: modal._id,
              _id: modal._id,
              id: modal._id,
              title: modal.title,
              description: modal.description,
              open: contextState.modals[modal._id] || false,
              onClose: () => {contextDispatch({type: 'CLOSE_MODAL', _id: modal._id})}
            })
          )
        })
      }      
    </div>
  );
  };

export default ModalFactory;
