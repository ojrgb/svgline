import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import styled from 'styled-components'
import { entitiesStore } from 'Context/entitiesStore'
import theme from 'theme';

const Classes = {
    Root: styled.div.attrs({className: 'calculation-root'})`
      width: 70%; 
    `,
    Editor: styled.div.attrs({className: 'calculation-editor'})`
      &>* {
        font-size: ${theme.fonts.code.size};
      }
      font-size: 0px;
    `,
    Preview: styled.div.attrs({className: 'calculation-preview'})`
      
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
                <CodeMirror value={value} theme="dark" extensions={[javascript({ jsx: true })]} onChange={onChange} onBlur={props.onBlur} />;
            </Classes.Editor>
            <Classes.Preview>

            </Classes.Preview>
        </Classes.Root>
    )
}

