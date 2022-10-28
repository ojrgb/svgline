import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Button from './Button'

const Classes = {
    Root: styled.div`

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