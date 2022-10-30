import React, { useState } from 'react'
import { createEditor } from 'slate'
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

export default function Calculation(props) {
    const [editor] = useState(() => withReact(createEditor()))
    const initialValue = [
        {
          type: 'paragraph',
          children: [{ text: 'A line of text in a paragraph.' }],
        },
      ]
    return (
        <Classes.Root {...props}>
            <Slate editor={editor} value={initialValue}>
                <Editable style={{whiteSpace: 'nowrap'}}/>
            </Slate>
        </Classes.Root>
    )
}

