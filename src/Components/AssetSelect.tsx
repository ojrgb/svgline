import React from 'react'
import theme from 'theme'
import styled from 'styled-components'
import { applyQuickStyles, deepenColor, modifySize, relaxColor } from 'utils'
import dataService from './Data/dataService'

const relaxDelta = 0.1,
    relaxTextDelta = 0.6,
    borderThicknessDelta = 2,
    relaxBorderDelta = 0.1,
    deepenBorderDelta = 0.1

const Classes = {
    Root: styled.div.attrs({className:"asset-select"})`
        display: flex;
        width: 100%;
    `,
    Text: styled.input`
        ${applyQuickStyles}
        background-color: ${relaxColor(theme.colors.primary,relaxDelta)}; 
        color: ${relaxColor(theme.colors.text.primary,relaxTextDelta)};
        font-family: ${theme.fonts.code.family};  
        font-size: ${theme.fonts.code.size};     
        &:focus {
            border: ${modifySize(theme.borders.primary.width,borderThicknessDelta)} inset ${relaxColor(theme.borders.primary.color,relaxBorderDelta)},${deepenColor(theme.borders.primary.color,deepenBorderDelta)};
            outline: none;
        }
        width: 70%;
    `,
    Button: styled.button`
        ${applyQuickStyles}
        background-color: ${relaxColor(theme.colors.primary,relaxDelta)}; 
        color: ${relaxColor(theme.colors.text.primary,relaxTextDelta)};
        font-family: ${theme.fonts.code.family};  
        font-size: ${theme.fonts.code.size};     
        &:focus {
            border: ${modifySize(theme.borders.primary.width,borderThicknessDelta)} inset ${relaxColor(theme.borders.primary.color,relaxBorderDelta)},${deepenColor(theme.borders.primary.color,deepenBorderDelta)};
            outline: none;
        }
        width: 30%;
    `,
    FileInput: styled.input`
        display: none;
    `
}

export default function AssetSelect(props: React.HTMLAttributes<HTMLInputElement> & React.PropsWithChildren<{
    onChange?: (v: string) => void,
    value?: string,
}>) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const [fileUrl, setFileUrl] = React.useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (file) {
            try {
                const response = await dataService.saveAsset({file});
                if (response.ok) {
                    const data = await response.json();
                    setFileUrl(data.url);
                } else {
                    console.error('File upload failed');
                }
            } catch (error) {
                console.error('File upload failed', error);
            }
        }
    };

    return (
        <Classes.Root>
            <Classes.Text disabled={true} {...props} />
            <Classes.Button onClick={(e) => {
                e.preventDefault();
                fileInputRef.current?.click();
            }}>Upload</Classes.Button>
            <Classes.FileInput ref={fileInputRef} type="file" onChange={handleFileChange} />
            {fileUrl && <p>File URL: {fileUrl}</p>}
        </Classes.Root>
    );
}