import fetch from 'node-fetch'

const iexApi = async <T>(path: string): Promise<T> => (
    await fetch(`${process.env.IEX_URL}${path}?token=${process.env.IEX_TOKEN}`).then((res) =>
        res.status < 300 ? res.json()
            : res.json().then((result) => Promise.reject(result))
    )
)

export default iexApi