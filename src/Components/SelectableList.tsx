import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import { debug, deepenColor, modifySize, normalizePaths, relaxColor } from 'utils'
import ExpandIcon from './ExpandIcon'
import RecursiveElement from './RecursiveElement'
import Space from './Space'
import { contextStore, selectionTypes } from 'Context/contextStore'
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
    `
 
}

function SelectableListItem(props: {
    object: any;
    onClick?: (props: any) => () => void;
    entity: string;
    isGroup?: boolean;
    isExpanded?: boolean;
    paths?: string[];
    path?: string;
    target?: string[];
}) {
    const {object, onClick, entity, isGroup, isExpanded, paths, path, target} = props
    const selectionType = selectionTypes[entity]
    const {contextState, contextDispatch} = React.useContext(contextStore)
    const indentStartCalc = modifySize(theme.scale.space[indentStart],indentModifier)
    const levelIndent = modifySize(theme.scale.space[props.path?.length || 0],indentModifier)
    const paddingLeft = `calc(${indentStartCalc} + ${levelIndent})`

    const selected = 
        _.isEqual(target,contextState?.[selectionType]?.target) && 
        _.isEqual((normalizePaths(paths) || []).concat([normalizePaths(path)]),contextState?.[selectionType]?.paths)
    
    

    return (
        <Classes.Single className={`selectable-list-item-${object._id}`} {...{paths}} style={{paddingLeft}}
            onClick={onClick ? onClick(props) : ()=> {
                
                contextDispatch({
                    type: 'SET_SELECTED',
                    entity,
                    target,
                    paths: (normalizePaths(paths) || []).concat([normalizePaths(path)])
                })
               
            }}
            selected={
                selected
                
            }
        >
                {isGroup && <ExpandIcon isExpanded={isExpanded}/>}
                <span>{object.name || object._id || '(null)'}</span>
        </Classes.Single>
    )
}

export default function SelectableList(props: {
    list: any[];
    entity: string;
    target?: string[];
    paths?: any[];
}) {
    const {
        list,
        entity,
        target,
        paths
       } = props
        
       
    return (
        <Classes.Root className={`selectable-list-${entity}`}>
            {list?.map((object, objecti) => 
                <RecursiveElement 
                    element={SelectableListItem} 
                    key={objecti}
                    path={[objecti]}
                    paths={paths}
                    {...{object, entity, target}}
                />  
            )}
        </Classes.Root>
    )
}