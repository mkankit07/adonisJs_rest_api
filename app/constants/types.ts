export interface IResponseBody {
  code: number
  message: string
  data?: object
  metadata?: object
}

export type registerUser = {
  phone_number: string
}

export type updateUser = {
  gender?: string
  dob?: string
  fullName?: string
  profileImage?: string
}
