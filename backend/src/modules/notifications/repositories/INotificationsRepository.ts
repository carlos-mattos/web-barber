import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(date: ICreateAppointmentDTO): Promise<Notification>;
}
