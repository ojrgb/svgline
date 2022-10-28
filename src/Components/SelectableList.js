import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import { deepenColor, modifySize } from 'utils'
import ExpandIcon from './ExpandIcon'
import RecursiveElement from './RecursiveElement'

const deepenDelta = 0.1,
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

    `
 
}

function SelectableListItem(props) {
    console.log(props)
    const {object, onClick, entity, isGroup, isExpanded, level} = props
    const indentStartCalc = modifySize(theme.scale.space[indentStart],indentModifier)
    const levelIndent = modifySize(theme.scale.space[props.level || 0],indentModifier)
    const paddingLeft = `calc(${indentStartCalc} + ${levelIndent})`
    return (
        <Classes.Single {...{level}} style={{paddingLeft}}>
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
                    {...{object, entity}}
                />  
            )}
        </Classes.Root>
    )
}