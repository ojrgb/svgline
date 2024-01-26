import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import ItemEditor from './Item/ItemEditor'
import ResultEditor from './Result/ResultEditor'
import EntityConsole from './EntityConsole'
import { flowStore } from 'Context/flowStore'
import Configuration from 'Model/Configuration'
import { contextStore } from 'Context/contextStore'
import Element from 'Model/Element'
import Layer from 'Model/Layer'
import EntityList from 'Model/EntityList'

const rowHeights = [2,3,5]


const Classes = {
    Root: styled.div`
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        height: 100%;
        align-content: baseline;
        position: relative;
    `,
    UIComponents: styled.div.attrs({className: 'ui-components'})`
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        flex-grow: 1;
    `
}

export default function ContextWorkspace(props: React.HTMLAttributes<HTMLDivElement> & React.PropsWithChildren<{}>) {
    const {flow, setFlow} = React.useContext(flowStore)
    const {contextState, contextDispatch} = React.useContext(contextStore)
    flow.setFlow = setFlow
    return (
        <Classes.Root id="context-workspace">
            {
                flow!==undefined && (
                <React.Fragment>
                    <React.Fragment>
                        <EntityConsole 
                            list={flow.configurations}
                            w={2.5} 
                            h={rowHeights[0]}
                            
                        />
                        <EntityConsole 
                            list={flow.datasets}
                            w={2.5} 
                            h={rowHeights[0]}
                        />
                        <EntityConsole 
                            list={flow.calculations}
                            w={2.5} 
                            h={rowHeights[0]}  
                        />
                        <EntityConsole 
                            list={flow.components}
                            w={2.5} 
                            h={rowHeights[0]}
                        />
                    </React.Fragment>
                    <React.Fragment>
                        <ItemEditor w={10} h={rowHeights[1]}/>
                    </React.Fragment>
                    <React.Fragment>
                        <ResultEditor w={8} h={rowHeights[2]}/>
                        <Classes.UIComponents>
                        <EntityConsole 
                            list={flow.layers}
                            w={10} 
                            h={rowHeights[2]}
                        />
                        <EntityConsole 
                            list={
                                (
                                    
                                    !(contextState.selected[0] instanceof Layer)
                                ) ? (
                                    undefined
                                ) : (
                                    (contextState.selected[0] as Layer).elements
                                )
                            }
                            type={Element}
                            w={10} 
                            h={rowHeights[2]}  
                            missingMessage="Select a layer to edit its elements"
                        />
                        </Classes.UIComponents>
                        
                    </React.Fragment>
                </React.Fragment>)
            }
        </Classes.Root>
    )
}