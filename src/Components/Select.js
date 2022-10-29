import React from 'react'
import theme from 'theme'
import styled from 'styled-components'

function Select(props) {
    return (
        <select>
            {props.children}
        </select>
    )
}

function Option(props) {
    return (
        <option {...props}/>
    )
}

export default Object.assign(Select, {Option})