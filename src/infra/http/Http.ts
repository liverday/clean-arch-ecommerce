export type HttpMethod = "get" | "post" | "delete" | "put" | "patch"

export type HttpRequest = {
  query?: any,
  params?: any,
  body?: any
}

export type HttpResponse = {
  status: number,
  data: any
}

export interface HttpInstance {
  close(): void;
}

export default interface Http {
  app: any
  on(method: HttpMethod, path: string, callback: (request: HttpRequest) => Promise<HttpResponse>): void;
  listen(port: number): HttpInstance;
}

export const OK_RESPONSE = 200

export const CREATED_RESPONSE = 201