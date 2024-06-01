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

let Classes = {
    Root: styled.div.attrs({className:"asset-select"})`
        display: flex;
        width: 100%;
        :hover >*:not(input) {
            display: block;
        }
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
        height: 0;
        width: 0;
    `,
     ImagePreviewContainer: styled.div`
        width: 100%;
        position: absolute;
        display: none;
            width: 100%;
            position: absolute;
            display: none;
      
    
    `,
    ImagePreview: styled.img`
        
        height: 100px;
        width: auto;
    `

}


    
     

export default function AssetSelect(props: React.HTMLAttributes<HTMLInputElement> & React.PropsWithChildren<{
    onChange?: (v: any) => void,
    value?: any,
}>) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (file) {
            try {
                const response = await dataService.saveAsset({file});
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    props.onChange && props.onChange({imageId: data.url})
                } else {
                    console.error('File upload failed');
                }
            } catch (error) {
                console.error('File upload failed', error);
            }
        }
    };

    console.log(props)
    return (
        <Classes.Root>
            <Classes.Text disabled={true} {...props} value={props.value?.imageId || ""} />
            <Classes.Button onClick={(e) => {
                e.preventDefault();
                fileInputRef.current?.click();
            }}>Upload</Classes.Button>
            <Classes.FileInput ref={fileInputRef} type="file" onChange={handleFileChange} />
            {
                props.value?.imageId && <Classes.ImagePreviewContainer>
                    <Classes.ImagePreview src={props.value?.imageId} />
                </Classes.ImagePreviewContainer>
            }
        </Classes.Root>
    );
}