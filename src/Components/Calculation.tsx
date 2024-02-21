import React from 'react'
import styled from 'styled-components'
import theme from 'theme';
import CalculationInput from './CalculationInput';

const Classes = {
    Root: styled.div.attrs({className: 'calculation-root'})`
      
    `,
    Editor: styled.div.attrs({className: 'calculation-editor'})`
      &>* {
        font-size: ${theme.fonts.code.size};
      }
      font-size: 0px;
      text-align: left;
    `,
    Preview: styled.div.attrs({className: 'calculation-preview'})`
      
    `,
}

export default function Calculation(props: {
    value: string,
    onChange: (val: string) => void,
    onBlur: () => void
}) {
  
   

    const {value} = props
    const onChange = (value: any) => {
        if(value.length === 0) {
            value = ' '
        }
        props.onChange(value)
    };
   
    return (
        <Classes.Root>
            <Classes.Editor>
                <CalculationInput value={value} onChange={onChange} onBlur={props.onBlur}/>
            </Classes.Editor>
            <Classes.Preview>

            </Classes.Preview>
        </Classes.Root>
    )
}

