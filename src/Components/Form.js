import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Select from './Select'
import Text from './Text'
import _ from 'lodash'

const Classes = {
    Root: styled.form`
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    `,
    Single: styled.div`
        ${props => props.w && `width: ${theme.scale.width[props.w]};`}
        display: flex;
        flex-direction: column;
    `,
    Caption: styled.div`
    
    `

}

function Form(props) {
    const [object, setObject] = React.useState(props.object || {})
    return (
        <Classes.Root>
            {React.Children.map(props.children,(child) => {return React.cloneElement(child,{
                onChange: (v) => {
                    setObject(_.merge({},object,{[child.attribute]:v}))
                },
                value: object[child.attribute] 
            })})}
        </Classes.Root>
    )
}

function Field({children, value, attribute, w}) {
    return (
        <Classes.Single {...{w}}>
            {React.Children.map(children,(child) => {
                return React.cloneElement(child,
                    {
                        value, 
                        attribute
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