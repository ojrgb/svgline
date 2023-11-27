import React from 'react'
import theme from 'theme.js'
import styled from 'styled-components'
import {BsCaretRightFill} from './Icons/Icons.js'

export default function ExpandIcon({isExpanded}) {
    return (
        <BsCaretRightFill style={{transform: `rotate(${isExpanded ? 90 : 0}deg)`}}/>
    )
}