class Flow {
    private configurations: {
        _id?: string,
        name?: string,
        type?: string,
        defaultValue?: string,
        sampleValue?: string,
    }[]
    private datasets: {
        _id?: string,
        name?: string
    }[]
    private calculations: {
        _id?: string,
        formula?: string
    }[]
    private components: {
        _id?: string,
        name?: string,
    }[]
    private layers: {
        _id?: string,
        name?: string,
        backgroundColor?: string,
        opacity? : string,
        elements: {
            
        }
    }[]
    
        

    constructor() {
        this._flow = [];
    }
    get flow() {
        return this._flow;
    }
    set flow(flow) {
        this._flow = flow;
    }
    addFlow(flow) {
        this._flow.push(flow);
    }
    getFlow() {
        return this._flow;
    }
}