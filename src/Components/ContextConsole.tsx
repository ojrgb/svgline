import React from 'react'
import theme from 'theme.js'
import styled from 'styled-components'
import { contextStore } from 'Context/contextStore'
import SelectableList from './SelectableList'
import dataService from './Data/dataService'

export default function EntityList(props: {
    entity: string,
    paths?: string[],
    load?: boolean,
    module?: 'entity' | 'context',
    target?: string[],
    df?: any

}) {
    const {entity,paths,load, module} = props // "entity" is the entity to load, "paths" is the path to the list of objects to display, "load" is a boolean indicating whether to load the list of objects
    const target = props.target || [entity] // This ensures that either "configurations" is the entity and target, or "elements" is the entity but "configurations.elements" is the target
     const {contextDispatch,contextState} = React.useContext(contextStore)
    let dispatch: React.Dispatch<any>, list: any[];
    
    if(module === 'context') {
        dispatch = contextDispatch
        list = contextState[entity]
    }
    else {
        console.error(`Invalid module ${module} in EntityList`)
    }
    
    
    React.useEffect(() => {
        const loadObjects = async () => {if (load) {
            dispatch({
                type: 'LOAD_OBJECTS',
                entity,
                data: await dataService.get({entity})
            })
        }}
        loadObjects()
    },[])
    return (
        <SelectableList 
        {...{entity,target,paths,list}} 
        />
    )
}