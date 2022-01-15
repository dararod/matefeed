import { Type, Static } from '@sinclair/typebox';

export const RegisterUserDto = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  email: Type.String(),
  password: Type.String(),
  username: Type.String(),
  birthdate: Type.String(),
});

export type RegisterUser = Static<typeof RegisterUserDto>;
