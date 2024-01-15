import React from 'react';
import Modal from '../Modal';
import { flowStore } from 'Context/flowStore';
import Form from 'Components/Form'; // Add this import
import dataService from 'Components/Data/dataService';


export default function SavePackageModal(props) {
  const {flow} = React.useContext(flowStore)
  
  const onConfirm = async () => {
   await dataService.save({item: flow})
    props.onClose()
  }
  return (
    <Modal {...props} onConfirm={onConfirm}>
        <Form
          onBlur={(res) => {
            // Set the object here.
          }}
          >
            <Form.Field w={10} attribute="_id">
                <Form.Caption>Package ID</Form.Caption>
                <Form.Input 
                            type="string"
                />
            </Form.Field>
        </Form>
    </Modal>    
  );
}


