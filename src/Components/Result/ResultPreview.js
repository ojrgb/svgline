import React from 'react'
import theme from 'theme.js'
import styled from 'styled-components'
import { entitiesStore } from 'Context/entitiesStore.js'


export default function ResultPreview(props) {
    const {entitiesState, entitiesDispatch, getSingle} = React.useContext(entitiesStore)
    const svgParams = getSingle('parameters',[0])
    const layers = entitiesState.layers
    
    return (
 
            <svg key={JSON.stringify(layers)}
                style={{
                    height: '100%',
                    width: {'1-1': '100%'}[svgParams.ratio]
                }}
                viewBox={`0 0 ${{'1-1': '100', '4-3': 100*4/3}[svgParams.ratio]} ${{'1-1': '100', '4-3': '100'}[svgParams.ratio]}`}
            >
                {
                    layers.map((layer, layeri) => 
                        <svg key={layeri} style={{
                            backgroundColor: layer.backgroundColor,
                            width: '100%',
                            height: '100%',
                            opacity: layer.opacity ? layer.opacity/100 : 1  
                        }}>
                            <rect x="0" width="100" height="100" 
                            fill={layer.backgroundColor || 'rgba(0,0,0,0)'}
                            style={{
                              
                            }}/>
                            {
                                layer.elements?.filter(v => !!v.type).map((element,elementi) => {
                                    return (
                                        <element.type {...element}/>
                                    )
                                })
                            }
                        </svg>  
                    )
                }
            
            </svg>
       
    )
}