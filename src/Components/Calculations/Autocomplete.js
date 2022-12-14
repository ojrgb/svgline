import React from 'react'
import Portal from 'Components/Portal';
import styled from 'styled-components';

const getSuggestionsList = (str,arr) => {
    
    
    let res = [...arr]
    const parts = str.split('.')
    parts.forEach((part,parti) => {
        if(parti<parts.length-1) {
            // This part handles cases where the string part isn't the end. for example CALCULATIONS.CAL
            const match = res.find(v => v._id===part)
            if(match) {
                res = match.children
            }
        }
        else {
            if (part.length===0) {
                res = res // returns the list
            }
            else {
                res = res.filter(v => v._id.indexOf(part)===0)
            }
        }
    })
    return res
}

const Classes = {
    SuggestionsList: styled.div`
        display: flex;
        flex-direction: column;
        cursor: default;
        user-select: none;
    `
}

const ListItem = (props) => {
    return (
     <div onClick={props.onClick}>
        {props.children}
     </div>   
    )
}

export default function Autocomplete (props) {
    const {input, suggestions, onSelect} = props
    if(!input || !suggestions || !onSelect) {
        return "No input or suggestions or onSelect!"
    }
    const res = getSuggestionsList(input,suggestions)
    const selection = window?.getSelection();
    
    const range = selection.type!== 'None' ? selection?.getRangeAt(0) : undefined
    const rect = range?.getBoundingClientRect();
    
    return (
        <Portal>
            <div style={{
                position: 'absolute',
                top: rect?.y || '50%',
                left: rect?.x || '50%',

                zIndex: 99,
                background: 'white',
                transform: 'translate(0px,1.2rem)'
            }}>
                <Classes.SuggestionsList>
                    {
                        res.map((v,i) => 
                            <ListItem key={i} onClick={(e) => {
                                onSelect(v)
                            }}>{v._id}</ListItem>    
                        )
                    }
                </Classes.SuggestionsList>
            </div>
        </Portal>
    )
}