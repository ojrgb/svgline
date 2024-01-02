import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import { applyQuickStyles, deepenColor, modifySize, relaxColor } from 'utils'

const relaxDelta = 0.1,
    relaxTextDelta = 0.6,
    borderThicknessDelta = 2,
    relaxBorderDelta = 0.1,
    deepenBorderDelta = 0.1

const Classes = {
    Root: styled.input`
        ${applyQuickStyles}
        background-color: ${relaxColor(theme.colors.primary,relaxDelta)}; 
        color: ${relaxColor(theme.colors.text.primary,relaxTextDelta)};
        font-family: ${theme.fonts.code.family};  
        font-size: ${theme.fonts.code.size};     
        &:focus {
            border: ${modifySize(theme.borders.primary.width,borderThicknessDelta)} inset ${relaxColor(theme.borders.primary.color,relaxBorderDelta)},${deepenColor(theme.borders.primary.color,deepenBorderDelta)};
            outline: none;
        }
    `
}

export default function Text(props: React.HTMLAttributes<HTMLInputElement> & React.PropsWithChildren<{
    onChange?: (v: string) => void,
    value?: string,
  
}>) {
    return (
        <Classes.Root type="text" {...props} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange && props.onChange(e.target.value)
        }}/>
    )
}