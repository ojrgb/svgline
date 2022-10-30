import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Box from 'Components/Box'
import Toolbar from '../Toolbar'
import EntityList from 'Components/EntityList'
import Space from 'Components/Space'
import EntityToolbar from 'Components/EntityToolbar'
import { contextStore } from 'Context/contextStore'
import entities from 'ents'
import { deepenColor } from 'utils'
import EntityForm from 'Components/EntityForm'
import { entitiesStore } from 'Context/entitiesStore'

const deepenDelta = 0.5,
    noSelectionBlurModifier = 1.3

const Classes = {
    PlaceholderText: styled.div`
        color: ${deepenColor(theme.colors.text.primary,deepenDelta)};
        margin: auto;
        font-size: ${theme.fonts.h3.size};
        text-shadow: 0.1px 0.1px 15px ${deepenColor(theme.colors.text.primary,deepenDelta*noSelectionBlurModifier)};
    `,
    
}

export default function ItemEditor(props) {
    const {contextState, contextDispatch} = React.useContext(contextStore)
    const {getSingle} = React.useContext(entitiesStore)
    const {selectedItems} = contextState
    const object = selectedItems?.paths?.[0] && getSingle(selectedItems.entity, selectedItems?.paths?.[0])
    console.log(contextState)
    return (
        <Box {...props} headerLocation="left-top">
            <Box.Header>
                Edit Panel    
            </Box.Header>    
            <Box.Content>
                <Box depth={2} headerLocation="top-center" w={10} h={10}>
                    <Box.Header>
                        {
                            !!!contextState.selectedItems ? ( 
                                'No selection'
                            ) : (
                                contextState.selectedItems.paths.length>1 ? (
                                    'Multiple selection'
                                ) : (
                                    `Editing ${object._id}`
                                )
                            )
                        }
                    </Box.Header>
                    <Box.Content>
                        {
                            !!!contextState.selectedItems ? (
                                <Classes.PlaceholderText>
                                    No selection
                                </Classes.PlaceholderText>
                            ) : (
                                contextState.selectedItems.paths.length>1 ? (
                                    <Classes.PlaceholderText>
                                        Multiple selection
                                    </Classes.PlaceholderText>
                                ) : (
                                    <EntityForm
                                        key={`${selectedItems.entity}-${selectedItems.paths[0].join('-')}`} 
                                        entity={selectedItems.entity} 
                                        path={selectedItems.paths[0]}
                                    />        
                                )
                            )
                        }
                    </Box.Content>
                </Box>
                
            </Box.Content>
        </Box>
    )
}