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
import Group from 'Model/Group'

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
    const {selected, currentSelection} = contextState
    /** Inherit specifies whether the entity toolbar is for an inherited entity.
     * For example, Element is inherited from Layer, so the toolbar for Element
     * should have the inherit prop set to true.
     */
   
    
    if(!list) return <div/>
    
    const typeofEntity = list.getType() as typeof Entity
    // The entity can either be loaded into an entities list
    // E.g. configurations -> state.configurations
    // Or into another target
    // E.g. elements -> layers.[index].elements
    const onAdd = () => {
        
        console.log(contextState)
        const targetId = `${typeofEntity.name}-${contextState.idCounter[list.type.shortName] || 1}`
        if(currentSelection instanceof Group) {
            currentSelection.newItem({_id: targetId})
        }
        else {
            list.newItem({_id: targetId})
        }
        contextDispatch({type: 'ADD_ID_COUNTER',entity:list.type.shortName, counter: (contextState.idCounter[list.type.shortName] || 1)+1})
    }

    const onRemove = () => {
        list.removeItem(contextState.selected[0])
    }

    const onDuplicate = () => {
        list.duplicateItem(contextState.selected[0])
    }

    const onMoveUp = () => {
        list.moveItem(contextState.selected[0],'up')
    }

    const onMoveDown = () => {
        list.moveItem(contextState.selected[0],'down')
    }

    const onAddGroup = () => {
        list.newGroup()
    }

    const onAddLoop = () => {
        list.newLoop()
    }



    const toolbarButtons = {
        add: <Toolbar.Button 
            icon="plus" 
            onClick={onAdd}
            />,
        addLoop: <Toolbar.Button
            icon="plus-loop"
            onClick={onAddLoop}
            />,
        addGroup: <Toolbar.Button
            icon="plus-group"
            onClick={onAddGroup}
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
            onClick={onMoveUp}
            />,
        moveDown: <Toolbar.Button
            icon="move-down"
            onClick={onMoveDown}
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