import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Box from 'Components/Box.js'
import Toolbar from '../Toolbar.js'
import EntityList from 'Components/EntityList.js'
import Space from 'Components/Space.js'
import EntityToolbar from 'Components/EntityToolbar.js'

export default function CalculationsEditor(props) {
    return (
        <Box {...props}>
            <Box.Header>
                Calculations
            </Box.Header>
            <Box.Content>
                <EntityList entity="calculations"/>
                <Space py={2}/>
                <EntityToolbar entity="calculations" add remove/>
            </Box.Content>
        </Box>
    )
}