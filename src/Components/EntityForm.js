import React from 'react'
import theme from 'theme.js'
import styled from 'styled-components'
import Form from './Form.js'
import entities from 'ents.js'
import { entitiesStore } from 'Context/entitiesStore.js'

export default function EntityForm(props) {
    const {entity, paths} = props
    const target = props.target || entity
    const {entitiesState, entitiesDispatch, getSingle} = React.useContext(entitiesStore)
    const object = getSingle(target, paths) 
    const entityConfig = entities[entity]
    
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
                entityConfig.attributes.filter(v => (v.condition===undefined || v.condition(object)===true)).map((attribute,attributei) => 
                    <Form.Field 
                        key={attributei} 
                        w={3}
                        attribute={attribute._id}
                        immediate={attribute.immediate}
                    >
                        <Form.Caption>{attribute.name || attribute._id}</Form.Caption>
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