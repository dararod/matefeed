import bcrypt from 'bcrypt';
import * as jsonWebToken from 'jsonwebtoken';

import { UserRepository } from './repository';
import { DomainError } from '../../infrastructure/error/DomainError';
import { getEnv } from '../../infrastructure/environment';

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
        'Must have at least one of the following symbol characters: #?!@$ %^&*-',
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

  public async login(
    userId: string,
    password: string,
  ): Promise<{ token: string; refreshToken: string; user: User }> {
    const user = await this.validateCredentials(userId, password);
    const { token, refreshToken } = this.signTokens(user);

    return {
      token,
      refreshToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        birthdate: user.birthdate,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  private signTokens(user: User) {
    return {
      token: jsonWebToken.sign(
        {
          id: user.id,
        },
        getEnv('JWT_SECRET'),
        {
          algorithm: 'HS256',
          audience: 'matefeed',
          issuer: 'matefeed',
          expiresIn: getEnv('JWT_TTL'),
        },
      ),
      refreshToken: jsonWebToken.sign({}, getEnv('JWT_SECRET'), {
        algorithm: 'HS256',
        audience: 'matefeed',
        issuer: 'matefeed',
        expiresIn: getEnv('JWT_REFRESH_TOKEN_TTL'),
      }),
    };
  }

  private async validateCredentials(
    userId: string,
    password: string,
  ): Promise<User> {
    const strategy = userId.includes('@') ? 'email' : 'username';
    const user = (await this.repository.findOne({
      [strategy]: userId,
    })) as User & { passwordHash: string };

    if (!user) {
      throw DomainError.withMessage('Invalid credentials.', 400);
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw DomainError.withMessage('Invalid credentials.', 400);
    }

    return user;
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

  public async findAll(): Promise<User[]> {
    return await this.repository.findAll();
  }

  public async findById(id: string): Promise<User> {
    return await this.repository.findOne({
      id,
    });
  }

  public async findByUsername(username: string): Promise<User[]> {
    const rows = await this.repository.findWhere({
      username,
    });

    return rows;
  }
}
