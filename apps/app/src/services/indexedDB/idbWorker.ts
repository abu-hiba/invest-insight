type DBVersionChangeEvent = IDBVersionChangeEvent & { target: { result: IDBDatabase } }
type DBRequest = 'add' | 'find' | 'createStore' | 'delete' 

interface Payload<T = {}> {
    key: string,
    store: string,
    data?: T
    newStores: string[]
}

const dbName = 'InvestInsight'

self.onmessage = (event: MessageEvent) => {
    const { data: { type, payload } } = event
    handleRequest(type, payload)
}

const handleRequest = (type: DBRequest, payload: Payload) => {
    switch (type) {
        case 'add':
            saveToDB(payload)
        break
        case 'find':
            findInDB(payload)
        break
        case 'createStore':
            createStore(payload.newStores)
        break
        case 'delete':
            deleteFromDB(payload)
        break
    }
}

const createStore = (stores: string[]) => {
    indexedDB.open(dbName)
        .onsuccess = (e) => {
            const event = e as DBVersionChangeEvent

            const db = event.target.result
            const version = db.version

            const newStores = stores.filter(store =>
                !db.objectStoreNames.contains(store)
            )
            db.close()

            if (newStores.length) {
                const req = indexedDB.open(dbName, version+1)

                req.onupgradeneeded = function (e) {
                    const event = e as DBVersionChangeEvent

                    const upgradeDB = event.target.result
                    newStores.forEach(newStore => {
                        upgradeDB.createObjectStore(newStore, { autoIncrement: true })
                    })
                }

                req.onsuccess = () => {
                    self.postMessage('DB upgraded')
                    event.target.result.close()
                }
                req.onerror = () => {
                    self.postMessage('DB upgrade error')
                    event.target.result.close()
                }
            }
        }
}

const saveToDB = <T>({ store, key, data }: Payload<T>) => {
    indexedDB.open(dbName)
        .onsuccess = e => {
            const event = e as DBVersionChangeEvent
            const db = event.target.result

            const req = db
                .transaction([store], 'readwrite')
                .objectStore(store)
                .add({ data, date: Date.now() }, key)

            req.onsuccess = () => {
                self.postMessage(`Successfully added to ${store}`)
                db.close()
            }
            req.onerror = () => {
                self.postMessage(`Error adding to ${store}`)
                db.close()
            }
        }
}

const findInDB = ({ store, key }: Payload) => {
    indexedDB.open(dbName)
        .onsuccess = e => {
            const event = e as DBVersionChangeEvent
            const db = event.target.result

            const req = db
                .transaction([store])
                .objectStore(store)
                .get(key)

            req.onsuccess = () => {
                req.result
                    ? self.postMessage(req.result)
                    : self.postMessage('Key not found') 
                db.close()
            }
            req.onerror = () => {
                self.postMessage('Key not found')
                db.close()
            }
        }
}

const deleteFromDB = ({ store, key }: Payload) => {
    indexedDB.open(dbName)
        .onsuccess = e => {
            const event = e as DBVersionChangeEvent
            const db = event.target.result

            const req = db
                .transaction([store], 'readwrite')
                .objectStore(store)
                .delete(key)

            req.onsuccess = () => {
                self.postMessage(`${key} deleted from ${store}`)
                db.close()
            }
            req.onerror = () => {
                self.postMessage(`Error deleting ${key} from ${store}`)
                db.close()
            }
        }
}