import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { year, day, month } = request.query;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      year: Number(year),
      day: Number(day),
      month: Number(month),
    });

    return response.json(classToClass(appointments));
  }
}
