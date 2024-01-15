import React from 'react'
import Entity from 'Model/Entity'
import List from './List'
import EntityList from 'Model/EntityList'

export default function EntitySelect(props: {
    list: EntityList<Entity>;
  
}) {
    const x = typeof props.list
    const y = typeof props.list[0];
    return (
        <List 
            list={props.list}
        />
    )
}