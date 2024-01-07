import Element from "./Element";
import Group from "./Group";

test("Group constructor", () => {
    const group = new Group("test")
    group.addChild(new Element({
        _id: 'test',
        type: 'test',
        rx: 0,
        
        

    })) // Modify the Element initialization to require an _id parameter
    console.log(group.toJSON())
});