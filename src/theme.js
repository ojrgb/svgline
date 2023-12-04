import { deepenColor } from "utils.js"

const spaceModifier = 1,
fontModifier = 1,
radiusModifier=1,
colorModifier = 0.2

const commonSizes = Object.assign(
    {},
    (new Array(11)).fill().map((v,i) => `${i*10}%`),
    {2.5: '25%', 3.3: '33.3333%', 1.25: '12.5%', 6.6: '66.6666%'}
    )

export default {
    colors: {
        text: {
            primary: deepenColor("#ffffff",colorModifier),
            secondary: "#202020",
            accent: "",
            highlight: "",
            muted: "",
        },
        primary: '#3e3e3e',
        secondary: "#cdcdcd",
        background:"#515151",
        green: "#00870e",
        red: "#910000",
        deepen: (new Array(11)).fill().map((v,i) => {return i/10})
    },    
    fonts: {
        body: {
            family: "Lucida Console,Lucida Sans Typewriter,monaco,Bitstream Vera Sans Mono,monospace",
            size: `${fontModifier*1}rem`,

        },
        code: {
            family: 'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New',
            size: `${fontModifier*0.9}rem`,
        },
        h1: {
            size: `${fontModifier*2.6}rem`
        },
        h2: {
            size: `${fontModifier*2.3}rem`,
        },
        h3: {
            size: `${fontModifier*2.0}rem`,
        },
        h4: {
            size: `${fontModifier*1.7}rem`,
        },
        h5: {
            size: `${fontModifier*1.3}rem`,
        }
    } ,
    borders: {
        primary: {
            width: "1px",
            style: "solid",
            color: "rgb(100 100 100)",
            radius: `${radiusModifier*4}px`,
        },
        secondary: {
            width: "1px",
            style: "solid",
            color: "rgb(124 124 124)",
            radius: `${radiusModifier*4}px`,
        }
    },
    scale: {
        space: [0,2,4,6,8,10,12,14,16,18,20].map((v,i) => {return `${v*spaceModifier}px`}),
        width: commonSizes,
        minWidth: ["0px","100px","200px","300px","400px","500px"],
        maxWidth: ["0px","100px","200px","300px","400px","500px"],
        height: commonSizes,
        minHeight: ["0px","100px","200px","300px","400px","500px"],
        maxHeight: ["0px","100px","200px","300px","400px","500px"],
        zIndices: [0,1,2,3,4],
        lineHeight: ["0rem","1.4rem","1.8rem","2.2rem","2.6rem","3rem"]
    },
    navbar: {
        height: 30,
        margin: 5
    }
    
} 