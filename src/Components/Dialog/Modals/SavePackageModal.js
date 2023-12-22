import React from 'react';
import Modal from '../Modal';
import EntityList from 'Components/EntityList';
import { entitiesStore } from 'Context/entitiesStore.js'
import { contextStore } from 'Context/contextStore.js'
import Form from 'Components/Form'; // Add this import
import DatasetsEditor from 'Components/Datasets/DatasetsEditor';
import dataService from 'Components/Data/dataService';


export default function SavePackageModal(props) {
  const {entitiesState,entitiesDispatch, getSingle} = React.useContext(entitiesStore)
  const {contextState,contextDispatch} = React.useContext(contextStore)
  
  const onConfirm = async () => {
   await dataService.save({item: entitiesState})
    props.onClose()
  }
  return (
    <Modal {...props} onConfirm={onConfirm}>
        <Form
          onBlur={(res) => {entitiesDispatch({type: 'SET_OBJECT', object: res, target: undefined, paths: []})}}
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


