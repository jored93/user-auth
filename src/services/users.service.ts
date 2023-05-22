import { Service } from 'typedi';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { getRepository } from 'typeorm';
import { User } from '@entities/user.entity';
import { JWTService } from '@services/jwt.service';
import { AuthInterface, UserInterface } from '@interfaces';

import { OptionQuery } from 'src/queries/option.query';
import { QueryService } from '@services/query.service';

@Service()
export class UsersService {
  constructor(
    private readonly jwtService: JWTService,
    private queryService: QueryService
  ) {}

  private readonly userRepository = getRepository<User>(User);

  comparePassword(input: AuthInterface.IComparePasswordInput): boolean {
    const { password, userPassword } = input;
    return compareSync(password, userPassword);
  }

  generateToken(user: User) {
    return this.jwtService.createJWT(user);
  }

  hashPassword(password: string): string {
    return hashSync(password, genSaltSync());
  }

  hashUserPassword(user: User): void {
    user.password = this.hashPassword(user.password);
  }

  listUsers() {
    return this.userRepository.find();
  }

  findAll(query: OptionQuery, where?: any) {
    return this.queryService.paginate(this.userRepository, query, where);
  }

  showUser(id: string) {
    return this.userRepository.findOne(id);
  }

  createUser(user: User) {
    this.hashUserPassword(user);
    return this.userRepository.insert(user);
  }

  editUser(input: UserInterface.IEditUserInput) {
    const { id, user } = input;
    return this.userRepository.update(id, user);
  }

  deleteUser(id: string) {
    return this.userRepository.delete(id);
  }
}
