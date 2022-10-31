import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Box from 'Components/Box'
import Toolbar from '../Toolbar'
import EntityList from 'Components/EntityList'
import Space from 'Components/Space'
import EntityToolbar from 'Components/EntityToolbar'

export default function ResultEditor(props) {
    return (
        <Box {...props} headerLocation="left-top">
            <Box.Header>
                Result
            </Box.Header>
            <Box.Content>
                <Box depth={2} w={10} h={10}>
                    <Box.Content>
                        
                    </Box.Content>
                </Box>
            </Box.Content>
        </Box>
    )
}