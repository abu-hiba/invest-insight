type DBVersionChangeEvent = IDBVersionChangeEvent & { target: { result: IDBDatabase } }

interface Payload<T = {}> {
    key: string,
    store: string,
    data?: T
}

const dbName = 'InvestInsight'

self.onmessage = (event: MessageEvent) => handleRequest(event)

const handleRequest = ({ data: { type, payload } }: MessageEvent) => {
    switch (type) {
        case 'add':
            saveToDB(payload)
        break
        case 'find':
            findInDB(payload)
        break
        case 'createStore':
            createStore(payload.store)
        break
        case 'delete':
            deleteFromDB(payload)
        break
    }
}

const createStore = (newStore: string) => {
    indexedDB.open(dbName)
        .onsuccess = (e) => {
            const event = e as DBVersionChangeEvent

            const db = event.target.result
            const version = db.version
            const upgradeNeeded = !db.objectStoreNames.contains(newStore)
            db.close()

            if (upgradeNeeded) {
                const req = indexedDB.open(dbName, version+1)

                req.onupgradeneeded = function (e) {
                    const event = e as DBVersionChangeEvent

                    const upgradeDB = event.target.result
                    upgradeDB.createObjectStore(newStore, { autoIncrement: true })
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