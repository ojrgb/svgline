import React from 'react';
import Rodal from 'rodal';
import theme from 'theme';
import { deepenColor } from 'utils';
import styled from 'styled-components';

// include styles
import 'rodal/lib/rodal.css';

const deepenDelta = 0.1

const Classes = {
  Root: styled.div`
    height: ${theme.navbar.height}px;
    background-color: ${deepenColor(theme.colors.primary,deepenDelta)};
    
    
    font-size: ${props => props.height*0.5}px;
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
    text-align: center;
    margin-bottom: ${theme.scale.space[3]};
    `,
  Footer: styled.div`
    display: flex;
    justify-content: center;
    `,
}

export default function Modal (props) {
  return (
    <div>
      <Rodal visible={props.open} onClose={props.onClose} customStyles={{background: deepenColor(theme.colors.primary,deepenDelta)}}>
        <Classes.Root>
          <Classes.Title>{props.title}</Classes.Title>
          <Classes.Body>{props.children}</Classes.Body>
          <Classes.Footer>
            <button className="rodal-confirm-btn" onClick={props.onConfirm}>Confirm</button>
            <button className="rodal-cancel-btn" onClick={props.onCancel}>Cancel</button>
          </Classes.Footer>
        </Classes.Root>
      </Rodal>
    </div>
  );
}

  
   