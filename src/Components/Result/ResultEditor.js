import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Box from 'Components/Box'
import Toolbar from '../Toolbar'
import EntityList from 'Components/EntityList'
import Space from 'Components/Space'
import EntityToolbar from 'Components/EntityToolbar'
import EntityForm from 'Components/EntityForm'
import ResultPreview from './ResultPreview'

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