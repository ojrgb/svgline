import React, { useEffect } from 'react'
import entities from 'ents'
import { generateDeep, generateDeepPath, generateNewEntity, getDeep, getDeepProp, getNested, normalizePaths, normalizeTarget, setDeep, trace } from 'utils'
import _ from 'lodash'
import Flow from 'Model/Flow'

let templateFlow = new Flow({
    _id: 'New flow'
})

const flowStore = React.createContext({flow: templateFlow, setFlow: (flow: Flow) => {}})

const FlowProvider = ( { children } ) => {
    
    const [flow, _setFlow] = React.useState(templateFlow)
    const [refresh, setRefresh] = React.useState(new Date().getTime())
    console.log(refresh)
    const setFlow = (target: Flow) => {
        console.log('Setting flow', target)
        _setFlow(target)
        setRefresh(new Date().getTime())
    }
    useEffect(() => {
        let newFlow = new Flow({
            _id: 'New flow',
            setFlow: setFlow
        }
        )
        setFlow(newFlow)
    },[])

    const {Provider} = flowStore

    

    return <Provider data-id="flow-state-provider" value={{flow, setFlow}}>{children}</Provider>;
  };
  
  export {flowStore, FlowProvider}