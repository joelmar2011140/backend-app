export interface IUser {
  firstName: string
  surname: string
  email: string
  phone: string
  bio: string
  addresses: IAddress[]
  socialNetworks: ISocialNetwork[]
}

export interface IUpdatedUser extends Partial<IUser> {}

interface IAddress {
  id?: string
  city: string
  state: string
}

interface ISocialNetwork {
  id?: string
  username?: string
  name?: string
  profileUrl?: string
  urlImage?: string
}
