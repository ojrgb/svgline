import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Divider from './Divider'

const Box = styled.div`
        ${props => props.w && `width: ${theme.scale.width[props.w]}`}
        background-color: ${theme.colors.primary};
        color: ${theme.colors.text.primary};
        border: ${theme.borders.primary.width} ${theme.borders.primary.style} ${theme.borders.primary.color};
        border-radius: ${theme.borders.primary.radius};
    `,
    Header = styled.div`
        background-color: ${theme.colors.secondary};
        color: ${theme.colors.text.secondary};
        border-bottom: ${theme.borders.secondary.width} ${theme.borders.secondary.style} ${theme.borders.secondary.color};
        padding: ${theme.scale.space[1]};
        
    `,
    Content = styled.div`
        
    `



export default Object.assign(Box,{
    Header,
    Content,
    Divider
})

