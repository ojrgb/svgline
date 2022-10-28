import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import {BsCaretRightFill} from 'react-icons/bs'

export default function ExpandIcon({isExpanded}) {
    return (
        <BsCaretRightFill style={{transform: `rotate(${isExpanded ? 90 : 0}deg)`}}/>
    )
}