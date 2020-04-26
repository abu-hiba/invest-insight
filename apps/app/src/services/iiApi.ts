const uri = process.env.HOST_URL

function iiApi<T, B>(
    method: string,
    path: string,
    data?: B,
    headers = new Headers
): Promise<T> {
    if (data) {
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
