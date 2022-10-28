import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import {
    BsPlus,
    BsDash,
    BsTrash,
    BsFilePlus
} from 'react-icons/bs'

const Classes = {
    Root: styled.button`
        background-color: ${theme.colors.primary};
        color: ${theme.colors.text.primary};
        border: ${theme.borders.primary.width} ${theme.borders.primary.style} ${theme.borders.primary.color};
        padding: ${theme.scale.space[2]};
        &:active>* {
            transform:scale(0.9);
        }
    `,
    IconContainer: styled.div`
        display: flex;
        
    `
}

export default function Button(props) {
    const {icon} = props

    const icons = {
        plus: BsPlus,
        minus: BsDash,
        remove: BsTrash,
        add: BsFilePlus
    }

    const Icon = icon ? icons[icon] : undefined

    return (
        <Classes.Root {...props}>
            {
                Icon && (
                    <Classes.IconContainer>
                        <Icon/>
                    </Classes.IconContainer>
                )
            }
        </Classes.Root>
    )
}