export interface IError {
  statusCode: number
  timestamp: string
  method: string
  message: string
}

export interface ISuccess {
  data?: any
  return: {
    status: number
    message: string
  }
}
