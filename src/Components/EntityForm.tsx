import React from 'react'
import Entity from 'Model/Entity'
import Form from './Form'
import Attribute from 'Model/Attribute'
import Text from './Text'


export default function EntityForm(props: {
    entity: Entity
}) {
    const entity: Entity = props.entity
    const typeofEntity = entity.constructor as typeof Entity
    const formFields = typeofEntity.formAttributes.map((attributeId: string) => {
        if(entity[attributeId]===undefined) {
            console.error(`Entity ${entity._id} does not have attribute ${attributeId}`)
        }
        let visible = true
        const attribute: Attribute = entity[attributeId]
        if(attribute.conditions && attribute.conditions.length>0) {
            const conditions = attribute.conditions as ((arg: any) => boolean)[]
            const condition = conditions?.find?.((condition: (arg: any) => boolean) => {
                return condition(entity)!==true
            })
            if(condition!==undefined) {
                return undefined
            }
        }
        
        const input = React.cloneElement(attribute.getInput(),{value: attribute.get() || ""})
        return (
          <Form.Field w={2} key={attributeId}>
            <Form.Caption>
              {attribute.name}
            </Form.Caption>
            <Form.Input>
              {input}
            </Form.Input>
          </Form.Field>
        
        )
      }).filter(Boolean)
    return (
      <Form>
        {
          formFields
        }
      </Form>
    )
}