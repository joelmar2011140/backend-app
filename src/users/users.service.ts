import { usersPrisma } from './users.prisma'
import type { ISuccess } from '../utils/global.types'
import { NotFound, Conflict, ServiceUnavailable } from 'http-errors'
import type { IUpdatedUser, IUser } from './users.types'
import { prismaClient } from '../lib/prisma'

export async function getMyAwesomeApplicant (): Promise<ISuccess> {
  const usuario = await usersPrisma.findUnique({ where: { email: 'joeldeveloper2011140@gmail.com' }, include: { addresses: true, SocialNetwork: true } })
  if (usuario == null) {
    throw new NotFound('OOOpssssss no info for me ...')
  }
  return {
    data: usuario,
    return: {
      message: 'User returned',
      status: 200
    }
  }
}

export async function createUser (params: IUser): Promise<ISuccess> {
  const usuarioExists = await usersPrisma.findUnique({ where: { email: params.email } })
  if (usuarioExists != null) {
    throw new Conflict('User already registerd')
  }
  const user = await usersPrisma.create({
    data: {
      email: params.email,
      firstName: params.firstName,
      phone: params.phone,
      surname: params.surname,
      bio: params.bio,
      addresses: { create: params.addresses.map(add => ({ city: add.city, state: add.state })) },
      SocialNetwork: { create: params.socialNetworks.map(social => ({ profileUrl: social.profileUrl as string, urlImage: social.urlImage as string, name: social.name as string, username: social.username as string })) }
    }
  })
  if (user == null) {
    throw new ServiceUnavailable('User not registered , try later')
  }
  return {
    data: user,
    return: {
      message: 'User created',
      status: 201
    }
  }
}

export async function getAUser (id: string): Promise<ISuccess> {
  const usuarioExists = await usersPrisma.findUnique({ where: { id } })
  if (usuarioExists == null) {
    throw new NotFound('User not found')
  }
  return {
    data: usuarioExists,
    return: {
      message: 'User retorned',
      status: 200
    }
  }
}

export async function deleteAUser (id: string): Promise<ISuccess> {
  const usuarioExists = await usersPrisma.findUnique({ where: { id } })
  if (usuarioExists == null) {
    throw new NotFound('User not found')
  }
  const userDeleted = await usersPrisma.delete({ where: { id }, include: { addresses: true, SocialNetwork: true } })
  await prismaClient.socialNetwork.deleteMany({ where: { userId: usuarioExists.id } })
  await prismaClient.address.deleteMany({ where: { userId: usuarioExists.id } })
  if (userDeleted == null) {
    throw new ServiceUnavailable('User not deleted , try later')
  }

  return {
    data: userDeleted,
    return: {
      message: 'User deleted',
      status: 200
    }
  }
}

export async function updatedAUser (id: string, params: IUpdatedUser): Promise<ISuccess> {
  const usuarioExists = await usersPrisma.findUnique({ where: { id }, include: { addresses: true, SocialNetwork: true } })
  if (usuarioExists == null) {
    throw new NotFound('User not found')
  }
  // Check if some address is issued
  if (params.addresses != null) {
    for (const add of params.addresses) {
      if (add.id == null) {
        await prismaClient.address.create({ data: { userId: usuarioExists.id, city: add.city, state: add.state } })
      } else {
        await prismaClient.address.update({ where: { id: add.id }, data: { ...add } })
      }
    }
  }
  // Check if some social network is issued
  if (params.socialNetworks != null) {
    for (const social of params.socialNetworks) {
      if (social.id == null) {
        await prismaClient.socialNetwork.create({ data: { userId: usuarioExists.id, profileUrl: social.profileUrl as string, name: social.name as string, urlImage: social.urlImage as string, username: social.username as string } })
      } else {
        await prismaClient.socialNetwork.update({ where: { id: social.id }, data: { ...social } })
      }
    }
  }
  const userUpdated = await usersPrisma.update({
    where: { id: usuarioExists.id },
    data: {
      bio: (params?.bio != null) ? params.bio : usuarioExists.bio,
      email: (params?.email != null) ? params.email : usuarioExists.email,
      firstName: (params?.firstName != null) ? params.firstName : usuarioExists.firstName,
      surname: (params?.surname != null) ? params.surname : usuarioExists.surname,
      phone: (params?.phone != null) ? params.phone : usuarioExists.phone
    }
  })
  if (userUpdated == null) {
    throw new ServiceUnavailable('User not updated , try later')
  }
  return {
    return: {
      message: 'User updated',
      status: 201
    }
  }
}
