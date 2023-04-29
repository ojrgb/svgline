import React from 'react'
import theme from 'theme.js'
import styled from 'styled-components'
import Space from './Space.js'

const Classes = {
    Line: styled.div`
        border-bottom: ${theme.borders.secondary.width} ${theme.borders.secondary.style} ${theme.borders.secondary.color};
        width: ${props => props.w ? theme.scale.width[props.w] : "100%"};
    `
}

export default function Divider(props) {
    return (
        <Space {...props}>
            <Classes.Line/>
        </Space>
    )
}