const spaceModifier = 1,
fontModifier = 1,
radiusModifier=2

export default {
    colors: {
        text: {
            primary: "#ffffff",
            secondary: "#202020",
            accent: "",
            highlight: "",
            muted: "",
        },
        primary: '#3e3e3e',
        secondary: "#cdcdcd",
        background:"#515151",
    },    
    fonts: {
        body: {
            family: "Lucida Console,Lucida Sans Typewriter,monaco,Bitstream Vera Sans Mono,monospace",
            size: `${fontModifier*1.5}rem`,

        },
        h1: {

        },
        h2: {

        },
        h3: {

        },
        h4: {
            size: `${fontModifier*1.7}rem`,
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
        space: [0,2,4,6,8,10,12,14].map((v,i) => {return v*spaceModifier}),
        width: ["0%","10%","20%","30%","40%","50%","60%","70%","80%","90%","100%"],
        maxWidth: ["0px","100px","200px","300px","400px","500px"],
        height: ["0%","10%","20%","30%","40%","50%","60%","70%","80%","90%","100%"],
        maxHeight: ["0px","100px","200px","300px","400px","500px"],
        zIndices: [0,1,2,3,4],
        lineHeight: ["0rem","1.4rem","1.8rem","2.2rem","2.6rem","3rem"]
    },
    
} 