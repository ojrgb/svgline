import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Toolbar from './Toolbar'
import { entitiesStore } from 'Context/entitiesStore'

export default function EntityToolbar(props) {
    const {
        entity
    } = props;
    const {entitiesState, entitiesDispatch} = React.useContext(entitiesStore)
    const toolbarButtons = {
        add: <Toolbar.Button 
            icon="plus" 
            onClick={() => {
                console.log('clicked add!')
                entitiesDispatch({type:`ADD_${entity.toUpperCase()}`})
            }}
            />,
        remove: <Toolbar.Button
            icon="remove"
            onClick={() => {entitiesDispatch({type:`REMOVE_${entity.toUpperCase()}`})}}
            />
    }

    const ToolbarButtons = Object.keys(props).map((action,actioni) => {
        return toolbarButtons[action]
    }).filter(Boolean).map((element,elementi) => {return React.cloneElement(element,{key:elementi})})

    return (
        <Toolbar>
            {ToolbarButtons}
        </Toolbar>
    )
}