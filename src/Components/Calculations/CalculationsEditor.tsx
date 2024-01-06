import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Box from 'Components/Box'
import Toolbar from '../Toolbar'
import EntityList from 'Components/EntityList'
import Space from 'Components/Space'
import EntityToolbar from 'Components/EntityToolbar'

export default function CalculationsEditor(props) {
    return (
        <Box {...props}>
            <Box.Header>
                Calculations
            </Box.Header>
            <Box.Content>
                <EntityList entity="calculations"/>
                <Space py={2}/>
                <EntityToolbar entity="calculations" add remove moveUp moveDown duplicate addGroup/>
            </Box.Content>
        </Box>
    )
}