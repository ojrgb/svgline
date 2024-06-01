import React from 'react'
import Entity from 'Model/Entity'
import Form from './Form'
import Attribute from 'Model/Attribute'
import Text from './Text'
import styled from 'styled-components'
import theme from 'theme'
import {relaxColor} from 'utils'
import { AttributeType } from 'Model/Interface/AttributeType'



const lightenDelta = 0.2,
  lightenDeltaHover = 0.3,
  lightenDeltaActive = 0.8

const Classes = {
  AttributeTypeButton: styled.div.attrs({className: 'type-button'})<{active: boolean}>`
    color: ${relaxColor(theme.colors.primary,lightenDelta)};
    cursor: pointer;
    :hover {
      color: ${relaxColor(theme.colors.primary,lightenDeltaHover)};
    }
    ${props => props.active && `
      color: ${relaxColor(theme.colors.primary,lightenDeltaActive)};
    `}
    }
  `,
}
export default function EntityForm(props: {
    entity: Entity
}) {
    // Destructure the props
    const entity: Entity = props.entity
    // Get the entity type
    const typeofEntity = entity.constructor as typeof Entity
    // Get the form fields, filtering out any unmet conditions
    const formFields = typeofEntity.formAttributes.map((attributeId: string) => {
      // If the form attributes specify an attribute that doesn't exist, log an error
        if(entity[attributeId]===undefined) {
            console.error(`Entity ${entity._id} does not have attribute ${attributeId}`)
        }

        // Get the attribute
        const attribute: Attribute = entity[attributeId]
        // If the attribute has conditions, check them
        if(attribute.conditions && attribute.conditions.length>0) {
            // If the conditions specified was not an array but a single function, array-ify it
            const conditions = Array.isArray(attribute.conditions) ? attribute.conditions : [attribute.conditions]
            // Find the first condition that returns false
            const condition = conditions?.find?.((condition: (arg: any) => boolean) => {
                const res = condition(entity.get())!==true
                return res
            })
            // If such a condition was found, immediately return undefined, instead of returning the input
            if(condition!==undefined) {
                return undefined
            }
        }
        
        // Clone the input, adding the value and the key
        const input = React.cloneElement(attribute.getInput(),{value: attribute.get() || "", key: attributeId})
        const attributeTypes = Array.isArray(attribute.type) ? attribute.type : [attribute.type]
        
        return (
          <Form.Field w={2} key={attributeId}>
            <Form.CaptionContainer>
              <Form.Caption>
                {attribute.name}
              </Form.Caption>
              <Form.AttributeTypeSelect>
                {
                  attributeTypes.map((type: AttributeType, typei: number) => {
                    return (
                      <Form.AttributeTypeSingle>
                        {typei>0 && " /"}
                        <Classes.AttributeTypeButton active = {attribute.currentType === type} onClick={
                          () => {
                            attribute.setCurrentType(type)
                          }
                        
                        }>
                          {type}
                        </Classes.AttributeTypeButton>
                      </Form.AttributeTypeSingle>
                    )
                  })
                }
              </Form.AttributeTypeSelect>
            </Form.CaptionContainer>
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