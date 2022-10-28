import React from 'react'
import theme from 'theme'
import styled from 'styled-components'

export default function RecursiveElement(props) {
    const {element, children} = props;
    console.log(props)
    const level = props.level || 0;
    const Element = element
    if(children && children.length>0) {
        return (
            <Element {...props} isGroup {...{level}}>
                {children.map((v,i) => 
                    <RecursiveElement 
                        {...props} 
                        children={undefined}
                        {...v}
                        level={level+1}
                    />
                )}
            </Element>
        )
    }
    else {
        return (
            <Element {...props} {...{level}}/>
        )
    }
}