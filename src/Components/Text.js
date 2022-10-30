import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import { deepenColor, modifySize, relaxColor } from 'utils'

const relaxDelta = 0.1,
    relaxTextDelta = 0.6,
    borderThicknessDelta = 2,
    relaxBorderDelta = 0.1,
    deepenBorderDelta = 0.1

const Classes = {
    Root: styled.input`
        background-color: ${relaxColor(theme.colors.primary,relaxDelta)}; 
        color: ${relaxColor(theme.colors.text.primary,relaxTextDelta)};
        
        &:focus {
            border: ${modifySize(theme.borders.primary.width,borderThicknessDelta)} inset ${relaxColor(theme.borders.primary.color,relaxBorderDelta)},${deepenColor(theme.borders.primary.color,deepenBorderDelta)};
        }
    `
}

export default function Text(props) {
    return (
        <Classes.Root type="text" {...props} onChange={(e) => {
            props.onChange(e.target.value)
        }}/>
    )
}