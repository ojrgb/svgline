import React from 'react'
import entities from 'ents'
import { generateDeep, generateDeepPath, generateNewEntity, getDeep, getDeepProp, getNested, normalizePaths, normalizeTarget, setDeep, trace } from 'utils'
import _ from 'lodash'

const initialResultParameters = {
    _id: 'New graphic',
    name: 'New graphic',
    ratio: '1-1'
}



const initialState = Object.assign({},Object.keys(entities).map((v,i) => {
    return {[v]:[]}
}).reduce((a,b) => {return Object.assign({},a,b)}),{parameters: [initialResultParameters]})

const entitiesStore = React.createContext(undefined)
const {Provider} = entitiesStore



const generateMergeTarget = (target, paths, object) => {
    return generateDeep(generateDeepPath(target,paths).concat(object))
}

const funcs = {
    set: (state,action) => {
        
        const {entity, target, paths, object} = action
        if(target===undefined) {
            return _.merge({},state,object)
        }
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
    load: (state,action) => {
        const {entity, data} = action
        const res = _.merge({},state,{[entity]:data})
        return res
    },
    reset: (state,action) => {
        return initialState
    },
    replace: (state,action) => {
        return _.merge({},state,action.data);
    },
    moveUp: (state,action) => {
        const {entity, target, paths} = action
        const _paths = normalizePaths(paths)
        const curList = getDeepProp(state,target,paths)
        const index = _paths.pop()
        const newIndex = index - 1
        const res = _.merge(
            {},
            state,
            generateMergeTarget(
                target,
                _paths,
                {[newIndex]: curList[index]}
            ))
        return res
    },
    moveDown: (state,action) => {
        const {entity, target, paths} = action
        const _paths = normalizePaths(paths)
        const curList = getDeepProp(state,target,paths)
        const index = _paths.pop()
        const newIndex = index + 1
        const res = _.merge(
            {},
            state,
            generateMergeTarget(
                target,
                _paths,
                {[newIndex]: curList[index]}
            ))
        return res
    },
    remove: (state,action) => {
        const {entity, target, paths} = action
        const _paths = normalizePaths(paths)
        const curList = getDeepProp(state,target,paths)
        const index = _paths.pop()
        const res = _.merge(
            {},
            state,
            generateMergeTarget(
                target,
                _paths,
                {[index]: undefined}
            ))
        return res
    },
    duplicate: (state,action) => {
        const {entity, target, paths} = action
        const _paths = normalizePaths(paths)
        const curList = getDeepProp(state,target,undefined)
        const curObject = getDeepProp(state,target,_paths)
        const newList = curList.concat([curObject])
        console.log(generateMergeTarget(
            target,
            [],
            newList
        ))
        const res = _.merge(
            {},
            state,
            generateMergeTarget(
                target,
                [],
                newList
            ))
        return res
    },
    addLoop: (state,action) => {
        const {entity, target, paths} = action
        const _paths = normalizePaths(paths)
        const curList = getDeepProp(state,target,paths)
        const index = _paths.pop()
        const res = _.merge(
            {},
            state,
            generateMergeTarget(
                target,
                _paths,
                {[index]: undefined}
            ))
        return res
    },
    addGroup: (state,action) => {
        const {entity, target, paths} = action
        const _paths = normalizePaths(paths)
        const curList = getDeepProp(state,target,paths)
        const index = _paths.pop()
        const res = _.merge(
            {},
            state,
            generateMergeTarget(
                target,
                _paths,
                {[index]: undefined}
            ))
        return res
    },
}



const reducer = (state: any, action: any) => {
    trace(`Executing reducer actions: ${action.type}`)
    
    const actions = {
        'SET_OBJECT': () => {
            return funcs.set(state,action)
            
        },
        'ADD_OBJECT': () => {
            return funcs.add(state,action)
            
        },
        'LOAD_OBJECTS': () => {
            return funcs.load(state,action)
            
        },
        'RESET': () => {
            return funcs.reset(state,action)
            
        },
        'REPLACE': () => {
            return funcs.replace(state,action)
            
        },
        'MOVE_UP': () => {
            return funcs.moveUp(state,action)
            
        },
        'MOVE_DOWN': () => {
            return funcs.moveDown(state,action)
            
        },
        'REMOVE': () => {
            return funcs.remove(state,action)
            
        },
        'DUPLICATE': () => {
            return funcs.duplicate(state,action)
            
        },
        'ADD_LOOP': () => {
            return funcs.addLoop(state,action)
            
        },
        'ADD_GROUP': () => {
            return funcs.addGroup(state,action)
            
        },

    }
    const res = actions[action.type]()
    
    return res;
    
}

const EntitiesStateProvider = ( { children } ) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)
   
    const getList = (target, paths) => {
        
        return getDeepProp(state,target,paths) 
    }

    const getSingle: (target: any, paths: any) => any[]  = (target, paths) => {
        
        const res = getDeepProp(state,target,paths)
        
        return res
    }
    
    return <Provider data-id="entities-state-provider" value={{
        entitiesState: state, 
        entitiesDispatch: dispatch, 
        getSingle: getSingle,
        getList: getList,
      
        
    }}>{children}</Provider>;
  };
  
  export {entitiesStore, EntitiesStateProvider}