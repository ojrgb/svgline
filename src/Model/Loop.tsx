import { BsGearFill } from "Components/Icons/Icons";
import Attribute from "./Attribute";
import Entity from "./Entity";
import EntityList from "./EntityList";
import Group from "./Group";
import Flow from "./Flow";
import _ from "lodash";

@Entity.Configure({
    nameSingle: 'Loop',
    namePlural: 'Loops',
    shortName: 'loop',
    formAttributes: [
        '_id',
        'loopStatement',
        'iteratorId',
        'iteratorIndex',      
        'arrayId',
    ],
    icon: BsGearFill,
})
export default class Loop<T extends Entity> extends Group<T> {
        
    loopStatement: Attribute = this.newAttribute({
        _id: 'loopStatement',
        name: 'Loop Statement',
        type: 'calculation',
        mandatory: true,
    });

    iteratorId: Attribute = this.newAttribute({
        _id: 'iteratorId',
        name: 'Iterator Id',
        type: 'string',
        mandatory: true,
    });

    iteratorIndex: Attribute = this.newAttribute({
        _id: 'iteratorIndex',
        name: 'Iterator Index',
        type: 'string',
        mandatory: true,
    });

    arrayId: Attribute = this.newAttribute({
        _id: 'arrayId',
        name: 'Array Id',
        type: 'string',
        mandatory: true,
    });

    
    compute = () => {
        // Perform calculation for the loop
        const loopStatement = this.get("loopStatement") as string
        const iteratorId = this.get("iteratorId") as string
        const iteratorIndex = this.get("iteratorIndex") as string
        const arrayId = this.get("arrayId") as string

        // Check if loop statement and iterator values are present
        if(!loopStatement || !iteratorId || !iteratorIndex || !arrayId) {
            return
        }

        try {
            const calculatedTree = this.getCalculatedTree()

            // Create function statement for loop calculation
            const functionStatement = `const {configurations, calculations, datasets, components} = this;
                ${calculatedTree.iterator!==undefined && Object.keys(calculatedTree.iterator).map((iteratorId: string) => {
                    return `const ${iteratorId} = this.iterator.${iteratorId};`
                }).join('\n')}
                return ${this.get("loopStatement") as string}`

            // Create loop function
            const loopFunction = new Function(functionStatement)

            // Apply loop function to calculated tree
            const iterators = loopFunction.apply(calculatedTree)

            const root = this.getRoot()

            // Compute entities within the loop
            const res = this.entities.map((entity,entityi) => {
                const arrayResult = iterators?.map((currentIterator: any, currentIndex: number) => {
                    root.setIterator(iteratorId, currentIterator)
                    root.setIterator(iteratorIndex, currentIndex)
                    root.setIterator(arrayId, iterators)
                    const r = entity.compute()
                    root.removeIterator()
                    return r
                })
                return {[entity.get("_id") as string]: arrayResult}
            }).reduce((acc,cur) => { 
                return {...acc, ...cur}
            },{})

            // Return with the object type
            return Object.assign({},res,{objectType: 'loop'})
        }
        catch(e) {
            console.error(e)
        }
    }
        
    calculate = () => {
        this.getRoot().mergeCalculatedTree(this.path,this.compute())
    }
        

    // get = (attributeId: string): any => {
    //     if(attributeId) {
    //         let attr = this[attributeId]
    //         if(attr instanceof Attribute) {
    //             return attr.get()
    //         }
    //         else {
    //             return attr
    //         }
    //     }
    //     else {
    //         return {
    //             entities: this.entities.map((e: Entity) => e.get()),
    //             id: this._id,
    //             type: this.type,
    //         }
    //     }
    // }



    constructor(props: {
        _id?: string,
        EntityType: typeof Entity,
        entities: T[]
    }, parent?: Entity) {
        super(props,parent);
    }

    
}