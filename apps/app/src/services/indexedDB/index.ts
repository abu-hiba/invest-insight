import idbWorker = require("worker-loader?name=dist/[name].js!./idbWorker")

export default class IndexedDBWorker {
    private worker: Worker
    
    constructor() {
        this.worker = new idbWorker
        this.initWorker()
    }

    public initWorker = () => {
        this.worker.onmessage = e => console.log(e.data)
    }

    public save = (payload: Object) => {
        this.worker.postMessage({ type: 'add', payload })
    }

    public find = (payload: Object) => {
        this.worker.postMessage({ type: 'find', payload })
    }

    public createStore = (store: string) => {
        this.worker.postMessage({ type: 'createStore', payload: { store } })
    }
}
