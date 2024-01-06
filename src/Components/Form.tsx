import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Select from './Select'
import Text from './Text'
import _ from 'lodash'
import { entitiesStore } from 'Context/entitiesStore'
import { modifySize } from 'utils'
import Calculation from './Calculation'
import ColorPicker from './ColorPicker'

const captionSizeModifier = 0.9

const Classes = {
    Root: styled.form`
        width: 100%;
        max-height: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;
        font-size: ${theme.fonts.code.size};
    `,
    Single: styled.div<{w: number}>`
        ${props => props.w && `width: ${theme.scale.width[props.w]};`}
        display: flex;
        flex-direction: column;
        margin-bottom: ${theme.scale.space[2]};
    `,
    Caption: styled.div`
        font-family: ${theme.fonts.code.family};
        user-select: none;
        font-size: ${modifySize(theme.fonts.code.size,captionSizeModifier)};
        text-align: left;
    `,
    InputFieldContainer: styled.div`
        display: flex;
        justify-content: flex-start;
    `,
    InputFieldElementContainer: styled.div<{valid: boolean}>`
        ${props => props.valid ? `border-right: 3px solid rgba(0,0,0,0);` : `border-right: 3px solid ${theme.colors.error};`}
        width: 70%;
    `,
    

}

function Form(props) {
    const {children, entity} = props
    const [object, setObject] = React.useState(props.object || {})

    const {entitiesState, entitiesDispatch} = React.useContext(entitiesStore)
    return (
        <Classes.Root>
            {React.Children.map(children,(child) => {return React.cloneElement(child,{
                onChange: (v) => {
                    const res = _.merge({},object,{[child.props.attribute]:v})
                    setObject(res)
                    if(!!child.props.immediate) {
                        props.onBlur(res)
                    }
                },
                onBlur: () => {
                        props.onBlur(object)
                    },  
                value: object[child.props.attribute] && object[child.props.attribute]?.value ? object[child.props.attribute]?.value : object[child.props.attribute] || ''
            })})}
        </Classes.Root>
    )
}

function Field(props: React.HTMLAttributes<HTMLDivElement> & React.PropsWithChildren<{
        children?: React.ReactNode, // The children to render.
        value?: any,
        attribute?: string,
        w?: number,
        onChange?: (v: any) => void,
        onBlur?: () => void,
        immediate?: boolean,
        mandatory?: boolean
    }>
    ) {
        const {children, value, attribute, w, onChange, onBlur, immediate, mandatory} = props
    return (
        <Classes.Single {...{w}}>
            {React.Children.map(children,(child) => {
                return React.cloneElement((child as React.ReactElement),
                    {
                        value, 
                        attribute,
                        onChange,
                        onBlur,
                        immediate,
                        mandatory
                    })
            })}
        </Classes.Single>
    )
}

/**
 * Renders an input element with the provided props.
 * 
 * @param type - The input's type.
 * @returns The rendered input element.
 */
function Input(props: React.HTMLAttributes<HTMLInputElement> & React.PropsWithChildren<{
    type: string,
    options?: string[],
    onChange?: (v: any) => void,
    onBlur?: () => void,
    immediate?: boolean,
    mandatory? :boolean,
    value?: any
}>) {
    const {type, options, onBlur, immediate, mandatory, value} = props
    
    const onChange = (v: any) => {
        props.onChange && props.onChange(props.type==='calculation' ? {value: v, type: props.type} : v)
    }
    const selectedProps = {type, options, onChange, onBlur, immediate, value}
    const InputField = {
        select: Select, 
        list: Select,
        'string': Text,
        'number': Text,
        'identifier': Text,
        'calculation': Calculation,
        color: ColorPicker,
    }[props.type]
    if(!!!InputField) {
        return (<div>{`Couldn't find field for type: ${props.type}`}</div>)
    }
    return (
        <Classes.InputFieldContainer>
            <Classes.InputFieldElementContainer valid={
                // Implement mandatory check below.
                (mandatory!==true || (value?.length>0))
            }><InputField {...selectedProps} w={10}/></Classes.InputFieldElementContainer>
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