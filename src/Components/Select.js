import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import { deepenColor } from 'utils'

const deepenDelta = 0.1

const Classes = {
    Root: styled.select`
        background-color: ${deepenColor(theme.colors.primary,deepenDelta)}; 
    `
}

function Select(props) {
    return (
        <select>
            {props.children}
        </select>
    )
}

function Option(props) {
    return (
        <option {...props}/>
    )
}

export default Object.assign(Select, {Option})