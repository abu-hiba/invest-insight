import React, { ReactNode, useState, useEffect, useContext, createContext } from 'react'
import IndexedDBWorker from '../services/indexedDB'

const IDBContext = createContext<IndexedDBWorker | undefined>(undefined)

export const ProvideIDB: React.FC<{ children: ReactNode }> = ({ children }) => {
    const db = useProvideIDB() 
    return (
        <IDBContext.Provider value={db}>
            {children}
        </IDBContext.Provider>
    )
}

export const useIDB = () => useContext(IDBContext)

const useProvideIDB = () => {
    const [db, setDb] = useState<IndexedDBWorker>()

    useEffect(() => {
       setDb(new IndexedDBWorker(['markets', 'sectors', 'exchanges'])) 
    }, [])

    return db
}