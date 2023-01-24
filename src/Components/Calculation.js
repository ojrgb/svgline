import React, { useState } from 'react'
import { createEditor } from 'slate'
import { Transforms, Range } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import styled from 'styled-components'
import { applyQuickStyles, modifySize, relaxColor } from 'utils'
import theme from 'theme'
import * as CustomEditor from './Calculations/CustomEditor'
import Autocomplete from './Calculations/Autocomplete'

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
    
    const { attributes, children, leaf, editor } = props
    const childRefs = React.useRef([])
    
    
    const styles = {
        'arithmeticOperator': {
            color: 'pink'
        },
        'parentheses': {
            color: 'yellow'
        },
        'quotes': {
            color: '#d76117'
        },
        'function': {
            color: '#e42662'
        }
    }
    
 
    
    return (
        <span
            style={Object.keys(leaf).map(v => styles[v]).filter(Boolean)[0]}
            {...attributes}
        >
            {children}
            {
                leaf.variable && 
                    editor?.selection?.focus && leaf?.rangeLocation && Range.includes(leaf.rangeLocation,editor.selection.focus) && (
                    <Autocomplete
                        
                        input={leaf.text.slice(1,leaf.text.length)}
                        onSelect={(v) => {
                            const splitText = leaf.text.slice(1,leaf.text.length).split(".")
                            const curPart = splitText[splitText.length-1] 
                            
                            if(curPart.length>0) {
                                Transforms.delete(editor,{distance: curPart.length,unit:'character',reverse:true})
                            }
                            Transforms.insertText(editor,v._id)
                            
                            ReactEditor.focus(editor)
                            Transforms.setSelection(editor,{focus:leaf.rangeLocation.focus})
                            Transforms.collapse(editor,{edge:'end'})
                        }}
                    />
                )
            }
        </span>
    )
}

export default function Calculation(props) {
    const {onChange} = props
    const [editor] = useState(() => withReact(createEditor()))
    
    const initialValue = [
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
                    onKeyDown={(e) => {
                        CustomEditor.handleKeyDown(editor,e)
                    }}
                    decorate={CustomEditor.decorate}
                />
            </Slate>
        </Classes.Root>
    )
}

