import React from 'react'
import theme from 'theme'
import styled from 'styled-components'

import Renderer from 'Render/Renderer'
import { flowStore } from 'Context/flowStore'
import Element from 'Model/Element'
import Layer from 'Model/Layer'



export default function ResultPreview(props) {
 
    const {flow} = React.useContext(flowStore)
    console.log(flow.calculate())
    
    function renderElement(element: Element) {
        const svgelements = {
            'line': <line/>,
            'circle': <circle/>,
            'rect': <rect/>,
            'text': <text/>,
            'g': <g/>,
        }
            const svgelement = svgelements[element.get("type")]
            console.log('svg element', svgelement)
            if (svgelement)
            {
                return React.cloneElement(svgelement, element.getAttributes())
           }

                return undefined
          
    }
    function renderLayer(layer: any) {
        return layer.elements?.map?.((element: any) => {
            return renderElement(element)
        })
    }

    function renderLayers() {
        console.log(flow.calculate())
        return flow.calculate().layers?.map?.((layer: any) => {
            
            return renderLayer(layer)
        })
    }

    console.log(renderLayers())
    return (<div></div>)

}