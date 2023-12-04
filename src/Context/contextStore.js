import React from 'react'
import { trace } from 'utils.js'
import _ from 'lodash'

const initialState = {
  selectedItems: {
    entity: undefined,
    paths: undefined,
    target: undefined
  },
  modals: {

  }
}

const contextStore = React.createContext(initialState)
const {Provider} = contextStore

const reducer = (_state,action,override) => {
    trace(`Executing reducer actions: ${action.type}`)
    const state = Object.assign({},_state)
    const selectionTypes = {
      configurations: 'selectedItems',
      calculations: 'selectedItems',
      datasets: 'selectedItems',
      components: 'selectedItems',
      layers: 'selectedItems',
      elements: 'selectedItems'
    }

    if(action.type in ['OPEN_MODAL','CLOSE_MODAL','TOGGLE_MODAL']) {
      if(state.modals[action._id] === undefined) {
        console.log('instantiating modal ' + action._id + ' with default state of false')
        state.modals[action._id] = false
      }
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
      },
      'OPEN_MODAL': () => {
        return Object.assign({},state,{
          modals: {
            [action._id]: true
          }
        })
      },
      'CLOSE_MODAL': () => {
        return Object.assign({},state,{
          modals: {
            [action._id]: false
          }
        })
      },
      'TOGGLE_MODAL': () => {
        return Object.assign({},state,{
          modals: {
            [action._id]: state.modals[action._id] ? false : true
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