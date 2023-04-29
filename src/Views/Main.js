import React from 'react'
import theme from 'theme.js'
import styled from 'styled-components'
import ContextEditor from 'Components/ContextWorkspace.js'
import Navbar from 'Components/Navbar.js'

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

export default function Main({children}) {
    return (
        <Classes.Root>
            <Navbar/>
            <Classes.NavbarDivider/>
            <Classes.ContextEditorContainer>
                <ContextEditor/>
            </Classes.ContextEditorContainer>
        </Classes.Root>
    )
}