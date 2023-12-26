import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import styled from 'styled-components'
import { entitiesStore } from 'Context/entitiesStore.js'
import { evaluate } from './Calculations/CalculationParser';

const Classes = {
    Root: styled.div`
       
    `,
    Editor: styled.div`
      
    `,
    Preview: styled.div`
      
    `
}

export default function Calculation(props) {
    const {entitiesState, entitiesDispatch} = React.useContext(entitiesStore)
    const [value, setValue] = React.useState("");
    const onChange = React.useCallback((val, viewUpdate) => {
        console.log('val:', val);
        setValue(val);
    }, []);
    const generatePreview = () =>{
            return evaluate({
                expression: value,
                p: entitiesState
            })
    }
    console.log(generatePreview())
    return (
        <Classes.Root>
            <Classes.Editor>
                <CodeMirror value={value} width="100%" theme="dark" placeholder="" extensions={[javascript({ jsx: true })]} onChange={onChange} />;
            </Classes.Editor>
            <Classes.Preview>

            </Classes.Preview>
        </Classes.Root>
    )
}

