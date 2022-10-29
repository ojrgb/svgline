import React from 'react'
import { trace } from 'utils'
import _ from 'lodash'

const initialState = {
  selectedItems: undefined
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
      layers: 'selectedUIs'
    }

    const actions = {
      'SET_SELECTED': () => {
        return _.merge({},state,{
          [selectionTypes[action.entity]]: {
            entity: action.entity,
            paths: action.paths
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