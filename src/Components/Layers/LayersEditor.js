import React from 'react'
import theme from 'theme.js'
import styled from 'styled-components'
import Box from 'Components/Box.js'
import Toolbar from '../Toolbar.js'
import EntityList from 'Components/EntityList.js'
import Space from 'Components/Space.js'
import EntityToolbar from 'Components/EntityToolbar.js'

export default function LayersEditor(props) {
    return (
        <Box {...props} headerLocation="right-top">
            <Box.Header>
                Layers
            </Box.Header>
            <Box.Content>
                <EntityList entity="layers"/>
                <Space py={2}/>
                <EntityToolbar entity="layers" add remove/>
            </Box.Content>
        </Box>
    )
}