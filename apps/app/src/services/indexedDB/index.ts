import idbWorker = require("worker-loader?name=dist/[name].js!./idbWorker")

interface Payload<T = {}> {
    key: string,
    store: string,
    data?: T
}

export default class IndexedDBWorker {
    private worker: Worker
    public data: any
    
    constructor() {
        this.worker = new idbWorker
        this.initWorker()
    }

    public initWorker = () => {
        this.createStore('markets')
        
        this.worker.onmessage = e => {
            this.data = e.data
        }
    }

    public save = <T>(payload: Payload<T>) => {
        this.worker.postMessage({ type: 'add', payload })
    }

    public find = (payload: Payload) => {
        this.worker.postMessage({ type: 'find', payload })
        
        return new Promise((resolve, reject) => {
            this.worker.onmessage = ({ data: { data, date } }) => {
                const ageInHrs = (Date.now() - date) / (1000 * 60 * 60)

                if (ageInHrs > 24) {
                    this.delete(payload)
                    reject(`${payload.key} needs to be updated`)
                }

                data && data != 'Key not found'
                    ? resolve(data)
                    : reject(`${payload.key} not found in ${payload.store}`)
            }
        })
    }

    public createStore = (store: string) => {
        this.worker.postMessage({ type: 'createStore', payload: { store } })
    }

    public delete = (payload: Payload) => {
        this.worker.postMessage({ type: 'delete', payload })
    }
}
