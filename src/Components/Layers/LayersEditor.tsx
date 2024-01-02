import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Box from 'Components/Box'
import Toolbar from '../Toolbar'
import EntityList from 'Components/EntityList'
import Space from 'Components/Space'
import EntityToolbar from 'Components/EntityToolbar'

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