import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Divider from './Divider'
import { convertRemToPixels, deepenColor, modifySize } from 'utils'

const headerSizeModifier = 1.3,
headerColorModifier = 0.0,
    sideSizeModifier = 1,
    headerSize = modifySize(theme.fonts.body.size,headerSizeModifier),
    headerSizePx = convertRemToPixels(headerSize),
    sideSizePx = headerSizePx * sideSizeModifier
    


const BoxContainer = styled.div`
        ${props => props.w && `width: ${theme.scale.width[props.w]}`};
        ${props => props.h && `height: ${theme.scale.height[props.h]}`};
        display: flex;
        flex-direction: ${props => ({
            top: 'column',
            bottom: 'column',
            left: 'row',
            right: 'row'
        }[props.headerPosition])};
        align-items: baseline;
    `,
    HeaderContainer = styled.div`
        display: flex;
        font-size: ${theme.fonts.body.size};
        cursor: default;
        user-select: none;
        flex-direction: ${props => ({
            top: 'row',
            bottom: 'row',
            left: 'column',
            right: 'column'
        }[props.headerPosition])};
        align-self: ${props => ({
            'left-top': 'flex-start'
        }[`${props.headerPosition}-${props.headerAlignment}`])};
    `,
    HeaderText = styled.div`
        background-color: ${props => deepenColor(theme.colors.primary,props.depth || 0)};
        color: ${deepenColor(theme.colors.text.primary,headerColorModifier)};
        ${props => (`border-${{
            left: 'right',
            right: 'left',
            top: 'top',
            bottom: 'bottom'
        }[props.headerPosition]}: ${theme.borders.primary.width} ${theme.borders.primary.style} ${theme.borders.primary.color}`)};   
        
        padding: ${theme.scale.space[1]};
        z-index: ${theme.scale.zIndices[1]};
        text-shadow: 0.1px 0.1px 5px ${deepenColor(theme.colors.text.primary,0.8)};
        ${props => ((props.headerPosition === 'left' || props.headerPosition === 'right') && 
        `writing-mode: vertical-lr;
        transform: rotate(180deg);`)}
    `,
    Content = styled.div`
        width: 100%;
        height: 100%;
        ${props => `margin-${props.headerPosition}: -1px`};
        
        background-color: ${props => deepenColor(theme.colors.primary,props.depth || 0)};
        color: ${theme.colors.text.primary};
        border: ${theme.borders.primary.width} ${theme.borders.primary.style} ${theme.borders.primary.color};
        border-top-left-radius: 0px;
        border-top-right-radius: ${theme.borders.primary.radius};
        border-bottom-left-radius: ${theme.borders.primary.radius};
        border-bottom-right-radius: ${theme.borders.primary.radius};
        z-index: ${theme.scale.zIndices[0]};
        flex-grow: 1;
        box-shadow: 1px 5px 15px -8px ${theme.colors.primary}, -15px -15px 30px -50px ${theme.colors.text.primary} inset;
        display: flex;
        flex-direction: column;
        align-items: baseline;
        padding: ${theme.scale.space[2]};
    `

    function HeaderSide({side, depth, headerPosition}) {
        const [sideWidth, sideHeight] = headerPosition === 'top' || headerPosition === 'bottom' ? [sideSizePx, headerSizePx] : [headerSizePx, sideSizePx]
        const lineDims = {
            x1: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            },
            x2: {
                top: sideWidth,
                bottom: sideWidth,
                left: sideWidth,
                right: sideWidth
            },
            y1: {
                top: sideHeight,
                bottom: sideHeight,
                left: sideHeight,
                right: sideHeight
            },
            y2: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        }

        const lineDimsCalc = Object.keys(lineDims).map((v,i) => {
            return {[v]: lineDims[v][headerPosition]}
        }).reduce((a,b) => {return Object.assign({},a,b)})

        const polygonPoints = `${lineDimsCalc.x1},${lineDimsCalc.y1} ${lineDimsCalc.x2},${lineDimsCalc.y2} ${lineDimsCalc.x2},${lineDimsCalc.y1}`

        const transformScale = {
            top: {
                left: 'scaleX(1) translate(0px,0.5px)',
                right: 'scaleX(-1) translate(2px,0.5px)'
            },
            left: {
                left: 'scaleY(1) translate(0.5px, 0px)',
                right: 'scaleY(-1) translate(0.5px, 2px)'
            }
        }

        return (
            <svg 
                    width={sideWidth} 
                    height={sideHeight}
                    style={{
                        transform: transformScale[headerPosition][side],
                        zIndex: theme.scale.zIndices[1]
                    }}
                >
                    <line 
                        {...lineDimsCalc}
                        stroke={deepenColor(theme.borders.primary.color,depth || 0)} 
                        strokeWidth={modifySize(theme.borders.primary.width,2)}
                    />
                    <polygon 
                        points={polygonPoints} 
                        fill={theme.colors.primary}
                        />
                </svg>
        )
    }

    function Header({children, depth, headerPosition, headerAlignment}) {
        // This splits top-right into [top,right] etc
        return (
            <HeaderContainer {...{headerPosition, headerAlignment}}>
                <HeaderSide side="left" {...{depth, headerPosition}}/>
                <HeaderText {...{depth, headerPosition}}>
                    {children}
                </HeaderText>
                <HeaderSide side="right" {...{depth, headerPosition}}/>
            </HeaderContainer>
        )
    }

    function Box(props) {
        const {children} = props
        const depth = theme.colors.deepen[props.depth]
        const headerLocation = props.headerLocation || 'top-left'
        const [headerPosition, headerAlignment] = headerLocation.split('-')
        return (
            <BoxContainer {...props} {...{depth, headerPosition}}>
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {
                            depth,
                            headerPosition, 
                            headerAlignment
                        })
                    })
                }
            </BoxContainer>
        )
    }

export default Object.assign(Box,{
    Header,
    Content,
    Divider
})

