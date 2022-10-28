import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Box from 'Components/Box'
import Toolbar from './Toolbar'

export default function ConfigurationEditor(props) {
    return (
        <Box {...props}>
            <Box.Header>
                Configuration
            </Box.Header>
            <Box.Content>
                <Toolbar>
                    <Toolbar.Button icon="plus"/>
                    <Toolbar.Button icon="minus"/>
                </Toolbar>
            </Box.Content>
        </Box>
    )
}