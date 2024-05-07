import React from "react";

import theme from "theme";
import styled from "styled-components";
import { debug, deepenColor, modifySize, relaxColor } from "utils";
import dataService from "./Data/dataService";
import { loadStore } from "Context/loadStore";

const Classes = {
    Root: styled.div.attrs({ className: "load-list" })`
    `,
    Table: styled.div.attrs({ className: "load-list-table" })`
        display: table;
        width: 100%;
        display: table;
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        margin-bottom: 16px;
        
        border: 1px solid ${theme.colors.primary};
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        text-align: left;
        
    `,
    HeaderRow: styled.div.attrs({ className: "load-list-header-row" })`
        display: table-row;
        font-weight: bold;
        cursor: default;
    `,
    HeaderCell: styled.div.attrs({ className: "load-list-header-cell" })`
        display: table-cell;
        padding: 8px;
        border-bottom: 1px solid ${theme.colors.primary};
    `,
    DataRow: styled.div.attrs({ className: "load-list-data-row" })<{ selected: boolean }>`
        display: table-row;
        cursor: pointer;
        &:hover {
            background-color: ${deepenColor(theme.colors.primary, 0.2)};
            ${props => props.selected && (
                `
                    background-color: ${relaxColor(theme.colors.primary, 0.1)};
                `
            )}
        }
        ${props => props.selected && (
            `
                background-color: ${relaxColor(theme.colors.primary, 0.1)};
            `
        )}

    `,
    DataCell: styled.div.attrs({ className: "load-list-data-cell" })`
        display: table-cell;
        padding: 8px;
        border-bottom: 1px solid ${theme.colors.primary};
    `,
    ShortName: styled.div.attrs({ className: "load-list-short-name" })`
    `,
}

export default function LoadList(props: {
    collection: string;
    columns: any[];
}) {
    const {columns } = props;
    const [data, setData] = React.useState([]);
    const { setLoadTarget } = React.useContext(loadStore);
    const [selected, setSelected] = React.useState(null);

    const handleSelect = (row: any,rowi: number) => {
        setSelected(rowi);
        setLoadTarget(row);
    }

    const fetchData = async () => {
        console.log(await dataService.get({ collection: props.collection }))
        setData(await dataService.get({ collection: props.collection }));
    };
    React.useEffect(() => {  
        fetchData();
    }, []);
    return (
        <Classes.Root>
            <Classes.Table>
                <Classes.HeaderRow>
                    {
                        columns.map((column, columni) => {
                            return (
                                <Classes.HeaderCell key={columni}>
                                    {column.name}
                                </Classes.HeaderCell>
                            )
                        })
                    }
                </Classes.HeaderRow>
            {
                data.map((row, rowi) => {
                    return (
                        <Classes.DataRow selected={selected===rowi} key={rowi} onClick={() => handleSelect(row,rowi)}>
                            {
                                columns.map((column, columni) => {
                                    return (
                                        <Classes.DataCell key={columni}>
                                            {row[column._id]}
                                        </Classes.DataCell>
                                    )
                                })
                            }
                        </Classes.DataRow>
                    )
                })
            
            }
            </Classes.Table>
        </Classes.Root>
    );
}
