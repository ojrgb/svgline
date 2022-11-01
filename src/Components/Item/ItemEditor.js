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
    const {getSingle, getNestedEntity} = React.useContext(entitiesStore)
    const {selectedItems} = contextState
    const {entity, paths, target} = selectedItems
    
    const object = target ? getSingle(target, paths) : undefined
    console.log(contextState)
    console.log(object)
    
    return (
        <Box {...props} headerLocation="left-top" z={9}>
            <Box.Header>
                Edit Panel    
            </Box.Header>    
            <Box.Content>
                <Box depth={2} headerLocation="top-left" w={10} h={10}>
                    <Box.Header>
                        {
                            !!!paths ? ( 
                                'No selection'
                            ) : (
                                paths.length>1 ? (
                                    'Multiple selection'
                                ) : (
                                    `Editing ${object._id}`
                                )
                            )
                        }
                    </Box.Header>
                    <Box.Content>
                        {
                            !!!paths ? (
                                <Classes.PlaceholderText>
                                    No selection
                                </Classes.PlaceholderText>
                            ) : (
                                paths.length>1 ? (
                                    <Classes.PlaceholderText>
                                        Multiple selection
                                    </Classes.PlaceholderText>
                                ) : (
                                    <EntityForm
                                        key={`${selectedItems.entity}-${selectedItems.paths.join('-')}`} 
                                        entity={selectedItems.entity} 
                                        paths={selectedItems.paths[0]}
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