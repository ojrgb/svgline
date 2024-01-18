import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Box from 'Components/Box'
import Toolbar from '../Toolbar'
import Space from 'Components/Space'
import EntityToolbar from 'Components/EntityToolbar'
import { contextStore } from 'Context/contextStore'
import entities from 'ents'
import { deepenColor } from 'utils'
import EntityForm from 'Components/EntityForm'
import Entity from 'Model/Entity'

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

export default function ItemEditor(props: {
    w: number
    h: number

}) {
    
    
    const {contextState,contextDispatch} = React.useContext(contextStore)

    const {currentSelection} = contextState
    const selectionType: 'none' | 'single' | 'multiple' = !!!currentSelection ? 'none' : Array.isArray(currentSelection) ? 'multiple' : 'single'
    const entity: Entity = selectionType==='single' ? currentSelection : null
    return (
        <Box w={props.w} h={props.h} headerLocation="left-top" z={9}>
            <Box.Header>
                Edit Panel    
            </Box.Header>    
            <Box.Content>
                <Box depth={2} headerLocation="top-left" w={10} h={10}>
                    <Box.Header>
                        {
                            selectionType==='none' ? ( 
                                'No selection'
                            ) : (
                                selectionType==='multiple' ? (
                                    'Multiple selection'
                                ) : (
                                    `Editing ${entity._id.get()}`
                                )
                            )
                        }
                    </Box.Header>
                    <Box.Content>
                        {
                            selectionType==='none' ? (
                                <Classes.PlaceholderText>
                                    No selection
                                </Classes.PlaceholderText>
                            ) : (
                                selectionType==='multiple' ? (
                                    <Classes.PlaceholderText>
                                        Multiple selection
                                    </Classes.PlaceholderText>
                                ) : (
                                    <EntityForm
                                        key={entity.internalId} 
                                        entity={entity} 
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