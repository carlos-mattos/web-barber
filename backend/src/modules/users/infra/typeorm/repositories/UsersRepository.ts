import User from '../entities/User';
import { getRepository, Not, Repository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsertDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProviders from '@modules/users/dtos/IFindAllProvidersDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllProviders({
    except_id,
  }: IFindAllProviders): Promise<User[]> {
    let users: User[];

    if (except_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUsertDTO): Promise<User> {
    const appointment = this.ormRepository.create({ email, name, password });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default UsersRepository;
