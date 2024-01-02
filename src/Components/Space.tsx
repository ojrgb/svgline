import React from 'react'
import theme from 'theme'
import styled from 'styled-components'

type SpaceProps = {
    children?: React.ReactNode;
    p?: number;
    py?: number;
    px?: number;
    pt?: number;
    pr?: number;
    pb?: number;
    pl?: number;
    m?: number;
    my?: number;
    mx?: number;
    mt?: number;
    mr?: number;
    mb?: number;
    ml?: number;
};



export default function Space({
    children,
    p,
    py,
    px,
    pt,
    pr,
    pb,
    pl,
    m,
    my,
    mx,
    mt,
    mr,
    mb,
    ml,
}: SpaceProps) {
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