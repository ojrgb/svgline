import React from 'react'
import { trace } from 'utils'
import _ from 'lodash'
import Entity from 'Model/Entity'
import { flowStore } from './flowStore'
import dataService from 'Components/Data/dataService'
import Utilities from 'Model/Utilities'
import Flow from 'Model/Flow'

const initialState = {
  loadTarget: []
 
}


const loadStore = React.createContext(undefined)
const {Provider} = loadStore

const reducer = (_state: any, action: {
  type: 'SET_LOAD_TARGET',
  entity?: any,
  entities?: any[],
  collection?: string,
}) => {
    trace(`Executing reducer actions: ${action.type}`)
    const state = Object.assign({},_state)

    const actions = {
      'SET_LOAD_TARGET': () => {
        return Object.assign({},state,{
          loadTarget: (action.entity || action.entities) ? ([action.entity] || action.entities) : []
        })
      },

      
    }
    const res = actions[action.type]()
    trace(res)
    return res
    
}

const LoadStateProvider = ( { children } ) => {
    const {flow: f, setFlow} = React.useContext(flowStore)
    

    const [state, dispatch] = React.useReducer(reducer, initialState) as [typeof initialState, React.Dispatch<any>];
    const loadFlow = async () => {
        if(state.loadTarget?.[0]?._id === undefined) {
            console.error('No selected flow')
            return
        }
        const _flow = await dataService.get({collection: 'flows',_id:state.loadTarget[0]._id})
        // setFlow(flow)
        console.log(_flow)
        const flow = Utilities.fromJson({json: _flow}) as Flow
        flow.setFlow = setFlow
        setFlow(flow)
    }
    const setLoadTarget = (entity: Entity) => {
        dispatch({
            type: 'SET_LOAD_TARGET',
            entity
        })
    }
    return <Provider value={{loadState: state, loadDispatch: dispatch, loadFlow, setLoadTarget }}>{children}</Provider>;
  };
  
  export {loadStore, LoadStateProvider}