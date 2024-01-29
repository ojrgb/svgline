import React, { ReactElement } from 'react'
import theme from 'theme'
import styled from 'styled-components'

import Renderer from 'Render/Renderer'
import { flowStore } from 'Context/flowStore'
import Element from 'Model/Element'
import Layer from 'Model/Layer'
import _ from 'lodash'

const Classes = {
    SVGRoot: styled.svg.attrs({className: 'svg-root'})`
        height: 100%;
        aspect-ratio: 1 / 1;
        margin: 0 auto;
    `,
}

export default function ResultPreview(props) {
 
    const {flow} = React.useContext(flowStore)
    
    function renderElement(element: any) {
        if(element.objectType==='loop') {
            const elements = []
            for(let [elementId, elementValue] of Object.entries(_.omit(element,['objectType']))) {
                elements.push(
                        elementValue
                )
                
                
            }   
            return renderElement(elements)
        }        
        const svgelements = {
            'line': <line/>,
            'circle': <circle/>,
            'rect': <rect/>,
            'text': <text/>,
            'g': <g/>,
        }
            const svgelement = svgelements[element.type]
            
            if (svgelement)
            {
                return React.cloneElement(svgelement, Object.assign({},element, {key: element._id}))
           }

                return undefined
          
    }

    function renderElements(elements: any[]) {
        const renderedElements: ReactElement[] = []
        for(let elementId in elements) {
            const element = elements[elementId]
            renderedElements.push(renderElement(element))
        }
        return renderedElements
    }

    // I feel like this guy is gonna need fixing at some point
    function renderLayer(layer: any) {
        if(layer.objectType==='loop') {
            const e = Object.entries(_.omit(layer,['objectType']))
            if(e.length===0) {
                return undefined
            }
            const [entries]  = e
            const [layerId, layerValues] = entries
            const renderedLayers = layerValues?.map((layerValue, index) => {
                return renderLayer(layerValue)
            })

            return renderedLayers
            return undefined
        }        
        console.log('elements for layer',layer._id, layer.elements)
        const renderedElements = renderElements(layer.elements)
        const renderedLayer = <g key={layer._id}>
            <rect x={0} y={0} width={100} height={100} fill={layer.fill}/>
            {renderedElements}
            </g>

        return renderedLayer
    }

    function renderLayers(layers: any[]) {
        let res: ReactElement[] = []
        for (let layerId in layers) {
            const layer = layers[layerId]
            if(layer!==undefined) {
                res.push(renderLayer(layer))
            }
        }
        return res
    }
    console.log('layers:',flow.calculate().layers)
    const renderedLayers = renderLayers(flow.calculate().layers)
    
    
    return (
        <Classes.SVGRoot viewBox='0 0 100 100'>
            {renderedLayers}
        </Classes.SVGRoot>
    )

}