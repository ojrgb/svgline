import React from 'react';
import Modal from '../Modal';
import SelectableList from 'Components/SelectableList';
import dataService from 'Components/Data/dataService';

function LoadPackageModal(props) {
  const [packageList, setPackageList] = React.useState([]); // [ {name: 'package1', id: 1}, {name: 'package2', id: 2} ]
  const getPackageList = async () => {
    setPackageList(dataService.getPackageList());
  };
  
  return (
    <Modal {...props}>
        <SelectableList list={packageList}/>
    </Modal>    
  );
}

export default LoadPackageModal;
