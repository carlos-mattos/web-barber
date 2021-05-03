import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeUserTokensReposiotry from '../repositories/fakes/FakeUserTokensReposiotry';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensReposiotry;
let resetPassword: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensReposiotry();
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const userToken = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      password: 'nova-senha',
      token: userToken.token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('nova-senha');
  });
});
