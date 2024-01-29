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

    
    calculate = () => {
        const loopStatement = this.get("loopStatement") as string
        const iteratorId = this.get("iteratorId") as string
        const iteratorIndex = this.get("iteratorIndex") as string
        if(!loopStatement || !iteratorId || !iteratorIndex) {
            return
        }
        try {
            const loopFunction = new Function(this.get("loopStatement") as string)
            const iterators = loopFunction.apply(this)
            iterators?.map((currentIterator: any, currentIndex: number) => {
                console.log('Iterating!');
                (this.parent.getRoot() as Flow).calculatedTree = _.set((this.parent.getRoot() as Flow).calculatedTree,iteratorId, currentIterator);
                (this.parent.getRoot() as Flow).calculatedTree = _.set((this.parent.getRoot() as Flow).calculatedTree,iteratorIndex, currentIndex);
                console.log((this.parent.getRoot() as Flow).calculatedTree)
                this.entities.map((child: Entity) => {
                    child.calculate()
                });
                (this.parent.getRoot() as Flow).calculatedTree = _.omit((this.parent.getRoot() as Flow).calculatedTree,[iteratorId, iteratorIndex]);    
            })
            
        }
        catch(e) {
            console.error(e)
        }
        
    }




    constructor(props: {
        _id?: string,
        type: typeof Entity
    }, parent?: Entity) {
        super(props,parent);
    }
}