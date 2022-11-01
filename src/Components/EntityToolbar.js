import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import Toolbar from './Toolbar'
import { entitiesStore } from 'Context/entitiesStore'
import _ from 'lodash'
import { generateDeep, generateNewEntity, getNested } from 'utils'
import ents from 'ents'

export default function EntityToolbar(props) {
    const {
        entity,
        path
    } = props;
    const {entitiesState, entitiesDispatch, getSingle} = React.useContext(entitiesStore)
    const entityConfig = ents[entity]
    const target = props.target || [entity]
    // The entity can either be loaded into an entities list
    // E.g. configurations -> state.configurations
    // Or into another target
    // E.g. elements -> layers.[index].elements
    const targetEntity = target[0]
    if(!!target && !Array.isArray(target)) {
        
    }

    const onAdd = () => {
        if(target.length===1) {
            
            entitiesDispatch({type:`ADD_${targetEntity.toUpperCase()}`})
        }
        else {
            
            const targetObject = getSingle(targetEntity,path),
                nestedLocation = [...target].splice(1),
                nestedObject = getNested(targetObject,nestedLocation),
                nestedObjectLength = nestedObject.length,
                nestedLocationWithIndex = nestedLocation.concat(nestedObjectLength),
                newEntity = generateNewEntity(entity,{
                    _id: `New ${entityConfig._id} ${nestedObjectLength+1}`
                }),
                targetForMerge = generateDeep(
                    nestedLocationWithIndex.concat(newEntity))
                
            

            entitiesDispatch({
                type: `UPDATE_${targetEntity.toUpperCase()}`,
                [targetEntity]: _.merge(
                        {},
                        targetForMerge
                    ),
                paths: [path]
            })   
        }
    }


    
    const toolbarButtons = {
        add: <Toolbar.Button 
            icon="plus" 
            onClick={onAdd}
            />,
        remove: <Toolbar.Button
            icon="remove"
            onClick={() => {entitiesDispatch({type:`REMOVE_${entity.toUpperCase()}`})}}
            />
    }

    const ToolbarButtons = Object.keys(props).map((action,actioni) => {
        return toolbarButtons[action]
    }).filter(Boolean).map((element,elementi) => {return React.cloneElement(element,{key:elementi})})

    return (
        <Toolbar>
            {ToolbarButtons}
        </Toolbar>
    )
}