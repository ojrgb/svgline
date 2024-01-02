import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import styled from 'styled-components'
import { entitiesStore } from 'Context/entitiesStore'

const Classes = {
    Root: styled.div`
       
    `,
    Editor: styled.div`
      
    `,
    Preview: styled.div`
      
    `
}

export default function Calculation(props: {
    value: string,
    onChange: (val: string) => void,
    onBlur: () => void
}) {
    const {entitiesState, entitiesDispatch} = React.useContext(entitiesStore)
   

    const {value} = props
    const onChange = (value: any) => {
       
        props.onChange(value)
    };
   
    return (
        <Classes.Root>
            <Classes.Editor>
                <CodeMirror value={value} width="100%" theme="dark" placeholder="" extensions={[javascript({ jsx: true })]} onChange={onChange} onBlur={props.onBlur} />;
            </Classes.Editor>
            <Classes.Preview>

            </Classes.Preview>
        </Classes.Root>
    )
}

