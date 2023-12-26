import React, { useState } from 'react'
import { createEditor } from 'slate'
import { Transforms, Range } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import styled from 'styled-components'
import { applyQuickStyles, deepenColor, modifySize, relaxColor } from 'utils.js'
import theme from 'theme.js'
import * as CustomEditor from './Calculations/CustomEditor.js'
import Autocomplete from './Calculations/Autocomplete.js'
import CalculationParser from './Calculations/CalculationParser.js'
import Leaf from './Calculations/Leaf.js'
import { contextStore } from 'Context/contextStore.js'
import { entitiesStore } from 'Context/entitiesStore.js'

const relaxDelta = 0.1,
    relaxTextDelta = 0.6,
    borderThicknessDelta = 2,
    relaxBorderDelta = 0.1,
    deepenBorderDelta = 0.1


    // background-color: ${relaxColor(theme.colors.primary,relaxDelta)}; 

const Classes = {
    Root: styled.div`
        ${applyQuickStyles}
        background-color: ${props => props.valid ? deepenColor(theme.colors.red,0.5) : deepenColor(theme.colors.green,0.5)};
        color: ${relaxColor(theme.colors.text.primary,relaxTextDelta)};
        border: ${modifySize(theme.borders.primary.width,borderThicknessDelta)} inset ${relaxColor(theme.borders.primary.color,relaxBorderDelta)}};
        font-family: ${theme.fonts.code.family};
        font-size: ${theme.fonts.code.size};
        text-align: left;
        &:focus {
            border: ${modifySize(theme.borders.primary.width,borderThicknessDelta)} inset ${relaxColor(theme.borders.primary.color,relaxBorderDelta)}};
            outline: none;
        }
        overflow-y: hidden;
        overflow-x: hidden;
        white-space: nowrap;
        br {
            display: none;
        }
    `
}



export default function Calculation(props) {
    const {entitiesState, entitiesDispatch} = React.useContext(entitiesStore)
    
    const {onChange} = props
    const [editor] = useState(() => withReact(createEditor()))
    
    const initialValue = props.value || [
        {
          type: 'block',
          children: [{ text: '' }],
        },
      ]
    const renderLeaf = React.useCallback(props => {
        
        return <Leaf {...props} editor={editor} />
      }, [])

    const renderElement = React.useCallback(props => {
        return <span {...props}/>
      }, [])

    const handleChange = (value) => {
        
        
        onChange(value)
    }
    
    const parsed = CalculationParser.parse({
        expression: editor?.children?.[0]?.children?.[0]?.text,
        variables: entitiesState
    })
    console.log(CalculationParser.evaluate(
        {
            expression: editor?.children?.[0]?.children?.[0]?.text,
            variables: entitiesState
        }
    ))

    
    return (
        <Classes.Root {...props} valid={!!!parsed}>
            <Slate 
                editor={editor} 
                value={initialValue}
                onChange={handleChange}
            >
                <Editable 
                    style={{}}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={(e) => {
                        CustomEditor.handleKeyDown(editor,e)
                    }}
                    decorate={CustomEditor.decorate}
                    
                />
            </Slate>
        </Classes.Root>
    )
}

