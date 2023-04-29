import React from 'react'
import { trace } from 'utils.js'
import _ from 'lodash'

const initialState = {
  selectedItems: {
    entity: undefined,
    paths: undefined,
    target: undefined
  }
}

const contextStore = React.createContext(initialState)
const {Provider} = contextStore

const reducer = (state,action,override) => {
    trace(`Executing reducer actions: ${action.type}`)
    
    const selectionTypes = {
      configurations: 'selectedItems',
      calculations: 'selectedItems',
      datasets: 'selectedItems',
      components: 'selectedItems',
      layers: 'selectedItems',
      elements: 'selectedItems'
    }

    const actions = {
      'SET_SELECTED': () => {
        
        return Object.assign({},state,{
          [selectionTypes[action.entity]]: {
            entity: action.entity,
            paths: action.paths,
            target: action.target || action.entity
          }
        })
      }
    }

    return actions[action.type]()
    
}

const ContextStateProvider = ( { children } ) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return <Provider value={{contextState: state, contextDispatch: dispatch }}>{children}</Provider>;
  };
  
  export {contextStore, ContextStateProvider}