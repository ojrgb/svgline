import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import { entitiesStore } from 'Context/entitiesStore'
import Renderer from 'Render/Renderer'



export default function ResultPreview(props) {
    const {entitiesState, entitiesDispatch, getSingle} = React.useContext(entitiesStore)
    const svgParams = getSingle('parameters',[0])
    const renderedPackage = Renderer.renderPackage(entitiesState)
    const layers = renderedPackage.layers
    

    const createLayers = (layers) => {
        return layers.map(layer => createLayer(layer))
        
    }

    const createLayer = (layer) => {
       return (
            <svg id={`layer-${layer._id}`} className="preview-layer" key={layer._id} style={{
                backgroundColor: layer.backgroundColor,
                width: '100%',
                height: '100%',
                opacity: layer.opacity ? layer.opacity/100 : 1  
            }}>
                <rect id={`layer-${layer._id}-bg`} x="0" width="100" height="100" 
                fill={layer.backgroundColor || 'rgba(0,0,0,0)'}
                style={{
                
                }}/>
                {
                    layer.elements?.filter(v => !!v.type).map((element,elementi) => {
                        return createElement({element,elementi, layer})
                    })
                }
            </svg>  
       )
    }

    const createElement = (props: {
        element: any,
        elementi: number,
        layer: any
    
    }) => {
        const {element, elementi, layer} = props
        // Render the element here. This just replaces all the x1={value: 4, type: 'calculation'} with x1=4
       const renderedElement = Renderer.renderElement(element)
       // Now let's remove all the empty attributes so we don't pass them along
       const renderedElementWithNoEmptyAttributes: any = Object.keys(renderedElement).reduce((acc,curr) => {
              if(renderedElement[curr] !== undefined) {
                acc[curr] = renderedElement[curr]
              }
              return acc
         },{})
         const e = renderedElementWithNoEmptyAttributes // Just shorten the name.
        return <e.type key={elementi} id={`layer-${layer._id}-element-${e._id}`} {...e}/>
        return <div/>
    }
    
    return (
 
            <svg key={JSON.stringify(layers)}
                style={{
                    height: '100%',
                    width: {'1-1': '100%'}[svgParams.ratio]
                }}
                viewBox={`0 0 ${{'1-1': '100', '4-3': 100*4/3}[svgParams.ratio]} ${{'1-1': '100', '4-3': '100'}[svgParams.ratio]}`}
            >
             {createLayers(layers)}   
            
            </svg>
       
    )
}