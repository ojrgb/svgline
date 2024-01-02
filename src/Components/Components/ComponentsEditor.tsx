import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Box from 'Components/Box'
import Toolbar from '../Toolbar'
import EntityList from 'Components/EntityList'
import Space from 'Components/Space'
import EntityToolbar from 'Components/EntityToolbar'

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