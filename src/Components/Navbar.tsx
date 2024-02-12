import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import { deepenColor,relaxColor } from 'utils'
import { contextStore } from 'Context/contextStore'

const deepenDelta = 0.1,
deepenDeltaHover = 0.01

const Classes = {
    Root: styled.div<{
        height: number;
    }>`
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
        min-width: 100px;
        &:hover {
            background-color: ${relaxColor(theme.colors.primary,deepenDeltaHover)};
            
        }
    `,
    NavbarListContainer: styled.div<{
        active?: boolean;
    
    }>`
        display: ${props => props.active ? 'flex' : 'none'};
        border: ${theme.borders.primary.width} ${theme.borders.primary.style} ${deepenColor(theme.borders.primary.color,deepenDelta)};
        flex-direction: column;
    `,
    NavbarTextContainer: styled.div`
        
    `
}

const NavbarButton = (props: {
    text: string;
    children: React.ReactNode;
}) => {
    const [active,setActive] = React.useState(false)

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const navbarButtonContainer = document.querySelector('.navbar-button-container');
            if (navbarButtonContainer && !navbarButtonContainer.contains(event.target as Node)) {
                setActive(false);
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <Classes.NavbarButtonContainer className="navbar-button-container" onClick={() => {setActive(!active)}}>
            <Classes.NavbarButton className="navbar-button">
                <Classes.NavbarTextContainer className="navbar-text-container">{props.text}</Classes.NavbarTextContainer>
            </Classes.NavbarButton>
            <Classes.NavbarListContainer className="navbar-list-container" active={active}>
                {props.children}
            </Classes.NavbarListContainer>
        </Classes.NavbarButtonContainer>
    )
}

const NavbarItem = (props: {
    text: string;
    onClick: () => void;
}) => {
    return (
        <Classes.NavbarButton className="navbar-item-button navbar-item-button-single" onClick={props.onClick}>
            <Classes.NavbarTextContainer className="navbar-item-text-container">{props.text}</Classes.NavbarTextContainer>
        </Classes.NavbarButton>
    )
}

export default function Navbar (props) {
    const {height} = props
    const {contextDispatch} = React.useContext(contextStore)
    
    function exportSvg() {
        var source = document.getElementById("resultPreview").outerHTML;
        if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }
        var svgBlob = new Blob([source], {type:"image/svg+xml;charset=utf-8"});
        var svgUrl = URL.createObjectURL(svgBlob);
        var downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = "newesttree.svg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    return (
        <Classes.Root {...{height}} id="navbar">
            <NavbarButton text="file" {...{height}}>
                <NavbarItem text="load" 
                    onClick={async () => {contextDispatch({type: 'OPEN_MODAL', _id: 'loadFlow'})}}
                />
                <NavbarItem text="save" 
                    onClick={async () => {contextDispatch({type: 'OPEN_MODAL', _id: 'saveFlow'})}}
                />
                <NavbarItem text="export" 
                    onClick={async () => {exportSvg()}}
                />
            </NavbarButton>
        </Classes.Root>    
    )
}