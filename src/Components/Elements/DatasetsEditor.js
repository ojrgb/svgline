import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Box from 'Components/Box'
import Toolbar from '../Toolbar'
import EntityList from 'Components/EntityList'
import Space from 'Components/Space'
import EntityToolbar from 'Components/EntityToolbar'

export default function ElementsEditor(props) {
    return (
        <Box {...props} headerLocation="right-top">
            <Box.Header>
                Datasets
            </Box.Header>
            <Box.Content>
                <EntityList entity="elements"/>
                <Space py={2}/>
                <EntityToolbar entity="elements" add remove/>
            </Box.Content>
        </Box>
    )
}