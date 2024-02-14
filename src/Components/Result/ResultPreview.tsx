import React, { ReactElement } from 'react'
import theme from 'theme'
import styled from 'styled-components'

import Renderer from 'Render/Renderer'
import { flowStore } from 'Context/flowStore'
import Element from 'Model/Element'
import Layer from 'Model/Layer'
import _ from 'lodash'
import { v4 } from 'uuid'
import Flow from 'Model/Flow'
import Entity from 'Model/Entity'

const Classes = {
    SVGRoot: styled.svg.attrs({className: 'svg-root',id: 'resultPreview'})`
        height: 100%;
        aspect-ratio: 1 / 1;
        margin: 0 auto;
    `,
}

export default function ResultPreview(props) {
 
    const {flow} = React.useContext(flowStore)

    function renderElement(element: any) {
        if(element===undefined) {
            return undefined
        }
        if(element.objectType==='Loop') {
            const elementsObject = _.omit(element,['objectType'])
            const res = Object.keys(elementsObject).map((key) => {
                const elements = elementsObject[key]
                
                const renderedElements = renderElements(elements)
                const groupedRes = <g key={element._id}>{renderedElements}</g>
                return groupedRes
            })
            
            return res

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
                return React.cloneElement(svgelement, Object.assign({},element, {key: v4()}))
           }

                return undefined
          
    }

    function renderElements(elements: any[]) {
        if(!elements) {
            return
        }
        const renderedElements: any[] = []
        for (let element of elements) {
            const renderedElement = renderElement(element)
            if(renderedElement!==undefined) {
                renderedElements.push(renderedElement)
            }
        }
        return renderedElements
    }

    // I feel like this guy is gonna need fixing at some point
    function renderLayer(layer: any) {
        if(layer.objectType==='Loop') {
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
    const renderedLayers = renderLayers(flow.calculate().Layers)
    // Entity.fromJson<Flow>({json: flow.get(),EntityType: Flow})
    
    return (
        <Classes.SVGRoot viewBox='0 0 100 100'>
            {renderedLayers}
        </Classes.SVGRoot>
    )

}