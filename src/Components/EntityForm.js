import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Form from './Form'
import entities from 'ents'
import { entitiesStore } from 'Context/entitiesStore'

export default function EntityForm({entity, path}) {
    const {entitiesState, entitiesDispatch, getSingle} = React.useContext(entitiesStore)
    const object = getSingle(entity, path) 
    const entityConfig = entities[entity]
    return (
        <Form {...{object}}>
            {
                entityConfig.attributes.map((attribute,attributei) => 
                    <Form.Field key={attributei} w={3}>
                        <Form.Caption>{attribute.name || attribute._id}</Form.Caption>
                        <Form.Input 
                            type={attribute.type}
                            attribute={attribute._id}
                            />
                    </Form.Field>
                )
            }
        </Form>
    )
}