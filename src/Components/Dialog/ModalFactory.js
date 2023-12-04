
import React from 'react';
import Modal from './Modal';
import LoadPackageModal from './Modals/LoadPackageModal';
import { contextStore } from 'Context/contextStore';

const ModalFactory = () => {
  const modals = [
    {_id: 'loadPackages', title: 'Load Packages', description: 'Select a package to load', component: <LoadPackageModal/>}
  ]
  const {contextState,contextDispatch} = React.useContext(contextStore)

  return (
    <div>
      {
        modals.map(modal => {
          return (
            React.cloneElement(modal.component, {
              key: modal._id,
              _id: modal._id,
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
