import React from 'react'
import theme from 'theme.js'
import styled from 'styled-components'

export default function RecursiveElement(props) {
    const {element, children} = props;
    const path = props.path; // you must pass the path to the first recursive element. Would normally be an array with a single member denoting the index of the element in the parent array
    const Element = element
    if(children && children.length>0) {
        return (
            <Element {...props} isGroup {...{path}}>
                {children.map((v,i) => 
                    <RecursiveElement 
                        {...props} 
                        children={undefined}
                        {...v}
                        path={[...path].concat([i])}
                    />
                )}
            </Element>
        )
    }
    else {
        return (
            <Element {...props} {...{path}}/>
        )
    }
}