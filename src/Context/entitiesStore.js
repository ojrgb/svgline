import React from 'react'
import entities from 'ents'
import { generateNewEntity, getDeep, getNested, setDeep, trace } from 'utils'
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

const reducer = (state,action,override) => {
    trace(`Executing reducer actions: ${action.type}`)
    
    const actions = Object.keys(entities).map((entityi) => {
        const entity=entities[entityi]
        return {
            [`ADD_${entityi.toUpperCase()}`]: () => {
                
                return _.merge({},state,{
                    [entityi]: [...state[entityi]].concat(
                        [
                            generateNewEntity(entityi,{_id:`New ${entity._id} ${state[entityi].length+1}`}),
                        ]
                    )
                })
                
            },
            [`SET_${entityi.toUpperCase()}`]: () => {
                if(!!!action.paths?.[0]?.[0] || !!!action[entityi]?.[0]) {
                    
                }
                // doesn't support multi update yet. Can't be bothered rn.
                return _.merge({},state,{
                  [entityi] : setDeep(state[entityi],action.paths[0],action[entityi][0],true)  
                })
                
            },
            [`UPDATE_${entityi.toUpperCase()}`]: () => {
                if(!!!action.paths?.[0]?.[0] || !!!action[entityi]?.[0]) {
                    
                }
                return _.merge({},state,{
                    [entityi]: setDeep(state[entityi],action.paths[0],action[entityi])  
                })
            },
            [`REMOVE_${entityi.toUpperCase()}`]: () => {
                return _.merge(state,{
                    [entityi]: [...state[entityi]].filter(((v,i) => {return i!==action.index}))
                })
            },
            
        }
    }).reduce((a,b) => {return Object.assign({},a,b)});

    return actions[action.type]();
    
}

const EntitiesStateProvider = ( { children } ) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    
    const getList = (target, paths, curValue) => {
        console.log('Getting list with params: ',target,paths,curValue)
        const _target = [target].flat() // this ensures that both [configurations] and configurations get turned into [configurations]
        const __paths = Array.isArray(paths) ? paths : [paths]
        const _paths = _.isEqual(__paths,__paths.flat()) ? [__paths] : __paths // Jeez, this is becoming more shorthanded by the minute.
        // What this basically does is convert all paths to arrays of arrays to conform to the target structure.
        // so basically configurations, [1] get turned into [configurations], [[1]].
        // and layers.elements, [[1],[0]] get turned into [layers,elements], [[1],[0]]
        // getList(configurations)
        if(!!!target) {
            console.error(`Target is blank!`)
            return undefined
        }
        const curList = (curValue || state)[_target[0]]
        if(!!!paths || paths.length===0) {
            return curList
        }
        else {
            if(!!!_target[1]) {
                console.error(`Path is longer than the target!`)
                return undefined
            }
            const curSingle = getDeep(curList,_paths[0])
            return getList([..._target].splice(1),[..._paths].splice(1),curSingle)
        }   
    }

    const getSingle = (target, paths) => {
        if(!!!target) {
            console.error(`Target is undefined`)
            return undefined
        }
        if(!!!paths) {
            console.error(`paths is undefined`, target)
            return undefined
        }
        const list = getList(target, paths ? [...paths].slice(0,paths.length-1) : undefined)
        return list[paths[paths.length-1]]
    }
    
    return <Provider value={{
        entitiesState:state, 
        entitiesDispatch: dispatch, 
        getSingle,
        getList 
    }}>{children}</Provider>;
  };
  
  export {entitiesStore, EntitiesStateProvider}