import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Toolbar from './Toolbar'
import { entitiesStore } from 'Context/entitiesStore'
import { contextStore } from 'Context/contextStore'
import _ from 'lodash'
import { generateDeep, generateNewEntity, getNested } from 'utils'
import ents from 'ents'

export default function EntityToolbar(props: {
    entity: string,
    paths?: string[],
    disabled?: boolean,
    target?: string[]
    add?: boolean,
    addLoop?: boolean,
    addGroup?: boolean,
    remove?: boolean,
    duplicate?: boolean,
    moveUp?: boolean,
    moveDown?: boolean

}) {
    const {
        entity,
        
        disabled
    } = props;
    const {contextState, contextDispatch} = React.useContext(contextStore)
    const {entitiesState, entitiesDispatch, getSingle} = React.useContext(entitiesStore)
    const entityConfig = ents[entity]
    const target = props.target || [entity]
    const paths = props.paths || contextState?.selectedItems?.paths || []
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
        addLoop: <Toolbar.Button
            icon="plus-loop"
            onClick={() => {entitiesDispatch({type:`ADD_LOOP_${entity.toUpperCase()}`})}}
            />,
        addGroup: <Toolbar.Button
            icon="plus-group"
            onClick={() => {entitiesDispatch({type:`ADD_GROUP_${entity.toUpperCase()}`})}}
            />,
        remove: <Toolbar.Button
            icon="remove"
            onClick={() => {entitiesDispatch({type:`REMOVE_${entity.toUpperCase()}`})}}
            />,
        duplicate: <Toolbar.Button
            icon="duplicate"
            onClick={() => {entitiesDispatch({type:`DUPLICATE`,entity,paths,target})}}
            />,
        moveUp: <Toolbar.Button
            icon="move-up"
            onClick={() => {entitiesDispatch({type:`MOVE_UP_${entity.toUpperCase()}`})}}
            />,
        moveDown: <Toolbar.Button
            icon="move-down"
            onClick={() => {entitiesDispatch({type:`MOVE_DOWN_${entity.toUpperCase()}`})}}
            />,
        
    }

    const buttonOrder = [
        'add',
        'duplicate',
        'addLoop',
        'addGroup',
        'moveUp',
        'moveDown',
        
        'remove',
    ]



    const ToolbarButtons = buttonOrder.filter(v => props[v] !== undefined).map((action,actioni) => {
        return toolbarButtons[action] ? React.cloneElement(toolbarButtons[action],{disabled}) : undefined
    }).filter(Boolean).map((element,elementi) => {return React.cloneElement(element,{key:elementi})})

    return (
        <Toolbar>
            {ToolbarButtons}
        </Toolbar>
    )
}