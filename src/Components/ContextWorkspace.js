import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import ConfigurationEditor from './ConfigurationEditor/ConfigurationEditor'

const Classes = {
    Root: styled.div`
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    `
}

export default function ContextWorkspace({children}) {
    return (
        <Classes.Root>
            <ConfigurationEditor w={3}/>
        </Classes.Root>
    )
}