import React from 'react';
import Rodal from 'rodal';
import theme from 'theme';
import { deepenColor } from 'utils';
import styled from 'styled-components';

// include styles
import 'rodal/lib/rodal.css';

const deepenDelta = 0.1
const buttonPaddingScale = 3

const Classes = {
  Root: styled.div<{
    height?: number;
    // font-size: ${props => props.height*0.5}px;
  }>`
    height: ${theme.navbar.height}px;
    background-color: ${deepenColor(theme.colors.primary,deepenDelta)};
    display: flex;
    flex-direction: column;
    
    color: ${theme.colors.text.primary};
    width: 100%;
    height: 100%;
`,
  Title: styled.div`
    font-size: ${theme.fonts.h5.size};
    font-weight: bold;
    color: ${theme.colors.text.primary};
    text-align: center;
    margin-bottom: ${theme.scale.space[3]};
    `,
  Body: styled.div`
    font-size: ${theme.fonts.body.size};
    color: ${theme.colors.text.primary};
    flex-grow: 1;
    text-align: center;
    margin-bottom: ${theme.scale.space[3]};
    `,
  Footer: styled.div`
    display: flex;
    justify-content: center;
    `,
  Button: styled.div`
      align-items: center;
      appearance: none;
      background-color: ${theme.colors.primary};
      
      border-width: 0;
      border: 2px solid black;
      box-sizing: border-box;
      color: ${theme.colors.text.primary};
      cursor: pointer;
      display: inline-flex;
      font-family: "JetBrains Mono",monospace;
      
      justify-content: center;
      line-height: 1;
      list-style: none;
      overflow: hidden;
      padding-left: ${theme.scale.space[buttonPaddingScale]};
      padding-right: ${theme.scale.space[buttonPaddingScale]};
      padding-top: ${theme.scale.space[buttonPaddingScale]};
      padding-bottom: ${theme.scale.space[buttonPaddingScale]};
      position: relative;
      text-align: left;
      text-decoration: none;
      transition: box-shadow .15s,transform .15s;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      white-space: nowrap;
      will-change: box-shadow,transform;
      font-size: ${theme.fonts.button.size}px;
   
  `
}

export default function Modal (props: {
  id: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
  title: string;
  confirmText?: string;
  cancelText?: string;
  children: React.ReactNode;
}) {
  console.log(`Modal ${props.id} open: ${props.open}`)
  return (
    <div>
      <Rodal visible={props.open} onClose={props.onClose} customStyles={{background: deepenColor(theme.colors.primary,deepenDelta)}}
        height={theme.modal.height} width={theme.modal.width}
        >
        <Classes.Root className={`modal ${props.id}`}>
          <Classes.Title className="modal-title">{props.title}</Classes.Title>
          <Classes.Body className="modal-body">{props.children}</Classes.Body>
          <Classes.Footer className="modal-footer">
            
            <Classes.Button className="modal-button" onClick={props.onCancel || props.onClose}>{props.cancelText || 'Cancel'}</Classes.Button>
            <Classes.Button className="modal-button" onClick={props.onConfirm}>{props.confirmText || 'Confirm'}</Classes.Button>
          </Classes.Footer>
        </Classes.Root>
      </Rodal>
    </div>
  );
}

  
   