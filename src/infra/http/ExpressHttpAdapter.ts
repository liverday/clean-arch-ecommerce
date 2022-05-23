import Http, { HttpInstance, HttpMethod, HttpRequest, HttpResponse } from "./Http";
import express, { Express } from 'express';

export default class ExpressHttpAdapter implements Http {
  readonly app: Express
  constructor() {
    this.app = express();

    this.app.use(express.json());
  }

  parsePath(path: string): string {
    return path.replace(/\{/g, ":").replace(/\}/g, "");
  }

  on(method: HttpMethod, path: string, callback: (request: HttpRequest) => Promise<HttpResponse>): void {
    this.app[method](this.parsePath(path), async (req, res) => {
      const { status, data } = await callback({
        query: req.query, 
        params: req.params, 
        body: req.body
      })
      return res.status(status).json(data)
    })
  }

  listen(port: number): HttpInstance {
    const server = this.app.listen(port)

    return {
      close: server.close
    }
  }
}