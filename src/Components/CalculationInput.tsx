import React from 'react'
import CodeMirror, { EditorState } from '@uiw/react-codemirror';
import {CompletionContext} from "@codemirror/autocomplete"
import { javascript, javascriptLanguage } from '@codemirror/lang-javascript';
import {syntaxTree} from "@codemirror/language"
import Flow from 'Model/Flow';
import { flowStore } from 'Context/flowStore';
import { Completion } from '@codemirror/autocomplete';

//   function myCompletions(context: CompletionContext) {
//     let word = context.matchBefore(/\w*/)
//     if (word.from == word.to && !context.explicit)
//       return null
//     return {
//       from: word.from,
//       options: [
//         {label: "match", type: "keyword"},
//         {label: "hello", type: "variable", info: "(World)"},
//         {label: "magic", type: "text", apply: "⠁⭒*.✩.*⭒⠁", detail: "macro"}
//       ]
//     }
//   }

function makeCompletions(props: {flow: Flow}) {

    // Instantiate flow and tree
      const {flow} = props
        let tree = {} 
    
    // Get the flow and iterate over it
      for(let key in flow.get()) {
        const value = flow.get()[key]
        const _id = value?._id
        if(_id) {
            tree[_id] = value
        }
        
      }

      // Convert into options
      const options = Object.keys(tree).map(key => {
        const value = tree[key]
        return {label: key, type: value.objectType}
})

  

   
      // Start the myCompletions function
     return function myCompletions(context: CompletionContext) {

        // Get the node before the current position
        let nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1)

        // Resolve the path
        let path = []
        let current = nodeBefore
        // OMG, this function is so complicated. But I'll try to explain it.
        // It deconstructs the path of the current node before the cursor. 
        // For example, if the cursor is at `theme.fonts.code.size`, it will return
        // `['theme','fonts','code','size']`
        // It does it by checking recursively if the previous sibling is a dot, and if the
        // current node is a VariableName. If it is, it adds the name to the path, and then
        // sets the current node to the previous sibling. It does this until it reaches the
        // beginning of the line, or until it reaches a node that is not a VariableName.
        function resolvePath(current: typeof nodeBefore) {
            console.log(current)
            let newCurrent = current.prevSibling
            
           if(current.name == ".") {
                if(["VariableName","MemberExpression"].includes(newCurrent?.name)) {
                    return resolvePath(newCurrent)
                }
           }
           else if(current.name == "VariableName") {
                if(newCurrent?.name == ".") {
                    return resolvePath(newCurrent)
                }
           }
           let from = newCurrent?.from || 0
           let textBefore = context.state.sliceDoc(from, context.pos)
           return textBefore
        }

        let fullPath;
        if(current.name == ".") {
            fullPath = resolvePath(current)
            console.log(fullPath)
        }

        console.log(flow.getForAutocomplete())

        let word = context.matchBefore(/\w*/)
        
        
        // if (nodeBefore.name != "BlockComment" ||
        //     context.state.sliceDoc(nodeBefore.from, nodeBefore.from + 3) != "/**")
        //   return null
        let textBefore = context.state.sliceDoc(nodeBefore.from, context.pos)
        let tagBefore = /@\w*$/.exec(textBefore)
        // if (!tagBefore && !context.explicit) return null
        return {
          from: word.from,
          options
        //   validFor: /^(@\w*)?$/
        }
      }
    
}





export default function CalculationInput(props: {
    value: any,
    onChange: (val: string) => void,
    onBlur: () => void
}) {
    const {flow} = React.useContext(flowStore)
    const myCompletions = makeCompletions({flow})
    const completions = javascriptLanguage.data.of({autocomplete: myCompletions})
    return (
        <CodeMirror 
            value={props.value} 
            theme="dark" 
            extensions={[completions,javascript({jsx: true})]} 
            onChange={props.onChange} 
            onBlur={props.onBlur}
            
        />
    )
}
