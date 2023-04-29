import React from 'react'
import theme from 'theme.js'
import styled from 'styled-components'

export default function Space({children, p, py, px, pt, pr, pb, pl, m, my, mx, mt, mr, mb, ml}) {
    const [sp, spy, spx, spt, spr, spb, spl, sm, smy, smx, smt, smr, smb, sml] =
    [p, py, px, pt, pr, pb, pl, m, my, mx, mt, mr, mb, ml].map(v => v && theme.scale.space[v])
    return (
        <div
            style={{
                padding: sp,
                paddingTop: spt || spy,
                paddingRight: spr || spx,
                paddingBottom: spb || spb,
                paddingLeft: spl || spx,
                margin: sm,
                marginTop: smt || smy,
                marginRight: smr || smx,
                marginBottom: smb || smy,
                marginLeft: sml || smx
            }}>
            {children}
        </div>
    )
}