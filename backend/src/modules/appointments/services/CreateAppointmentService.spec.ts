import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 5, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      user_id: 'user-id',
      date: new Date(2021, 4, 5, 13),
      provider_id: 'provider-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2021, 4, 7, 17);

    await createAppointment.execute({
      user_id: 'user-id',
      date: appointmentDate,
      provider_id: 'provider-id',
    });

    await expect(
      createAppointment.execute({
        user_id: 'user-id',
        date: appointmentDate,
        provider_id: 'provider-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 5, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        user_id: 'user-id',
        date: new Date(2021, 4, 5, 11),
        provider_id: 'provider-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment whit myself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 5, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        user_id: 'user-id',
        date: new Date(2021, 4, 5, 13),
        provider_id: 'user-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an before 8 or after 17', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 5, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        user_id: 'user-id',
        date: new Date(2021, 4, 6, 7),
        provider_id: 'provider-id',
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        user_id: 'user-id',
        date: new Date(2021, 4, 6, 18),
        provider_id: 'provider-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
