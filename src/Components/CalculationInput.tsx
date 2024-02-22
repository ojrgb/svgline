import React from 'react'
import CodeMirror, { EditorState } from '@uiw/react-codemirror';
import {CompletionContext} from "@codemirror/autocomplete"
import { javascript, javascriptLanguage } from '@codemirror/lang-javascript';
import {syntaxTree} from "@codemirror/language"
import Flow from 'Model/Flow';
import { flowStore } from 'Context/flowStore';
import { Completion } from '@codemirror/autocomplete';
import _ from 'lodash';
import './autocompleteTypes.css'

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
           let textBefore = context.state.sliceDoc(from, context.pos-1)
           return textBefore
        }

        const tree = flow.getForAutocomplete()

        let fullPath;
        let word = context.matchBefore(/\w*/)
        let options = []

        const formatOption = (_id: string, object: any) => {
            return {
                label: _id,
                type: object._proto.type,
                info: `${object._proto.description ? ('💬: ' + object._proto.description + ' ') : ''}${object._proto.value ? `🧪: ${object._proto.value}` : ''}`,
                detail: object._proto.name ? '| ' + object._proto.name : undefined
            }
        }

        if(current.name == ".") {
            fullPath = resolvePath(current).split(".")
            const currentPath = (_.get(tree,fullPath))
            if(currentPath) {
                options = Object.keys(_.omit(currentPath,"_proto")).map(key => {
                    return formatOption(key, currentPath[key])
                })
            }
        }
        else {
            options = Object.keys(_.omit(tree,"proto")).map(key => {
                return formatOption(key, tree[key])
            })
        }

        
            
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
