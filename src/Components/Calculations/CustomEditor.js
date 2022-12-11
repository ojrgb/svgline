import React from 'react'
import { Text, Transforms } from 'slate'
import CalculationParser from './CalculationParser'
import elementTypes from './elementTypes'

export const handleKeyDown = (editor, event) => {
    
    
}

const tokenize = CalculationParser.tokenize

const getLength = (token) =>
    typeof token === "string"
      ? token.length
      : typeof token.content === "string"
      ? token.content.length
      : token.content.reduce((l, t) => l + getLength(t), 0);
  

export const decorate = ([node, path]) => {
    if (!Text.isText(node)) {
      return [];
    }
    const ranges = [];
    const tokens = tokenize(node.text);
    let start = 0;
    for (const token of tokens) {
      const end = start + getLength(token);
      if (typeof token !== "string") {
        ranges.push({
          [token.display]: true,
          anchor: { path, offset: start },
          focus: { path, offset: end },
        });
      }
      start = end;
    }
    return ranges;
  };