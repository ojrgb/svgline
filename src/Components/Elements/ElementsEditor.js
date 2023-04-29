import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Box from 'Components/Box.js'
import Toolbar from '../Toolbar.js'
import EntityList from 'Components/EntityList.js'
import Space from 'Components/Space.js'
import EntityToolbar from 'Components/EntityToolbar.js'
import { contextStore } from 'Context/contextStore.js'

export default function ElementsEditor(props) {
    const {contextState, contextDispatch} = React.useContext(contextStore)
    
    return (
        <Box {...props} headerLocation="right-top">
            <Box.Header>
                Elements
            </Box.Header>
            <Box.Content>
                <EntityList 
                    entity="elements"
                    target={['layers','elements']}
                    paths={[contextState.selectedItems?.paths?.[0]]}
                    />
                <Space py={2}/>
                <EntityToolbar 
                    entity="elements" 
                    target={['layers','elements']}
                    paths={[contextState.selectedItems?.paths?.[0]]}
                    add remove
                />
            </Box.Content>
        </Box>
    )
}