import React from 'react'
import theme from 'theme.js'
import styled from 'styled-components'
import { deepenColor } from 'utils.js'
import dataService from './Data/dataService.js'
import { entitiesStore } from 'Context/entitiesStore.js'

const deepenDelta = 0.1,
deepenDeltaHover = 0.01

const Classes = {
    Root: styled.div`
        height: ${theme.navbar.height}px;
        background-color: ${deepenColor(theme.colors.primary,deepenDelta)};
        border-bottom: ${theme.borders.primary.width} ${theme.borders.primary.style} ${deepenColor(theme.borders.primary.color,deepenDelta)};
        display: flex;
        justify-content: flex-start;
        font-size: ${props => props.height*0.5}px;
        color: ${theme.colors.text.primary};
        
    `,
    NavbarButtonContainer: styled.div`
        display: flex;
        
        cursor: default;
        flex-direction: column;
        height: ${theme.navbar.height}px;
        &:hover {
            background-color: ${deepenColor(theme.colors.primary,deepenDeltaHover)};
            
        }
        z-index: 9999;
    `,
    NavbarButton: styled.div`
        padding-left: ${theme.scale.space[3]};
        padding-right: ${theme.scale.space[3]};
        height: ${theme.navbar.height}px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        background-color: ${deepenColor(theme.colors.primary,deepenDelta)};
        border-bottom: ${theme.borders.primary.width} ${theme.borders.primary.style} ${deepenColor(theme.borders.primary.color,deepenDelta)};
    `,
    NavbarListContainer: styled.div`
        display: ${props => props.active ? 'flex' : 'none'};
        border: ${theme.borders.primary.width} ${theme.borders.primary.style} ${deepenColor(theme.borders.primary.color,deepenDelta)};
    `,
    NavbarTextContainer: styled.div`
        
    `
}

const NavbarButton = (props) => {
    const [active,setActive] = React.useState()

    return (
        <Classes.NavbarButtonContainer onClick={() => {setActive(!active)}}>
            <Classes.NavbarButton>
                <Classes.NavbarTextContainer>{props.text}</Classes.NavbarTextContainer>
            </Classes.NavbarButton>
            <Classes.NavbarListContainer active={active}>
                {props.children}
            </Classes.NavbarListContainer>
        </Classes.NavbarButtonContainer>
    )
}

const NavbarItem = (props) => {
    return (
        <Classes.NavbarButton onClick={props.onClick}>
            <Classes.NavbarTextContainer>{props.text}</Classes.NavbarTextContainer>
        </Classes.NavbarButton>
    )
}

export default function Navbar (props) {
    const {height} = props
    const {entitiesState, entitiesDispatch} = React.useContext(entitiesStore)
    console.log(entitiesState)
    return (
        <Classes.Root {...{height}}>
            <NavbarButton text="file" {...{height}}>
                <NavbarItem text="save" 
                    onClick={async () => {console.log(await dataService.save({item: entitiesState}))}}
                />
            </NavbarButton>
        </Classes.Root>    
    )
}