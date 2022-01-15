import bcrypt from 'bcrypt';

import { UserRepository } from './repository';
import { DomainError } from '../../infrastructure/error/DomainError';

import type { User } from './entity';
import type { RegisterUser } from './dto';

export class UserService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public static isValidEmail(email: string): void {
    if (
      email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      )
    ) {
      return;
    }

    throw DomainError.withMessage('The email has an invalid format');
  }

  public static isValidPassword(password: string): void {
    const errorMessages = [];

    if (
      password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      )
    ) {
      return;
    }

    if (!password.match(/^.{8,}$/)) {
      errorMessages.push('Must be at least 8 characters long');
    }

    if (!password.match(/(?=.*?[#?!@$ %^&*-]).{8,}/)) {
      errorMessages.push(
        'Must have at one of the following symbol characters: #?!@$ %^&*-',
      );
    }

    if (!password.match(/(?=.*?[0-9]).{8,}/)) {
      errorMessages.push('Must have at least one digit');
    }

    if (!password.match(/(?=.*?[a-z]).{8,}/)) {
      errorMessages.push('Must have at least one lowercase character');
    }

    if (!password.match(/(?=.*?[A-Z]).{8,}/)) {
      errorMessages.push('Must have at least one uppercase character');
    }

    throw DomainError.withMessage(
      "The password doesn't follows validation policies.",
    ).appendExtra('validations', errorMessages);
  }

  public static isValidUsername(username: string): void {
    if (username.match(/^[a-z0-9_-]{3,15}$/)) {
      return;
    }

    throw DomainError.withMessage('The username has an invalid format');
  }

  public async register(user: RegisterUser): Promise<User> {
    UserService.isValidEmail(user.email);
    UserService.isValidPassword(user.password);
    UserService.isValidUsername(user.username);

    const passwordHash = await bcrypt.hash(user.password, 10);
    const added = await this.repository.add({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      birthdate: new Date(user.birthdate),
      passwordHash,
    });

    return {
      id: added.id,
      firstName: added.firstName,
      lastName: added.lastName,
      email: added.email,
      username: added.username,
      birthdate: added.birthdate,
      createdAt: added.createdAt,
      updatedAt: added.updatedAt,
    };
  }
}
