import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Divider from './Divider'
import { convertRemToPixels, modifySize } from 'utils'

const headerSizeModifier = 1.3,
    sideSizeModifier = 1,
    headerSize = modifySize(theme.fonts.body.size,headerSizeModifier),
    headerSizePx = convertRemToPixels(headerSize),
    sideSizePx = headerSizePx * sideSizeModifier
    


const Box = styled.div`
        ${props => props.w && `width: ${theme.scale.width[props.w]}`};
        display: flex;
        flex-direction: column;
        align-items: baseline;
    `,
    HeaderContainer = styled.div`
        display: flex;
        font-size: ${theme.fonts.body.size};
    `,
    HeaderText = styled.div`
        background-color: ${theme.colors.primary};
        color: ${theme.colors.text.primary};
        border-top: ${theme.borders.primary.width} ${theme.borders.primary.style} ${theme.borders.primary.color};
        padding: ${theme.scale.space[1]};
        z-index: ${theme.scale.zIndices[1]};
    `,
    Content = styled.div`
        width: 100%;
        margin-top: -1px;
        background-color: ${theme.colors.primary};
        color: ${theme.colors.text.primary};
        border: ${theme.borders.primary.width} ${theme.borders.primary.style} ${theme.borders.primary.color};
        border-top-left-radius: 0px;
        border-top-right-radius: ${theme.borders.primary.radius};
        border-bottom-left-radius: ${theme.borders.primary.radius};
        border-bottom-right-radius: ${theme.borders.primary.radius};
        z-index: ${theme.scale.zIndices[0]};
    `

    function HeaderSide({side}) {
        return (
            <svg 
                    width={sideSizePx} 
                    height={headerSizePx}
                    style={{
                        transform: `scaleX(${side==='right' ? -1 : 1})`,
                        zIndex: theme.scale.zIndices[1]
                    }}
                >
                    <line 
                        x1={0} 
                        x2={sideSizePx} 
                        y1={headerSizePx} 
                        y2={0} 
                        stroke={theme.borders.primary.color} 
                        strokeWidth={modifySize(theme.borders.primary.width,2)}
                    />
                    <polygon 
                        points={`0,${headerSizePx} ${sideSizePx},0 ${headerSizePx},${sideSizePx}`} 
                        fill={theme.colors.primary}
                        />
                </svg>
        )
    }

    function Header(props) {
        return (
            <HeaderContainer>
                <HeaderSide side="left"/>
                <HeaderText>
                    {props.children}
                </HeaderText>
                <HeaderSide side="right"/>
            </HeaderContainer>
        )
    }


export default Object.assign(Box,{
    Header,
    Content,
    Divider
})

