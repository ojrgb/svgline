import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Toolbar from './Toolbar'
import _ from 'lodash'
import { flowStore } from 'Context/flowStore'
import { contextStore } from 'Context/contextStore'
import EntityList from 'Model/EntityList'
import Entity from 'Model/Entity'
import Flow from 'Model/Flow'

export default function EntityToolbar<T extends Entity>(props: {
    list: EntityList<T>,
    disabled?: boolean,
    add?: boolean,
    addLoop?: boolean,
    addGroup?: boolean,
    remove?: boolean,
    duplicate?: boolean,
    moveUp?: boolean,
    moveDown?: boolean

}) {
    const {
        list: list,
        disabled
    } = props;
  
    const {contextState, contextDispatch} = React.useContext(contextStore)
    const typeofEntity = list.getType() as typeof Entity
    // The entity can either be loaded into an entities list
    // E.g. configurations -> state.configurations
    // Or into another target
    // E.g. elements -> layers.[index].elements
    const onAdd = () => {
        list.newItem({_id: `new-${typeofEntity.name}`})
    }

    const onRemove = () => {
        list.removeItem(contextState.selected[0])
    }

    const onDuplicate = () => {
        list.duplicateItem(contextState.selected[0])
    }

    const toolbarButtons = {
        add: <Toolbar.Button 
            icon="plus" 
            onClick={onAdd}
            />,
        addLoop: <Toolbar.Button
            icon="plus-loop"
            onClick={() => {}}
            />,
        addGroup: <Toolbar.Button
            icon="plus-group"
            onClick={() => {}}
            />,
        remove: <Toolbar.Button
            icon="remove"
            onClick={onRemove}
            />,
        duplicate: <Toolbar.Button
            icon="duplicate"
            onClick={onDuplicate}
            />,
        moveUp: <Toolbar.Button
            icon="move-up"
            onClick={() => {}}
            />,
        moveDown: <Toolbar.Button
            icon="move-down"
            onClick={() => {}}
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