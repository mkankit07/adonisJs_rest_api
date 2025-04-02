export interface IresponseBody {
  code: number
  message: string
  data?: object
  metadata?: object
}

export type RegisterUser = {
  phone_number: string
}

export type UpdateUser = {
  gender?: string
  dob?: string
  fullName?: string
  profileImage?: string
}
