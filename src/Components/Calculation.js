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
        br {
            display: none;
        }
    `
}

const Leaf = (props) => {
    
    return (
        <span
            {...props.attributes}
            style={{
                
            }}
            >
                {props.children}
        </span>
    )
}

export default function Calculation(props) {
    const [editor] = useState(() => withReact(createEditor()))
    
    const initialValue = [
        {
          type: 'block',
          children: [{ text: '' }],
        },
      ]
    const renderLeaf = React.useCallback(props => {
        
        return <Leaf {...props} />
      }, [])

    const renderElement = React.useCallback(props => {
        const Element = {
            parentheses : EditorElements.ParenthesesElement,
            operator: EditorElements.OperatorElement,
            block: EditorElements.BlockElement
        }[props.element.type]
        return Element ? <Element {...props}/> : <span {...props}/>
      }, [])

    const EditorElements = {
        ParenthesesElement: (props) => {
            return (
                <span>
                    <span style={{color: 'yellow'}}>(</span>
                    {props.children}
                    <span style={{color: 'yellow'}}>)</span>
                </span>
            )
        },
        OperatorElement: (props) => {
            return (
                <span 
                    style={{color: 'pink'}}
                    >
                    {props.children}
                </span>
            )
        },
        BlockElement: (props) => {
            return (
                <span>
                    {props.children}
                </span>
            )
        }
    }

    const handleChange = (value) => {

    }

    const handleKeyDown = event => {

        const arithmeticOperators = ['+','-','/','*']

        const singleLetterNodes = [{
            '(': {
                node: {
                    type: 'parentheses',
                    children: [
                        {text: ''}
                    ]
                },
                wrap: true,
                selection: () => {}
            },
        }].concat(
            arithmeticOperators.map(v => ({
                [v]: {
                    node: {type: 'operator',
                    children: [{text: v}]}
                }
            }))
        ).reduce((a,b) => {return Object.assign(a,b)})

        const triggerLetters = Object.keys(singleLetterNodes).map(
            v => ({
                [v]: Object.assign({},singleLetterNodes[v],{
                    selection: singleLetterNodes[v].selection ? singleLetterNodes[v].selection : () => {return []}
                })
            })
        ).reduce((a,b) => {return Object.assign({},a,b)})

        const triggeredAction = triggerLetters[event.key]

        
        if (triggeredAction) {
          const curSelection = editor.selection
          
          event.preventDefault()

            

          Transforms.insertNodes(editor,[triggeredAction.node])
          
          if(editor.children[editor.children.length-1].type!=='block') {
            Transforms.insertNodes(editor, [{
                type:'block',
                children: [{
                    text: ''
                }]
              }])
          }
          
          
          Transforms.select(editor, curSelection)
          Transforms.move(editor, {
            distance: 1, unit: 'character'
          })
          
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

