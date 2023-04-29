import React from 'react'
import theme from 'theme.js'
import styled from 'styled-components'
import Button from './Button.js'
import { deepenColor } from 'utils.js'

const Classes = {
    Root: styled.div`
        padding: ${theme.scale.space[1]};
        background-color: ${deepenColor(theme.colors.primary,0.2)};
        box-shadow: ${theme.scale.space[1]} ${theme.scale.space[1]} ${theme.scale.space[8]} -${theme.scale.space[6]} ${theme.colors.text.primary};
    `
}

function Toolbar(props) {
    return (
        <Classes.Root>
            {props.children}
        </Classes.Root>
    )
}

export default Object.assign(Toolbar,{
    Button
})