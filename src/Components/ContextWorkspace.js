import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import ConfigurationsEditor from './Configurations/ConfigurationsEditor'
import DatasetsEditor from './Datasets/DatasetsEditor'
import CalculationsEditor from './Calculations/CalculationsEditor'
import ComponentsEditor from './Components/ComponentsEditor'
import LayersEditor from './Layers/LayersEditor'
import ItemEditor from './Item/ItemEditor'
import ResultEditor from './Result/ResultEditor'
import ElementsEditor from './Elements/ElementsEditor'

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
    UIComponents: styled.div`
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        flex-grow: 1;
    `
}

export default function ContextWorkspace({children}) {
    return (
        <Classes.Root>
            <React.Fragment>
                <ConfigurationsEditor w={2.5} h={rowHeights[0]}/>
                <DatasetsEditor w={2.5} h={rowHeights[0]}/>
                <CalculationsEditor w={2.5} h={rowHeights[0]}/>
                <ComponentsEditor w={2.5} h={rowHeights[0]}/>
            </React.Fragment>
            <React.Fragment>
                <ItemEditor w={10} h={rowHeights[1]}/>
            </React.Fragment>
            <React.Fragment>
                <ResultEditor w={8} h={rowHeights[2]}/>
                <Classes.UIComponents>
                    <LayersEditor w={10} h={3}/>
                    <ElementsEditor w={10} h={7}/>
                </Classes.UIComponents>
                
            </React.Fragment>
        </Classes.Root>
    )
}