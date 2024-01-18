import React from 'react'
import Entity from 'Model/Entity'
import List from './List'
import EntityList from 'Model/EntityList'

export default function EntitySelect(props: {
    list?: EntityList<Entity>;
}) {
    if(!props.list) return <div/>
    return (
        <List 
            list={props.list}
        />
    )
}