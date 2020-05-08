const uri = process.env.API_URL

function iiApi<T, B>(
    method: string,
    path: string,
    data?: B,
    headers = new Headers
): Promise<T> {
    if (method === 'post' || method === 'put' || method === 'patch') {
        return fetch(`${uri}${path}`, {
            method: method.toUpperCase(),
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(data)
        }).then((res) =>
            res.status < 300 ? res.json()
                : res.json().then((result) => Promise.reject(result))
        )
    }
    
    return fetch(`${uri}${path}`).then((res) =>
        res.status < 300 ? res.json()
            : res.json().then((result) => Promise.reject(result))
    )
}

export default iiApi
