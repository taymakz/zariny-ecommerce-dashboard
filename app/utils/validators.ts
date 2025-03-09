export const emailRegex = /^\S[^\s@]*@\S[^\s.]*\.\S+$/
export const phoneRegex = /^(\+98|0)?9\d{9}$/
export const postalCodeRegex = /^\d{10}$/
export const nationalCodeRegex = /^\d{10}$/
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,18}$/
export const passwordLowercaseRegex = /[a-z]/
export const passwordUppercaseRegex = /[A-Z]/
export const passwordNumberRegex = /\d/
export const passwordLengthRegex = /^.{6,18}$/

export function passwordHasLowercase(password: string): boolean {
  return passwordLowercaseRegex.test(password)
}

export function passwordHasUppercase(password: string): boolean {
  return passwordUppercaseRegex.test(password)
}

export function passwordHasNumber(password: string): boolean {
  return passwordNumberRegex.test(password)
}

export function passwordIsValidPasswordLength(password: string): boolean {
  return passwordLengthRegex.test(password)
}

export function validatePassword(password: string): boolean {
  return passwordRegex.test(password)
}

export function validatePhoneNumber(phoneNumber: string): boolean {
  return phoneRegex.test(phoneNumber)
}

export function validateEmail(email: string): boolean {
  return emailRegex.test(email)
}

export function validateUsername(username: string): boolean {
  return phoneRegex.test(username) || emailRegex.test(username)
}

export function validatePostalCode(postalCode: string): boolean {
  return postalCodeRegex.test(postalCode)
}

export function validateNationalCode(nationalCode?: string): boolean {
  if (
    !nationalCode
    || nationalCode.length !== 10
    || !nationalCodeRegex.test(nationalCode)
  ) {
    return false
  }

  const check = Number.parseInt(nationalCode[9]!)
  let sum = 0

  for (let i = 0; i < 9; i++)
    sum += Number.parseInt(nationalCode[i]!) * (10 - i)

  const remainder = sum % 11

  return (
    (remainder < 2 && check === remainder)
    || (remainder >= 2 && check + remainder === 11)
  )
}
