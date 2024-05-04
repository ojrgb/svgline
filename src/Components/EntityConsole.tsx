import React from 'react'
import Box from 'Components/Box'
import EntityList from 'Model/EntityList'
import Space from 'Components/Space'
import EntityToolbar from 'Components/EntityToolbar'
import Entity from 'Model/Entity'
import EntitySelect from './EntitySelect'
import styled from 'styled-components'
import { deepenColor } from 'utils'
import theme from 'theme'

const deepenDelta = 0.5,
    noSelectionBlurModifier = 1.3

    const Classes = {
        PlaceholderTextContainer: styled.div.attrs({className: 'placeholder-text-container'})`
            color: ${deepenColor(theme.colors.text.primary,deepenDelta)};
            height: 100%;
            width: 100%;
            overflow: hidden;
            text-shadow: 0.1px 0.1px 15px ${deepenColor(theme.colors.text.primary,deepenDelta*noSelectionBlurModifier)};
            position: relative;
        `,
        PlaceholderText: styled.div.attrs({className: 'placeholder-text'})`
            position: relative;
            
            
            margin: auto;
            top: 50%;
            max-width: 300px;
            font-size: ${theme.fonts.h4.size};
            transform: translateY(-50%);
        `
        
    }

/** This is each one of the labeled boxes in the Context Editor that contains a selectable list for the entity. */
export default function EntityConsole(props: {
    list?: EntityList<Entity>;
    type?: typeof Entity
    children?: React.ReactNode;
    w?: number;
    h?: number;
    addLoop?: boolean,
    addGroup?: boolean,
    duplicate?: boolean,
    moveUp?: boolean,
    moveDown?: boolean,
    missingMessage?: string,

}) {
    const typeofEntity = props.list ? props.list.getType() as typeof Entity : props.type
    
    return (
        <Box id={`${typeofEntity.namePlural}-editor`} w={props.w} h={props.h}>
            <Box.Header>
                {typeofEntity.namePlural}
            </Box.Header>
            <Box.Content>
                {
                    props.list===undefined ? (
                        <Box depth={2} className="no-list-box-container" h={10} w={10}>
                            <Classes.PlaceholderTextContainer>
                                <Classes.PlaceholderText>
                                    {props.missingMessage || `No ${typeofEntity.namePlural} found`}
                                </Classes.PlaceholderText>
                            </Classes.PlaceholderTextContainer>
                            
                        </Box>
                    ) : (
                        <EntitySelect list={props.list}/>
                    )
                }
                <Space py={2}/>
                <EntityToolbar list={props.list}add remove addGroup addLoop duplicate moveUp moveDown

                    />
            </Box.Content>
        </Box>
    )
}