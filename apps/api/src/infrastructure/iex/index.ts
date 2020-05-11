const { IEX_URL, IEX_TOKEN } = process.env

const iexApi = async <T>(path: string): Promise<T> =>
    await fetch(`${IEX_URL}${path}?token=${IEX_TOKEN}`).then((res) =>
        res.status < 300 ? res.json()
            : res.json().then((result) => Promise.reject(result))
    )

export default iexApi