import React from 'react'

const createAutocompletePlugin = (suggestions) => {
  return {
    withAutocomplete: (editor) => {
      
      return editor;
    }
  }
}