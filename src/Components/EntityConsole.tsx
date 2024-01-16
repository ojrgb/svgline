import React from 'react'
import Box from 'Components/Box'
import EntityList from 'Model/EntityList'
import Space from 'Components/Space'
import EntityToolbar from 'Components/EntityToolbar'
import Entity from 'Model/Entity'
import EntitySelect from './EntitySelect'

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
    moveDown?: boolean
}) {
    const typeofEntity = props.list ? props.list.getType() as typeof Entity : props.type
    return (
        <Box id={`${typeofEntity.namePlural}-editor`} w={props.w} h={props.h}>
            <Box.Header>
                {typeofEntity.namePlural}
            </Box.Header>
            <Box.Content>
                <EntitySelect list={props.list}/>
                <Space py={2}/>
                <EntityToolbar list={props.list} add remove addGroup addLoop duplicate moveUp moveDown

                    />
            </Box.Content>
        </Box>
    )
}