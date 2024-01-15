import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Form from './Form'
import entities from 'ents'
import { entitiesStore } from 'Context/entitiesStore'

const Classes = {
    Mandatory: styled.span`
        color: ${theme.colors.error};
    `
}

export default function EntityForm(props) {
    const {entity, paths} = props
    const target = props.target || entity
    const {entitiesState, entitiesDispatch, getSingle} = React.useContext(entitiesStore)
    const object = getSingle(target, paths) 
    const entityConfig = entities[entity]
    if(entity==='elements') {
        console.log(object)
    }
    return (
        <Form {...{object}}
            onBlur={(res) => {
                entitiesDispatch({
                    type:`SET_OBJECT`,
                    object: res,
                    target,
                    paths: paths
                })
            }}
        >
            {
                entityConfig.attributes.filter(v => ((v.condition===undefined || v.condition(object)===true) && v.visible!==false)).map((attribute,attributei) => 
                    <Form.Field 
                        key={attributei} 
                        w={3}
                        attribute={attribute._id}
                        immediate={attribute.immediate}
                        mandatory={attribute.mandatory}
                    >
                        <Form.Caption>{attribute.name || attribute._id}{attribute.mandatory && <Classes.Mandatory>&nbsp;*</Classes.Mandatory>}</Form.Caption>
                        <Form.Input 
                            type={attribute.type}
                            options={attribute.options}
                            />
                    </Form.Field>
                )
            }
        </Form>
    )
}