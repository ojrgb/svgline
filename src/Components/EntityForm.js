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
        <Form {...{object}}
            onBlur={(res) => {
                entitiesDispatch({
                    type:`SET_${entity.toUpperCase()}`,
                    [entity]: [res],
                    paths: [path]
                })
            }}
        >
            {
                entityConfig.attributes.map((attribute,attributei) => 
                    <Form.Field 
                        key={attributei} 
                        w={3}
                        attribute={attribute._id}
                        immediate={attribute.type==='color'}
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