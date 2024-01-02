import React from 'react'
import theme from 'theme.js'
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
        <Box id="result-editor" {...props} headerLocation="left-top">
            <Box.HeaderTabs id="result-header-tabs">
                <Box.Header id="result-header">
                    Result
                </Box.Header>
                <Box.Header id="parameters-header">
                    Parameters
                </Box.Header>
            </Box.HeaderTabs>
            <Box.ContentTabs id="result-content-tabs">
                <Box.Content id="result-preview-container">
                    <Box depth={2} w={10} h={10} id="result-preview-space">
                        <Box.Content id="result-preview-content">
                            <ResultPreview/>
                        </Box.Content>
                    </Box>
                </Box.Content>
                <Box.Content id="result-parameters-container">
                    <Box depth={2} w={10} h={10} id="result-parameters-spacer">
                        <Box.Content id="result-parameters-content">
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