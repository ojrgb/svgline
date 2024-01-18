import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import ContextEditor from 'Components/ContextWorkspace'
import Navbar from 'Components/Navbar'
import { contextStore } from 'Context/contextStore'

const navbarHeight = theme.navbar.height;
const navbarMargin = theme.navbar.margin;

const Classes = {
    Root: styled.div`
        background-color: ${theme.colors.background};
        height: 100%;
        font-family: ${theme.fonts.body.family};
        font-size: ${theme.fonts.body.size};
        padding: 0;
        
    `,
    NavbarDivider: styled.div`
        height: ${navbarMargin}px;
    `,
    ContextEditorContainer: styled.div`
        height: calc(100% - ${navbarHeight + navbarMargin}px);
    `

}

export default function Main(props: React.HTMLAttributes<HTMLDivElement> & React.PropsWithChildren<{}>) {
    const {contextDispatch} = React.useContext(contextStore)
    return (
        <Classes.Root id="main-container">
            <Navbar id="navbar"/>
            <Classes.NavbarDivider id="navbar-divider"/>
            <Classes.ContextEditorContainer id="context-editor-container">
                <ContextEditor id="context-editor"/>
            </Classes.ContextEditorContainer>
        </Classes.Root>
    )
}