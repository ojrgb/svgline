import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import ContextEditor from 'Components/ContextWorkspace'

const Classes = {
    Root: styled.div`
        background-color: ${theme.colors.background};
        height: 100%;
    `,

}

export default function Main({children}) {
    return (
        <Classes.Root>
            <ContextEditor/>
        </Classes.Root>
    )
}