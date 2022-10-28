import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import { entitiesStore } from 'Context/entitiesStore'
import SelectableList from './SelectableList'

export default function EntityList({entity}) {
    const {entitiesState,entitiesDispatch} = React.useContext(entitiesStore)
    
    return (
        <SelectableList {...{entity}} list={entitiesState[entity]}/>
    )
}