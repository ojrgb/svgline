import React from 'react';
import Modal from '../Modal';
import { flowStore } from 'Context/flowStore';
import Form from 'Components/Form'; // Add this import
import dataService from 'Components/Data/dataService';


export default function SavePackageModal(props) {
  const {flow} = React.useContext(flowStore)
  
  const onConfirm = async () => {
    console.log('Saving!',flow.get())
    await dataService.save({json: flow.get()})
    props.onClose()
  }
  const input = React.cloneElement(flow._id.getInput(),{value: flow._id.get() || ""})
  return (
    <Modal {...props} onConfirm={onConfirm}>
        <Form
          onBlur={(res) => {
            console.log(res)
          }}
          >
            <Form.Field w={10} attribute="_id">
                <Form.Caption>Package ID</Form.Caption>
                <Form.Input 
                            type="string"
                >
                    {input}
                </Form.Input>
            </Form.Field>
        </Form>
    </Modal>    
  );
}


