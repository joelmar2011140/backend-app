import Joi from 'joi'
import type { IUser } from './users.types'

export const validateCreateUser = Joi.object<IUser>({
  firstName: Joi.string().required().empty().messages({
    'any.required': 'Please insert your first name',
    'string.base': 'Please insert your first name',
    'string.empty': 'Please insert your first name'
  }),
  surname: Joi.string().required().empty().messages({
    'any.required': 'Please insert your surname',
    'string.base': 'Please insert your surname',
    'string.empty': 'Please insert your surname'
  }),
  email: Joi.string().required().email().empty().messages({
    'any.required': 'Please insert your email',
    'string.base': 'Please insert your email',
    'string.empty': 'Please insert your email',
    'string.email': 'Please insert a valid email'
  }),
  phone: Joi.string().required().empty().messages({
    'any.required': 'Please insert your phone number',
    'string.base': 'Please insert your phone number',
    'string.empty': 'Please insert your phone number'
  }),
  bio: Joi.string().empty().messages({
    'any.required': 'Please insert your bio',
    'string.base': 'Please insert your bio',
    'string.empty': 'Please insert your bio'
  }),
  addresses: Joi.array().required().messages({
    'any.required': 'Insert your address',
    'array.base': 'Insert a valid addres'
  }).items(Joi.object({
    city: Joi.string().required().empty().messages({
      'any.required': 'Please insert your city',
      'string.base': 'Please insert your city',
      'string.empty': 'Please insert your city'
    }),
    state: Joi.string().empty().messages({
      'any.required': 'Please insert your state',
      'string.base': 'Please insert your state',
      'string.empty': 'Please insert your state'
    })
  })),
  socialNetworks: Joi.array().required().messages({
    'any.required': 'Insert your social networks',
    'array.base': 'Insert a valid sociail network'
  }).items(Joi.object({
    username: Joi.string().empty().messages({
      'any.required': 'Please insert your username',
      'string.base': 'Please insert your username',
      'string.empty': 'Please insert your username'
    }),
    name: Joi.string().required().empty().messages({
      'any.required': 'Please insert your name',
      'string.base': 'Please insert your name',
      'string.empty': 'Please insert your name'
    }),
    profileUrl: Joi.string().required().empty().messages({
      'any.required': 'Please insert your profile url',
      'string.base': 'Please insert your profile url',
      'string.empty': 'Please insert your profile url'
    }),
    urlImage: Joi.string().required().empty().messages({
      'any.required': 'Please insert your profile image',
      'string.base': 'Please insert your profile image',
      'string.empty': 'Please insert your profile image'
    })
  }))
})

export const validateUpdateUser = Joi.object<IUser>({
  firstName: Joi.string().empty().messages({
    'any.required': 'Please insert your first name',
    'string.base': 'Please insert your first name',
    'string.empty': 'Please insert your first name'
  }),
  surname: Joi.string().empty().messages({
    'any.required': 'Please insert your surname',
    'string.base': 'Please insert your surname',
    'string.empty': 'Please insert your surname'
  }),
  email: Joi.string().email().empty().messages({
    'any.required': 'Please insert your email',
    'string.base': 'Please insert your email',
    'string.empty': 'Please insert your email',
    'string.email': 'Please insert a valid email'
  }),
  phone: Joi.string().empty().messages({
    'any.required': 'Please insert your phone number',
    'string.base': 'Please insert your phone number',
    'string.empty': 'Please insert your phone number'
  }),
  bio: Joi.string().empty().messages({
    'any.required': 'Please insert your bio',
    'string.base': 'Please insert your bio',
    'string.empty': 'Please insert your bio'
  }),
  addresses: Joi.array().items(Joi.object({
    id: Joi.string().empty().messages({
      'any.required': 'Please insert the address',
      'string.base': 'Please insert the address',
      'string.empty': 'Please insert the address'
    }),
    city: Joi.string().empty().messages({
      'any.required': 'Please insert your city',
      'string.base': 'Please insert your city',
      'string.empty': 'Please insert your city'
    }),
    state: Joi.string().empty().messages({
      'any.required': 'Please insert your state',
      'string.base': 'Please insert your state',
      'string.empty': 'Please insert your state'
    })
  })),
  socialNetworks: Joi.array().items(Joi.object({
    id: Joi.string().empty().messages({
      'any.required': 'Please insert the social network',
      'string.base': 'Please insert the social network',
      'string.empty': 'Please insert the social network'
    }),
    username: Joi.string().empty().messages({
      'any.required': 'Please insert your username',
      'string.base': 'Please insert your username',
      'string.empty': 'Please insert your username'
    }),
    name: Joi.string().empty().messages({
      'any.required': 'Please insert your name',
      'string.base': 'Please insert your name',
      'string.empty': 'Please insert your name'
    }),
    profileUrl: Joi.string().empty().messages({
      'any.required': 'Please insert your profile url',
      'string.base': 'Please insert your profile url',
      'string.empty': 'Please insert your profile url'
    }),
    urlImage: Joi.string().empty().messages({
      'any.required': 'Please insert your profile image',
      'string.base': 'Please insert your profile image',
      'string.empty': 'Please insert your profile image'
    })
  }))
})
