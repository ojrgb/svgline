import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Select from './Select'
import Text from './Text'
import _ from 'lodash'
import { modifySize } from 'utils'
import Calculation from './Calculation'
import ColorPicker from './ColorPicker'

const captionSizeModifier = 0.9

const Classes = {
    Root: styled.form.attrs({className: 'form-root'})`
        width: 100%;
        max-height: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;
        font-size: ${theme.fonts.code.size};
    `,
    Single: styled.div.attrs({className: 'field-single'})<{w: number}>`
        ${props => props.w && `width: ${theme.scale.width[props.w]};`}
        display: flex;
        flex-direction: column;
        margin-bottom: ${theme.scale.space[2]};
    `,
    Caption: styled.div.attrs({className: 'form-caption'})`
        font-family: ${theme.fonts.code.family};
        user-select: none;
        font-size: ${modifySize(theme.fonts.code.size,captionSizeModifier)};
        text-align: left;
    `,
    InputFieldContainer: styled.div.attrs({className: 'input-field'})`
        display: flex;
        justify-content: flex-start;
    `,
    InputFieldElementContainer: styled.div<{valid: boolean}>`
        ${props => props.valid ? `border-right: 3px solid rgba(0,0,0,0);` : `border-right: 3px solid ${theme.colors.error};`}
        width: 70%;
    `,
    

}

function Form(props) {
    const {children, ...rest} = props
    return (
        <Classes.Root {...rest}>
            {children}
        </Classes.Root>
    )

}

function Field(props) {
    const {children, ...rest} = props
    return (
        <Classes.Single {...rest}>
            {children}
        </Classes.Single>
    )
}

function Input(props) {
    const {children, ...rest} = props
    return (
        <Classes.InputFieldContainer {...rest}>
            <Classes.InputFieldElementContainer valid={true}>
            {children}
            </Classes.InputFieldElementContainer>
        </Classes.InputFieldContainer>
    )
}

export default Object.assign(
    Form,
    {
        Select,
        Text,
        Field,
        Caption: Classes.Caption,
        Input
    }
    )