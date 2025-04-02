import { IResponseBody } from "../constants/types.js"

/**
 * @class Response
 * @description this is used generate the response
 */
class Response {
  private responseValue: IResponseBody = <IResponseBody>{}
  constructor(responseInfo: IResponseBody) {
    this.responseValue = { ...responseInfo }
  }

  get response(): IResponseBody {
    return this.responseValue
  }
}

class ResponseApi {
  private newResponse: IResponseBody = <IResponseBody>{}

  private statusCode(code: number): ResponseApi {
    this.newResponse.code = code
    return this
  }

  private message(msg: string): ResponseApi {
    this.newResponse.message = msg
    return this
  }

  private metaData(metadata: object = {}): ResponseApi {
    this.newResponse.metadata = metadata
    return this
  }

  private data(d: object = {}): ResponseApi {
    this.newResponse.data = d
    return this
  }

  public notFoundError(msg = 'Not found!', data = {}, metadata: object = {}): IResponseBody {
    this.statusCode(404).message(msg).metaData(metadata).data(data)
    return this.build()
  }

  public badRequest(msg = 'Invalid Request!', data = {}, metadata: object = {}): IResponseBody {
    this.statusCode(400).message(msg).metaData(metadata).data(data)
    return this.build()
  }


  public okSuccess(msg = 'Ok', data: object = {}, metadata: object = {}): IResponseBody {
    return this.statusCode(200).message(msg).data(data).metaData(metadata).build()
  }

  public createdSuccess(msg = 'Resource created!', data = {}, metadata = {}): IResponseBody {
    return this.statusCode(201).message(msg).metaData(metadata).data(data).build()
  }

  public unAuthorized(msg = 'Unauthorized', data = {}, metadata = {}): IResponseBody {
    return this.statusCode(401).message(msg).metaData(metadata).data(data).build()
  }

  private build(): IResponseBody {
    const response = new Response(this.newResponse).response
    this.newResponse = <IResponseBody>{}
    return response
  }
}

export const apiResponse = new ResponseApi()
