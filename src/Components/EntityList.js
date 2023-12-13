import React from 'react'
import theme from 'theme.js'
import styled from 'styled-components'
import { entitiesStore } from 'Context/entitiesStore.js'
import SelectableList from './SelectableList.js'
import dataService from './Data/dataService.js'

export default function EntityList(props) {
    const {entity,paths,load} = props // "entity" is the entity to load, "paths" is the path to the list of objects to display, "load" is a boolean indicating whether to load the list of objects
    const target = props.target || [entity] // This ensures that either "configurations" is the entity and target, or "elements" is the entity but "configurations.elements" is the target
    
    const {entitiesState,entitiesDispatch,getList} = React.useContext(entitiesStore)
    const list = getList(target,paths)
    React.useEffect(() => {
        const loadObjects = async () => {if (load) {
            entitiesDispatch({
                type: 'LOAD_OBJECTS',
                entity,
                data: await dataService.get({entity})
            })
        }}
        loadObjects()
    },[props.df])
    return (
        <SelectableList 
        {...{entity,target,paths,list}} 
        />
    )
}