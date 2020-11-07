import { useEffect, useState } from 'react'
import { db } from '../../config/firebase'

function useGetData() {
    const [docs, setDocs] = useState([])
    useEffect(() => {
        const collection = db.collection('contents')
        .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                let documents = []
                snapshot.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id})
                })
                setDocs(documents)
            })
            return () => collection();
    },[])
    return { docs }
}

export default useGetData
