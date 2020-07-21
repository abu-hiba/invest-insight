import express, { RequestHandler, Request, Response, NextFunction } from 'express'

export interface Endpoint {
    method: 'get' | 'put' | 'post' | 'patch' | 'delete',
    route: string,
    handler: RequestHandler,
}

class Router {
    public router = express.Router()

    constructor(public endpoints: Endpoint[]) {
       this.initialiseEndpoints(this.endpoints) 
    }

    public handleRequest = (handler: RequestHandler) => async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await handler(req, res, next)
            if (result !== undefined) {
                res.send(result)
            }
        } catch (error) {
            //req.log.error(error)
            next(error)
        }
    }

    public initialiseEndpoints = (endpoints: Endpoint[]) => {
        endpoints.forEach(({ method, route, handler }) => {
            this.router[method](
                route,
                this.handleRequest(handler)
            )
        })
    }
}

export default Router