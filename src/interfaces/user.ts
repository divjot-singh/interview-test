export interface User {
  id?: number
  name: string
  phone: string
  website: string
  company?: Company
  address?: Address
}

export interface Address {
  street: string
  suite: string
  zipcode: string
  geo?: {
    lat: string
    lng: string
  }
  city: string
}

export interface Company {
  bs: string
  catchPhrase: string
  name: string
}
