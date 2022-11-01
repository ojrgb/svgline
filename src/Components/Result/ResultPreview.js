import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import { entitiesStore } from 'Context/entitiesStore'


export default function ResultPreview(props) {
    const {entitiesState, entitiesDispatch, getSingle} = React.useContext(entitiesStore)
    const svgParams = getSingle('parameters',[0])
    const layers = entitiesState.layers
    console.log(layers)
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
                            height: '100%'
                        }}>
                            <rect x="0" width="100" height="100" 
                            fill={layer.backgroundColor || 'rgba(0,0,0,0)'}
                            style={{
                              opacity: layer.opacity ? layer.opacity/100 : 1  
                            }}/>
                        </svg>  
                    )
                }
            
            </svg>
       
    )
}