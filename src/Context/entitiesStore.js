import React from 'react'
import entities from 'ents.js'
import { generateDeep, generateDeepPath, generateNewEntity, getDeep, getDeepProp, getNested, normalizePaths, normalizeTarget, setDeep, trace } from 'utils.js'
import _ from 'lodash'

const initialResultParameters = {
    _id: 'New graphic',
    name: 'New graphic',
    ratio: '1-1'
}



const initialState = Object.assign({},Object.keys(entities).map((v,i) => {
    return {[v]:[]}
}).reduce((a,b) => {return Object.assign({},a,b)}),{parameters: [initialResultParameters]})

const entitiesStore = React.createContext(initialState)
const {Provider} = entitiesStore



const generateMergeTarget = (target, paths, object) => {
    return generateDeep(generateDeepPath(target,paths).concat(object))
}

const funcs = {
    set: (state,action) => {
        const {entity, target, paths, object} = action
        
        const mergeTarget = generateMergeTarget(
            target,
            paths,
            object
            )
        
        const res = _.merge({},state,mergeTarget)
        return res
    },
    add: (state,action) => {
        const {entity, target, paths} = action
        const _paths = normalizePaths(paths)
        
        const curList = getDeepProp(state,target,paths)
        
        const res = _.merge(
            {},
            state,
            generateMergeTarget(
                target,
                paths,
                {[curList.length]: generateNewEntity(
                    entity,
                    {
                        _id: `New ${entities[entity]._id} ${curList.length+1}`
                    }
                )}
            ))
        return res
    },
} 

const reducer = (state,action,override) => {
    trace(`Executing reducer actions: ${action.type}`)
    
    const actions = {
        'SET_OBJECT': () => {
            return funcs.set(state,action)
            
        },
        'ADD_OBJECT': () => {
            return funcs.add(state,action)
            
        }
    }
    const res = actions[action.type]()
    
    return res;
    
}

const EntitiesStateProvider = ( { children } ) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    
    const getList = (target, paths) => {
        
        return getDeepProp(state,target,paths) 
    }

    const getSingle = (target, paths) => {
        
        const res = getDeepProp(state,target,paths)
        
        return res
    }
    
    return <Provider value={{
        entitiesState:state, 
        entitiesDispatch: dispatch, 
        getSingle,
        getList 
    }}>{children}</Provider>;
  };
  
  export {entitiesStore, EntitiesStateProvider}