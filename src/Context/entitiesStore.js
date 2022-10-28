import React from 'react'
import entities from 'ents'
import { trace } from 'utils'
import _ from 'lodash'

const initialState = Object.keys(entities).map((v,i) => {
    return {[v]:[]}
}).reduce((a,b) => {return Object.assign({},a,b)})

const entitiesStore = React.createContext(initialState)
const {Provider} = entitiesStore

const reducer = (state,action,override) => {
    trace(`Executing reducer actions: ${action.type}`)
    
    const actions = Object.keys(entities).map((entityi) => {
        const entity=entities[entityi]
        return {
            [`ADD_${entityi.toUpperCase()}`]: () => {
                console.log(state)
                console.log(entityi)
                return _.merge({},state,{
                    [entityi]: [...state[entityi]].concat(
                        [Object.assign({},{_id:`New ${entity._id}`},action[entity._id])]
                    )
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
    const [state, dispatch] = React.useReducer((state, action) => {
      const newState = reducer(state, action)
      trace('Setting state:')
      trace(newState)
      return newState
    }, initialState);
    return <Provider value={{entitiesState:Object.assign(initialState,state), entitiesDispatch: dispatch }}>{children}</Provider>;
  };
  
  export {entitiesStore, EntitiesStateProvider}