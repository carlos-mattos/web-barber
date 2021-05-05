// define o formato dos dados para se criar um appointment

export default interface ICreateAppointmentDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}
