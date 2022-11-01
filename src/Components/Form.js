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
    Single: styled.div`
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
                    const res = _.merge({},object,{[child.props.attribute]:v})
                    setObject(res)
                    if(!!child.props.immediate) {
                        props.onBlur(res)
                    }
                },
                onBlur: () => {
                        props.onBlur(object)
                    },  
                value: object[child.props.attribute] || ''
            })})}
        </Classes.Root>
    )
}

function Field({children, value, attribute, w, onChange, onBlur, immediate}) {
    return (
        <Classes.Single {...{w}}>
            {React.Children.map(children,(child) => {
                return React.cloneElement(child,
                    {
                        value, 
                        attribute,
                        onChange,
                        onBlur,
                        immediate
                    })
            })}
        </Classes.Single>
    )
}

function Input(props) {
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
        <InputField {...props} w={7}/>
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