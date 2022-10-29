import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import { deepenColor, modifySize, relaxColor } from 'utils'
import ExpandIcon from './ExpandIcon'
import RecursiveElement from './RecursiveElement'
import Space from './Space'
import { contextStore } from 'Context/contextStore'
import _ from 'lodash'

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
        box-shadow: ${theme.scale.space[1]} ${theme.scale.space[1]} ${theme.scale.space[2]} -${theme.scale.space[3]}, -${theme.scale.space[3]} -${theme.scale.space[3]} ${theme.scale.space[6]} -${theme.scale.space[8]} inset;
        flex-direction: column;
        justify-content: normal;
        align-items: baseline;
        overflow-y: scroll;
    `,
    Single: styled.div`
        width: 100%;
        text-align: left;
        cursor: pointer;
        user-select: none;
        padding-top: ${theme.scale.space[2]};
        padding-bottom: ${theme.scale.space[2]};
        ${props => props.selected && (
            `
                background-color: ${relaxColor(theme.colors.primary,relaxDelta)};
            `
        )}
    `
 
}

function SelectableListItem(props) {
    const {object, onClick, entity, isGroup, isExpanded, path} = props
    const {contextState, contextDispatch} = React.useContext(contextStore)
    const indentStartCalc = modifySize(theme.scale.space[indentStart],indentModifier)
    const levelIndent = modifySize(theme.scale.space[props.path?.length || 0],indentModifier)
    const paddingLeft = `calc(${indentStartCalc} + ${levelIndent})`
    return (
        <Classes.Single {...{path}} style={{paddingLeft}}
            onClick={()=> {
                contextDispatch({
                    type: 'SET_SELECTED',
                    entity,
                    paths: [path]
                })
               
            }}
            selected={contextState.selectedItems?.entity === entity && 
                contextState.selectedItems?.paths.find(v => _.isEqual(v,path))
            }
        >
                {isGroup && <ExpandIcon expand={isExpanded}/>}
                <span>{object.name || object._id || '(null)'}</span>
        </Classes.Single>
    )
}

export default function SelectableList({
 list,
 entity
}) {
    return (
        <Classes.Root>
            {list.map((object, objecti) => 
                <RecursiveElement 
                    element={SelectableListItem} 
                    key={objecti}
                    path={[objecti]} 
                    {...{object, entity}}
                />  
            )}
        </Classes.Root>
    )
}