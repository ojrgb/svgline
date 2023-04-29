import React from 'react'
import theme from 'theme.js'
import styled from 'styled-components'
import Box from 'Components/Box.js'
import Toolbar from '../Toolbar.js'
import EntityList from 'Components/EntityList.js'
import Space from 'Components/Space.js'
import EntityToolbar from 'Components/EntityToolbar.js'
import EntityForm from 'Components/EntityForm.js'
import ResultPreview from './ResultPreview.js'

export default function ResultEditor(props) {
    return (
        <Box {...props} headerLocation="left-top">
            <Box.HeaderTabs>
                <Box.Header>
                    Result
                </Box.Header>
                <Box.Header>
                    Parameters
                </Box.Header>
            </Box.HeaderTabs>
            <Box.ContentTabs>
                <Box.Content>
                    <Box depth={2} w={10} h={10}>
                        <Box.Content>
                            <ResultPreview/>
                        </Box.Content>
                    </Box>
                </Box.Content>
                <Box.Content>
                    <Box depth={2} w={10} h={10}>
                        <Box.Content>
                            <EntityForm
                                entity="parameters" 
                                paths={[0]}
                            />   
                        </Box.Content>
                    </Box>
                </Box.Content>
            </Box.ContentTabs>
        </Box>
    )
}