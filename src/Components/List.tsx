import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import { debug, deepenColor, modifySize, normalizePaths, relaxColor } from 'utils'
import ExpandIcon from './ExpandIcon'
import RecursiveElement from './RecursiveElement'
import Space from './Space'
import { contextStore} from 'Context/contextStore'
import _ from 'lodash'
import Entity from 'Model/Entity'
import EntityList from 'Model/EntityList'

const deepenDelta = 0.1,
    relaxDelta = 0.1,
    radiusModifier = 1,
    indentStart = 1,
    indentModifier = 1

const Classes = {
    Root: styled.div`
        background-color: ${deepenColor(theme.colors.primary,deepenDelta)};
        border: ${theme.borders.primary.width} ${theme.borders.primary.style} ${deepenColor(theme.borders.primary.color,deepenDelta)};
        border-radius: ${modifySize(theme.borders.primary.radius,radiusModifier)};
        display: flex;
        flex-grow: 1;
        width: 100%;
        height: 100%;
        box-shadow: ${theme.scale.space[1]} ${theme.scale.space[1]} ${theme.scale.space[2]} -${theme.scale.space[3]}, -${theme.scale.space[3]} -${theme.scale.space[3]} ${theme.scale.space[6]} -${theme.scale.space[8]} inset;
        flex-direction: column;
        justify-content: normal;
        align-items: baseline;
        overflow-y: scroll;
    `,
    Single: styled.div<{
        selected?: boolean;
      
    }>`
        display: flex;
        width: 100%;
        text-align: left;
        cursor: pointer;
        user-select: none;
        padding-top: ${theme.scale.space[2]};
        padding-bottom: ${theme.scale.space[2]};
        font-family: ${theme.fonts.code.family};
        ${props => props.selected && (
            `
                background-color: ${relaxColor(theme.colors.primary,relaxDelta)};
            `
        )}
    `,
    ShortName: styled.div.attrs({className:'short-name'})`
        font-family: ${theme.fonts.code.family};
        font-size: ${theme.fonts.code.size};
        margin-left: ${theme.scale.space[3]};
        background-color: ${theme.colors.primary};
        border-radius: ${theme.borders.primary.radius};
        padding-left: ${theme.scale.space[2]};
        padding-right: ${theme.scale.space[2]};
        border: ${theme.borders.primary.width} ${theme.borders.primary.style} ${theme.borders.primary.color};
    `
    
 
}

/** A single list item. */
function ListItem(props: {
    entity: Entity;
    onClick: () => void;
}) {
    // const indentStartCalc = modifySize(theme.scale.space[indentStart],indentModifier)
    // const levelIndent = modifySize(theme.scale.space[props.path?.length || 0],indentModifier)
    // const paddingLeft = `calc(${indentStartCalc} + ${levelIndent})`
    const {contextState} = React.useContext(contextStore)
    const entity = props.entity
    
    const typeofEntity = entity.constructor as typeof Entity
    const selected = contextState.selected.includes(entity._id.get())
    
    return (
        <Classes.Single className={`selectable-list-item-${entity._id.get()}`}
        // style={{paddingLeft}}
            onClick={props.onClick}
            selected={selected}
        >
                
                <span>{entity.get('name') || entity.get('_id') || '(null)'}</span>{typeofEntity.shortName && <Classes.ShortName>{typeofEntity.shortName}</Classes.ShortName>}
        </Classes.Single>
    )
}

/** A list containing Entities. */
export default function List(props: {
    list: EntityList<Entity>;
}) {
    const {
        list,
     
       } = props
       const typeofEntity = list.getType() as typeof Entity
    const {contextDispatch} = React.useContext(contextStore)    
    return (
        <Classes.Root className={`selectable-list-${typeofEntity.namePlural}`}>
            {list.entities.map((single, singlei) => 
                <ListItem
                    key={singlei}
                    entity={single}
                    onClick={() => {
                        contextDispatch({
                            type: 'SET_SELECTED',
                            selected: [single]
                        })
                    }}
                />  
            )}
        </Classes.Root>
    )
}