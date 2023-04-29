import React from 'react'
import theme from 'theme.js'
import styled from 'styled-components'
import { entitiesStore } from 'Context/entitiesStore.js'
import SelectableList from './SelectableList.js'

export default function EntityList(props) {
    const {entity,paths} = props
    const target = props.target || [entity] // This ensures that either "configurations" is the entity and target, or "elements" is the entity but "configurations.elements" is the target
    
    const {entitiesState,entitiesDispatch,getList} = React.useContext(entitiesStore)
    const list = getList(target,paths)
    
    return (
        <SelectableList 
        {...{entity,target,paths,list}} 
        />
    )
}