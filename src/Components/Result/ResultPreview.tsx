import React, { ReactElement } from 'react'
import theme from 'theme'
import styled from 'styled-components'

import Renderer from 'Render/Renderer'
import { flowStore } from 'Context/flowStore'
import Element from 'Model/Element'
import Layer from 'Model/Layer'

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
    function renderLayer(layer: any) {
        const renderedElements: ReactElement[] = []
        for(let elementId in layer.elements) {
            const element = layer.elements[elementId]
            
            renderedElements.push(renderElement(element))
        }
        const renderedLayer = <g key={layer._id}>
            <rect x={0} y={0} width={100} height={100} fill={layer.fill}/>
            {renderedElements}
            </g>

        return renderedLayer
    }

    function renderLayers() {
        
        const calculatedTree = flow.calculate()
        console.log(calculatedTree)
        let res: ReactElement[] = []
        
        const {layers} = calculatedTree
        for (let layerId in layers) {
            const layer = layers[layerId]
            if(layer!==undefined) {
                res.push(renderLayer(layer))
            }
        }
        return res
    }
    
    const renderedLayers = renderLayers()
    
    
    return (
        <Classes.SVGRoot viewBox='0 0 100 100'>
            {renderedLayers}
        </Classes.SVGRoot>
    )

}