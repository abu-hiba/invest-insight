import { Response } from 'express'
import fetch from 'node-fetch'
import https from 'https'
import { IncomingMessage } from 'http'

export class IexSse {
    private canWrite: boolean = false
    sse?: IncomingMessage

    constructor(private token: string, private res: Response) {
        this.res.socket.on('close', () => this.canWrite = false)
    }

    public openStream = (symbols: string[]) => {
        https.get({
            agent: false,
            path: `/stable/stocksUSNoUTP1Minute?token=${this.token}&symbols=${symbols.join()}`,
            hostname: process.env.IEX_SSE
        }, sse => {
            this.canWrite = true
            this.sse = sse

            this.sse.on('data', data => {
                this.canWrite && this.res.write(`${data.toString()}\n\n`)
            })

            this.sse.on('error', err => {
                console.log(err)
            })
        })
    }

    public closeStream = () => {
        this.canWrite = false
        this.sse?.destroy()
    }
}

const iexApi = async <T>(path: string): Promise<T> => (
    await fetch(`${process.env.IEX_URL}${path}${path.includes('?') ? '&' : '?'}token=${process.env.IEX_TOKEN}`).then((res) =>
        res.status < 300 ? res.json()
            : res.json().then((result) => Promise.reject(result))
    )
)

export default iexApi