import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import ConfigurationsEditor from './Configurations/ConfigurationsEditor'
import DatasetsEditor from './Datasets/DatasetsEditor'
import CalculationsEditor from './Calculations/CalculationsEditor'
import ComponentsEditor from './Components/ComponentsEditor'
import LayersEditor from './Layers/LayersEditor'
import ItemEditor from './Item/ItemEditor'

const firstRowHeight = 2,
secondRowHeight = 3

const Classes = {
    Root: styled.div`
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        height: 100%;
        align-content: baseline;
    `
}

export default function ContextWorkspace({children}) {
    return (
        <Classes.Root>
            <React.Fragment>
                <ConfigurationsEditor w={2} h={firstRowHeight}/>
                <DatasetsEditor w={2} h={firstRowHeight}/>
                <CalculationsEditor w={2} h={firstRowHeight}/>
                <ComponentsEditor w={2} h={firstRowHeight}/>
                <LayersEditor w={2} h={firstRowHeight}/>
            </React.Fragment>
            <React.Fragment>
                <ItemEditor w={10} h={2}/>
            </React.Fragment>
        </Classes.Root>
    )
}