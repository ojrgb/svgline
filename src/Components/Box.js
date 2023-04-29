import React from 'react'
import theme from 'theme.js'
import styled from 'styled-components'
import Divider from './Divider.js'
import { convertRemToPixels, deepenColor, modifySize } from 'utils.js'
import _ from 'lodash'

const headerSizeModifier = 1.3,
headerColorModifier = 0.0,
    sideSizeModifier = 1,
    headerSize = modifySize(theme.fonts.body.size,headerSizeModifier),
    headerSizePx = convertRemToPixels(headerSize),
    sideSizePx = headerSizePx * sideSizeModifier,
    inactiveHeaderOpacity = 0.6
    


const BoxContainer = styled.div`
        ${props => props.w && `width: ${theme.scale.width[props.w]}`};
        ${props => props.h && `height: ${theme.scale.height[props.h]}`};
        display: flex;
        flex-direction: ${props => ({
            top: 'column',
            bottom: 'column-reverse',
            left: 'row',
            right: 'row-reverse'
        }[props.headerPosition])};
        align-items: baseline;
    `,
    HeaderContainer = styled.div`
        ${props => (
            {
                top: `height: ${headerSizePx}px;`,
                bottom: `height: ${headerSizePx}px;`,
                left: `width: ${headerSizePx}px;`,
                right: `width: ${headerSizePx}px;`
            }[props.headerPosition]
        )}
        display: flex;
        font-size: ${theme.fonts.body.size};
        cursor: ${props => (props.onClick ? 'pointer' : 'default')};
        user-select: none;
        flex-direction: ${props => ({
            top: 'row',
            bottom: 'row',
            left: 'column',
            right: 'column'
        }[props.headerPosition])};
        align-self: ${props => ({
            'left-top': 'flex-start',
            'bottom-center': 'center',
            'top-center': 'center',
            'right-top': 'flex-start'
        }[`${props.headerPosition}-${props.headerAlignment}`])};
        transform: ${props => (props.tabId>0 ? 'translate(0px,-40px)' : '')};
        z-index: ${props => props.z ? props.z : ''}${props => (props.active===false ? theme.scale.zIndices[0] : theme.scale.zIndices[2])};
        opacity: ${props => (props.active===false ? inactiveHeaderOpacity : 1)};
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
        z-index: ${props => props.z ? props.z : ''}${theme.scale.zIndices[1]};
        text-shadow: 0.1px 0.1px 15px ${deepenColor(theme.colors.text.primary,0.8)};
        ${props => ((props.headerPosition === 'left' || props.headerPosition === 'right') && 
        `writing-mode: vertical-lr;
        transform: rotate(180deg);`)}
    `,
    Content = styled.div`
    ${props => (
        {
            top: `height: calc(100% - ${headerSizePx}px); width: 100%;`,
            bottom: `height: calc(100% - ${headerSizePx}px); width: 100%;`,
            left: `width: calc(100%); height: 100%;`,
            right: `width: calc(100%); height: 100%;`,
        }[props.headerPosition]
    )}
        overflow-x: ${props => (props.overflowX || 'unset')};
        overflow-y: ${props => (props.overflowY || 'unset')};
        max-height: calc(100%);
        ${props => `margin-${props.headerPosition}: -1px`};
        ${props => (props.active===false ? `display: none;` : ``)}
        background-color: ${props => deepenColor(theme.colors.primary,props.depth || 0)};
        color: ${theme.colors.text.primary};
        border: ${theme.borders.primary.width} ${theme.borders.primary.style} ${theme.borders.primary.color};
        border-top-left-radius: 0px;
        border-top-right-radius: ${theme.borders.primary.radius};
        border-bottom-left-radius: ${theme.borders.primary.radius};
        border-bottom-right-radius: ${theme.borders.primary.radius};
        z-index: ${props => props.z ? props.z : ''}${theme.scale.zIndices[0]};
        flex-grow: 1;
        box-shadow: 1px 5px 15px -8px ${theme.colors.primary}, -15px -15px 30px -50px ${theme.colors.text.primary} inset;
        display: flex;
        flex-direction: column;
        align-items: baseline;
        padding: ${theme.scale.space[2]};
        ${props => (props.active===false ? 'display: none;' : '')}
    `,
    HeaderTabsContainer = styled.div`
        display: flex;
        align-self: flex-start;
        flex-direction: column;
        
    `,
    ContentTabsContainer = styled.div`
        height: 100%;
        width: 100%;
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
            },
            bottom: {
                left: 'scaleX(1) scaleY(-1) translate(0px,-0.5px)',
                right: 'scaleX(-1) scaleY(-1) translate(2px,-0.5px)'
            },
            right: {
                left: 'scaleX(-1) translate(1px,1px)',
                right: 'scaleX(-1) scaleY(-1) translate(1px,0.5px)'
            },
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
                        fill={deepenColor(theme.colors.primary,depth)}
                        />
                </svg>
        )
    }

    function Header({children, depth, headerPosition, headerAlignment, onClick, tabId, active, z}) {
        // This splits top-right into [top,right] etc
        return (
            <HeaderContainer {...{headerPosition, headerAlignment, onClick, tabId, active, z}}>
                <HeaderSide side="left" {...{depth, headerPosition}}/>
                <HeaderText {...{depth, headerPosition}}>
                    {children}
                </HeaderText>
                <HeaderSide side="right" {...{depth, headerPosition}}/>
            </HeaderContainer>
        )
    }

    function Box(props) {
        const {children, z} = props
        const depth = theme.colors.deepen[props.depth]
        const headerLocation = props.headerLocation || 'top-left'
        const [headerPosition, headerAlignment] = headerLocation.split('-')
        const [activeTab, setActiveTab] = React.useState(0)
        return (
            <BoxContainer {...props} {...{depth, headerPosition}}>
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {
                            depth,
                            headerPosition, 
                            headerAlignment,
                            setActiveTab,
                            activeTab,
                            z
                        })
                    })
                }
            </BoxContainer>
        )
    }

function HeaderTabs(props) {
    return (
        <HeaderTabsContainer>
            {
                React.Children.map(props.children,(child, childi) => (
                    React.cloneElement(
                        child,
                        Object.assign({},_.omit(props,'children'),{
                            tabId: childi,
                            active: childi === props.activeTab,
                            onClick: () => {
                                props.setActiveTab(childi)
                            },
                            z: props.z
                        })
                        )
                    ))
            }
        </HeaderTabsContainer>
    )
}

function ContentTabs(props) {
    return (
        <ContentTabsContainer>
            {
                React.Children.map(props.children,(child, childi) => (
                    React.cloneElement(
                        child,
                        Object.assign({},_.omit(props,'children'),{
                            tabId: childi,
                            active: props.activeTab===childi,
                            z: props.z
                        })
                        )
                    ))
            }
        </ContentTabsContainer>
    )
}

export default Object.assign(Box,{
    Header,
    HeaderTabs,
    ContentTabs,
    Content,
    Divider
})

