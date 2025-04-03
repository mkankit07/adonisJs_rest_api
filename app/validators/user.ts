import vine from '@vinejs/vine'

export const userRegisterValidator = vine.compile(
  vine.object({
    mobileNumber: vine
      .string()
      .trim()
      .minLength(10)
      .regex(/^([+]\d{2})?\d{10}$/),
    role: vine.enum(['USER', 'ADMIN']).optional(),
  })
)

export const userLoginValidator = vine.compile(
  vine.object({
    mobileNumber: vine
      .string()
      .trim()
      .minLength(10)
      .regex(/^([+]\d{2})?\d{10}$/),
    otp: vine.string().trim().regex(/\d{6}/),
  })
)

export const userUpdateValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(3).optional(),
    dob: vine
      .date({ formats: ['YYYY-MM-DD'] })
      .optional()
      .transform((x) => x.toString()),
    gender: vine.enum(['Male', 'Female']).optional(),
    profileImage: vine.string().optional(),
  })
)
