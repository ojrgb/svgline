import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Toolbar from './Toolbar'
import { entitiesStore } from 'Context/entitiesStore'
import _ from 'lodash'
import { generateDeep, generateNewEntity, getNested } from 'utils'
import ents from 'ents'

export default function EntityToolbar(props) {
    const {
        entity,
        paths,
        disabled
    } = props;
    const {entitiesState, entitiesDispatch, getSingle} = React.useContext(entitiesStore)
    const entityConfig = ents[entity]
    const target = props.target || [entity]
    // The entity can either be loaded into an entities list
    // E.g. configurations -> state.configurations
    // Or into another target
    // E.g. elements -> layers.[index].elements
    const targetEntity = target[0]
    if(!!target && !Array.isArray(target)) {
        
    }

    const onAdd = () => {
        entitiesDispatch({type:`ADD_OBJECT`,entity,paths,target})
    }


    
    const toolbarButtons = {
        add: <Toolbar.Button 
            icon="plus" 
            onClick={onAdd}
            />,
        remove: <Toolbar.Button
            icon="remove"
            onClick={() => {entitiesDispatch({type:`REMOVE_${entity.toUpperCase()}`})}}
            />
    }

    const ToolbarButtons = Object.keys(props).map((action,actioni) => {
        return toolbarButtons[action] ? React.cloneElement(toolbarButtons[action],{disabled}) : undefined
    }).filter(Boolean).map((element,elementi) => {return React.cloneElement(element,{key:elementi})})

    return (
        <Toolbar>
            {ToolbarButtons}
        </Toolbar>
    )
}