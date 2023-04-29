import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Box from 'Components/Box.js'
import Toolbar from '../Toolbar.js'
import EntityList from 'Components/EntityList.js'
import Space from 'Components/Space.js'
import EntityToolbar from 'Components/EntityToolbar.js'

export default function ComponentsEditor(props) {
    return (
        <Box {...props}>
            <Box.Header>
                Components
            </Box.Header>
            <Box.Content>
                <EntityList entity="components"/>
                <Space py={2}/>
                <EntityToolbar entity="components" add remove/>
            </Box.Content>
        </Box>
    )
}