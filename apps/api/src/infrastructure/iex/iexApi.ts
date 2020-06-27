import { Response } from 'express'
import fetch from 'node-fetch'
import https from 'https'

export class IexSse {
    constructor(private token: string, private res: Response) { }

    public openStream = (symbols: string[]) => {
        https.get({
            agent: false,
            path: `/stable/stocksUSNoUTP1Minute?token=${this.token}&symbols=${symbols.join()}`,
            hostname: process.env.IEX_SSE
        }, res => {
            res.on('data', data => {
                this.res.write(`${data.toString()}\n\n`)
            })

            res.on('error', err => {
                console.log(err)
            })
        })
    }
}

const iexApi = async <T>(path: string): Promise<T> => (
    await fetch(`${process.env.IEX_URL}${path}${path.includes('?') ? '&' : '?'}token=${process.env.IEX_TOKEN}`).then((res) =>
        res.status < 300 ? res.json()
            : res.json().then((result) => Promise.reject(result))
    )
)

export default iexApi