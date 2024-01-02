import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import {BsCaretRightFill} from './Icons/Icons'

export default function ExpandIcon(isExpanded: any) {
    return (
        <BsCaretRightFill style={{transform: `rotate(${isExpanded ? 90 : 0}deg)`}}/>
    )
}