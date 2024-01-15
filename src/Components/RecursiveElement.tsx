import React, { ReactNode } from 'react'
import theme from 'theme.js'
import styled from 'styled-components'
import Entity from 'Model/Entity'

export default function RecursiveElement(props: {
    element: ReactNode,
    
}) {
    
    
    
    // if(children && children.length>0) {
    //     return (
    //         <Element {...props} isGroup {...{path}}>
    //             {children?.map((v,i) => 
    //                 <RecursiveElement 
    //                     {...props} 
    //                     children={undefined}
    //                     {...v}
    //                     path={[...path].concat([i])}
    //                 />
    //             )}
    //         </Element>
    //     )
    // }
    // else {
    //     return (
    //         <Element {...props} {...{path}}/>
    //     )
    // }
    return <div/>
}