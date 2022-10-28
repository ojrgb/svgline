import React from 'react'
import { trace } from 'utils'
import _ from 'lodash'

const initialState = {}

const contextStore = React.createContext(initialState)
const {Provider} = contextStore

const reducer = (state,action,override) => {
    trace(`Executing reducer actions: ${action.type}`)
    
    const actions = {}

    actions[action.type]()
    
}

const ContextStateProvider = ( { children } ) => {
    const [state, dispatch] = React.useReducer((state, action) => {
      const newState = reducer(state, action)
      trace('Setting state:')
      trace(newState)
      return newState
    }, initialState);
    return <Provider value={{state:Object.assign(initialState,state), dispatch }}>{children}</Provider>;
  };
  
  export {contextStore, ContextStateProvider}