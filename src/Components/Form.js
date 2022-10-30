import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Select from './Select'
import Text from './Text'
import _ from 'lodash'
import { entitiesStore } from 'Context/entitiesStore'
import { modifySize } from 'utils'

const captionSizeModifier = 0.9

const Classes = {
    Root: styled.form`
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        font-size: ${theme.fonts.code.size};
    `,
    Single: styled.div`
        ${props => props.w && `width: ${theme.scale.width[props.w]};`}
        display: flex;
        flex-direction: column;
    `,
    Caption: styled.div`
        font-family: ${theme.fonts.code.family};
        user-select: none;
        font-size: ${modifySize(theme.fonts.code.size,captionSizeModifier)};
    `

}

function Form(props) {
    const {children, entity} = props
    const [object, setObject] = React.useState(props.object || {})
    const {entitiesState, entitiesDispatch} = React.useContext(entitiesStore)
    return (
        <Classes.Root>
            {React.Children.map(children,(child) => {return React.cloneElement(child,{
                onChange: (v) => {
                    setObject(_.merge({},object,{[child.props.attribute]:v}))
                },
                onBlur: () => {
                        props.onBlur(object)
                    },
                value: object[child.props.attribute] 
            })})}
        </Classes.Root>
    )
}

function Field({children, value, attribute, w, onChange, onBlur}) {
    return (
        <Classes.Single {...{w}}>
            {React.Children.map(children,(child) => {
                return React.cloneElement(child,
                    {
                        value, 
                        attribute,
                        onChange,
                        onBlur
                    })
            })}
        </Classes.Single>
    )
}

function Input(props) {
    const InputField = {
        select: Select, 
        list: Select,
        string: Text,
        identifier: Text
    }[props.type]
    if(!!!InputField) {
        console.log(`Couldn't find field for type: ${props.type}`)
    }
    return (
        <InputField {...props}/>
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