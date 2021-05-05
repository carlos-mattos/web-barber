import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsertDTO from '@modules/users/dtos/ICreateUserDTO';
import { v4 as uuidv4 } from 'uuid';
import IFindAllProviders from '@modules/users/dtos/IFindAllProvidersDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAllProviders({
    except_id,
  }: IFindAllProviders): Promise<User[]> {
    let users = this.users;

    if (except_id) {
      users = this.users.filter(user => user.id !== except_id);
    }

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUsertDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuidv4(), email, name, password });

    this.users.push(user);

    return user;
  }
}

export default FakeUsersRepository;
