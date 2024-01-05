import React from 'react';
import EditableInput from 'react-color/lib/components/common/EditableInput';
import { ChromePicker, PhotoshopPicker, SketchPicker } from 'react-color';
import styled from 'styled-components';
import theme from 'theme';
import { applyQuickStyles, modifySize, relaxColor } from 'utils';

const relaxDelta = 0.1,
    relaxTextDelta = 0.6,
    borderThicknessDelta = 2,
    relaxBorderDelta = 0.1,
    deepenBorderDelta = 0.1

const Classes = {
    Root: styled.div.attrs({className: 'color-picker-root'})`
        position: relative;
        display: flex;
    `,
    Input: styled.input.attrs({className: 'color-picker-input'})`
        ${applyQuickStyles}
        background-color: ${relaxColor(theme.colors.primary,relaxDelta)}; 
        color: ${relaxColor(theme.colors.text.primary,relaxTextDelta)};
        font-family: ${theme.fonts.code.family};  
        font-size: ${theme.fonts.code.size};     
        &:focus {
            border: ${modifySize(theme.borders.primary.width,borderThicknessDelta)} inset ${relaxColor(theme.borders.primary.color,relaxBorderDelta)};
            outline: none;
        }
        width:70%;
    `,
    SketchContainer: styled.div.attrs({className: 'color-picker-sketch-container'})`
        position: absolute;
        z-index: ${theme.scale.zIndices[2]}
    `,
    SketchCover: styled.div.attrs({className: 'color-picker-sketch-cover'})`
        position: fixed;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
    `
}

export default function ColorPicker({onChange, onBlur, value}) {
    const [open, setOpen] = React.useState(false)
    const [color, setColor] = React.useState(value)
    return (
        <Classes.Root>
            <Classes.Input onClick={() => {setOpen(true)}} value={value} readOnly/>
            {
                open && 
                <Classes.SketchContainer>
                    <Classes.SketchCover onClick={() => {setOpen(false)}}/>
                    <PhotoshopPicker color={value} 
                    onChange={(v) => {
                        setColor(v)
                    }}
                    onChangeComplete={(v) => 
                        {
                            onChange(v.hex)
                            
                        }
                    }/>
                </Classes.SketchContainer>
            }
        </Classes.Root>
    )
    
}