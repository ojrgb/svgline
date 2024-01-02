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
    Root: styled.select`
    ${applyQuickStyles}
    font-family: ${theme.fonts.code.family};
    font-size: ${theme.fonts.code.size};
    border: ${modifySize(theme.borders.primary.width,borderThicknessDelta)} inset ${relaxColor(theme.borders.primary.color,relaxBorderDelta)}};
        background-color: ${relaxColor(theme.colors.primary,relaxDelta)}; 
        color: ${relaxColor(theme.colors.text.primary,relaxTextDelta)};
        border-radius: 0px;
        border: ${modifySize(theme.borders.primary.width,borderThicknessDelta)} inset ${relaxColor(theme.borders.primary.color,relaxBorderDelta)},${deepenColor(theme.borders.primary.color,deepenBorderDelta)};
        &:focus {
            border: ${modifySize(theme.borders.primary.width,borderThicknessDelta)} inset ${relaxColor(theme.borders.primary.color,relaxBorderDelta)},${deepenColor(theme.borders.primary.color,deepenBorderDelta)};
            outline: none;
        } 
    `,
    Option: styled.option`
        border-radius: 0px;
    `
}

function Select(props: React.HTMLAttributes<HTMLSelectElement> & React.PropsWithChildren<{
    options: any[], // Select options
    w: number, // Width of the select
    onChange: (v: any) => void, // On change handler
}>) {
    
    return (
        <Classes.Root {...props} onChange={(e) => {
            props.onChange(e.target.value);
            }}>
            {props.children}
            
            {[{_id:'',name:''}].concat(props.options).filter(Boolean).map((option,optioni) => 
                <Option key={optioni} value={option._id}>{option.name}</Option>
            )}
        </Classes.Root>
    )
}

function Option(props) {
    return (
        <Classes.Option {...props}/>
    )
}

export default Object.assign(Select, {Option})