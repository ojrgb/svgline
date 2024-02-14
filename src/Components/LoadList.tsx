import React from "react";

import theme from "theme";
import styled from "styled-components";
import { debug, deepenColor, modifySize, relaxColor } from "utils";
import dataService from "./Data/dataService";
import { loadStore } from "Context/loadStore";

const Classes = {
    Root: styled.div.attrs({ className: "load-list" })`
    `,
    Single: styled.div.attrs({ className: "load-list-single" })`
    `,
    ShortName: styled.div.attrs({ className: "load-list-short-name" })`
    `,
}

export default function LoadList(props: {
    
}) {
    const { } = props;
    const [data, setData] = React.useState([]);
    const { setLoadTarget } = React.useContext(loadStore);

    const fetchData = async () => {
        setData(await dataService.get({ collection: 'flows' }));
    };
    React.useEffect(() => {  
        fetchData();
    }, []);
    return (
        <Classes.Root>
            {
                data.map((item, index) => {
                    return (
                        <Classes.Single key={index} onClick={
                            () => {
                                setLoadTarget(item);
                            }
                        
                        }>
                            <Classes.ShortName>
                                {item._id}
                            </Classes.ShortName>
                        </Classes.Single>
                    )
                })
            
            }
        </Classes.Root>
    );
}
