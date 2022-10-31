import React, { useState } from 'react'
import { createEditor } from 'slate'
import { Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import styled from 'styled-components'
import { applyQuickStyles, modifySize, relaxColor } from 'utils'
import theme from 'theme'

const relaxDelta = 0.1,
    relaxTextDelta = 0.6,
    borderThicknessDelta = 2,
    relaxBorderDelta = 0.1,
    deepenBorderDelta = 0.1

const Classes = {
    Root: styled.div`
        ${applyQuickStyles}
        background-color: ${relaxColor(theme.colors.primary,relaxDelta)}; 
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
    `
}

const Leaf = (props) => {
    
    return (
        <span
            {...props.attributes}
            style={{
                color: props.leaf.type === 'parentheses' && 'yellow'
            }}
            >
                {props.children}
        </span>
    )
}

export default function Calculation(props) {
    const [editor] = useState(() => withReact(createEditor()))
    console.log(editor)
    const initialValue = [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ]
    const renderLeaf = React.useCallback(props => {
        console.log(props)
        return <Leaf {...props} />
      }, [])

    const renderElement = React.useCallback(props => {
        switch (props.element.type) {
          case 'parentheses':
            return <EditorElements.ParenthesesElement {...props} />
          default:
            return <span {...props} />
        }
      }, [])

    const EditorElements = {
        ParenthesesElement: (props) => {
            return (
                <span style={{color:'yellow'}}>
                    {props.children}
                </span>
            )
        }
    }

    const handleChange = (value) => {

    }

    const handleKeyDown = event => {
        
        if (event.key === '(') {
            console.log(event.key)
          event.preventDefault()
          Transforms.insertNodes(editor,{
            type: 'parentheses',
            children: [{
                text: '('
            }]
          })
          console.log(editor)
        }
      }
    return (
        <Classes.Root {...props}>
            <Slate 
                editor={editor} 
                value={initialValue}
                onChange={handleChange}
            >
                <Editable 
                    style={{}}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={handleKeyDown}
                />
            </Slate>
        </Classes.Root>
    )
}

