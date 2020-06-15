type DBVersionChangeEvent = IDBVersionChangeEvent & { target: { result: IDBDatabase } }

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
    }
}

const createStore = (newStore: string) => {
    indexedDB.open(dbName)
        .onsuccess = (e) => {
            const event = e as DBVersionChangeEvent

            const db = event.target.result
            const version = db.version
            db.close()

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

const saveToDB = ({ store, key, data }: { store: string, key: string, data: any }) => {
    indexedDB.open(dbName)
        .onsuccess = e => {
            const event = e as DBVersionChangeEvent

            const db = event.target.result

            const req = db
                .transaction([store], 'readwrite')
                .objectStore(store)
                .add(data, key)

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

const findInDB = ({ store, key }: { store: string, key: string }) => {
    indexedDB.open(dbName)
        .onsuccess = e => {
            const event = e as DBVersionChangeEvent

            const db = event.target.result

            const findReq = db
                .transaction([store])
                .objectStore(store)
                .get(key)

            findReq.onsuccess = () => {
                self.postMessage(findReq.result)
                db.close()
            }
            findReq.onerror = () => {
                self.postMessage('Key not found')
                db.close()
            }
        }
}