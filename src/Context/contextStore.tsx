import React from 'react'
import { trace } from 'utils'
import { generateDeep, generateDeepPath, generateNewEntity, getDeep, getDeepProp, getNested, normalizePaths, normalizeTarget, setDeep } from 'utils'
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

const selectionTypes = {
  configurations: 'selectedItems',
  calculations: 'selectedItems',
  datasets: 'selectedItems',
  components: 'selectedItems',
  layers: 'selectedItems',
  elements: 'selectedItems',
  packages: 'selectedPackages',
}

const contextStore = React.createContext(undefined)
const {Provider} = contextStore

const reducer = (_state: any, action: any) => {
    trace(`Executing reducer actions: ${action.type}`)
    const state = Object.assign({},_state)
    

    if(action.type in ['OPEN_MODAL','CLOSE_MODAL','TOGGLE_MODAL']) {
      if(state.modals[action._id] === undefined) {
       
        state.modals[action._id] = false
      }
    }

    const actions = {
      'SET_SELECTED': () => {
        console.info(`Setting selected`,action)
        if(selectionTypes[action.entity] === undefined) {
          console.error(`Invalid entity type ${action.entity}`)
        }
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
      },
      'LOAD_OBJECTS': () => {
        return Object.assign({},state,{[action.entity]:action.data})
        
      },
    }
    const res = actions[action.type]()
    trace(res)
    return res
    
}

const ContextStateProvider = ( { children } ) => {

      const getList = (target, paths) => {
            
        return getDeepProp(state,target,paths) 
    }

    const getSingle = (target, paths) => {
        
        const res = getDeepProp(state,target,paths)
        
        return res
    }

    const [state, dispatch] = React.useReducer(reducer, initialState);
    return <Provider value={{contextState: state, contextDispatch: dispatch, getSingle, getList }}>{children}</Provider>;
  };
  
  export {contextStore, ContextStateProvider, selectionTypes}