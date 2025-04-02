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
  gender?: 'Male' | 'Female' | undefined
  dob?: string | undefined
  fullName?: string | undefined
  profileImage?: string | undefined
}
