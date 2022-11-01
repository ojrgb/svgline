import React from 'react'
import entities from 'ents'
import { generateNewEntity, getDeep, setDeep, trace } from 'utils'
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
                    console.log(`Must provide ${entityi} and paths in array format!`)
                }
                // doesn't support multi update yet. Can't be bothered rn.
                return _.merge({},state,{
                  [entityi] : setDeep(state[entityi],action.paths[0],action[entityi][0],true)  
                })
                
            },
            [`UPDATE_${entityi.toUpperCase()}`]: () => {
                if(!!!action.paths?.[0]?.[0] || !!!action[entityi]?.[0]) {
                    console.log(`Must provide ${entityi} and paths in array format!`)
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
    const getSingle = (entity, path) => {
        return getDeep(state[entity],path)
    }
    return <Provider value={{entitiesState:state, entitiesDispatch: dispatch, getSingle }}>{children}</Provider>;
  };
  
  export {entitiesStore, EntitiesStateProvider}