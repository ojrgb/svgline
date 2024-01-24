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
import ListModel from 'Model/List'
import { ChildArrow } from './Icons/Icons'
import context from 'context'
import Element from 'Model/Element'

const deepenDelta = 0.1,
    relaxDelta = 0.1,
    radiusModifier = 1,
    indentStart = 2,
    indentModifier = 5

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
        indent: string;
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
        padding-left: ${theme.scale.space[indentStart]};
        ${props => props.indent && (
            `
                padding-left: ${props.indent};
            `
        )    
        }
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
        pointer-events: none;
    `,
    
 
}

/** A single list item. */
function ListItem(props: {
    entity: Entity;
    onClick: () => void;
    indent?: string;
    level?: number;
}) {
    
    const {contextState} = React.useContext(contextStore)
    const entity = props.entity
    
    const typeofEntity = entity.constructor as typeof Entity
    const selected = contextState.selected.includes(entity)
    return (
        <Classes.Single indent={props.indent} className={`selectable-list-item list-item-${entity._id.get()}`}
        // style={{paddingLeft}}
            onClick={props.onClick}
            selected={selected}
        >
                {
                    props.level>0 && <span><ChildArrow/></span>
                }
                {/*We have to disable pointer events on the actual text so we 
                can make sure that de-selecting works (see the Main component) */}
                <span style={{pointerEvents:'none'}}>{entity.get('name') || entity.get('_id') || '(null)'}</span>{typeofEntity.shortName && <Classes.ShortName>{typeofEntity.shortName}</Classes.ShortName>}
        </Classes.Single>
    )
}

/** A list containing Entities. */
export default function List(props: {
    list?: EntityList<Entity>;
}) {
    const {
        list,
     
       } = props
       const typeofEntity = list && list.getType() as typeof Entity
       const inherited = typeofEntity.getInherited()
    const {contextState, contextDispatch} = React.useContext(contextStore)   
    
    const RecursiveElement = (props: {
        entity: Entity;
        level: number;
    }) => {
        const {entity, level} = props
        const indentStartCalc = theme.scale.space[indentStart]
        const levelIndent = modifySize(theme.scale.space[level],indentModifier)
        const paddingLeft = `calc(${indentStartCalc} + ${levelIndent})`
        
        return (
            <React.Fragment>
                <ListItem 
                // indent={paddingLeft}
                level={level}
                entity={entity}
                onClick={() => {
                    contextDispatch({
                        type: 'SET_SELECTED',
                        currentSelection: entity,
                        selected: inherited === true ? [contextState.selected[0], entity] : [entity]
                    })    
                }}/>
                {
                    entity instanceof ListModel && entity.entities.map((single, singlei) => 
                        <RecursiveElement
                            key={singlei}
                            entity={single}   
                            level={level+1}    
                        />  
                    )
                }
            </React.Fragment>
        )
    }

    return (
        <Classes.Root className={`selectable-list selectable-list-${typeofEntity.namePlural}`} onClick={(e) => {
            const { target } = e;
            if (target instanceof HTMLElement) {
                const classList = target.classList;
                if(classList.contains('selectable-list')) {
                    contextDispatch({
                        type: 'DESELECT_ALL'
                    })
                }
                
            }
        }}>
            {list?.entities.map((single, singlei) => 
                <RecursiveElement
                    key={singlei}
                    entity={single}
                    level={0}
                />  
            )}
        </Classes.Root>
    )
}