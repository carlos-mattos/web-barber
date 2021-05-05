import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProvidersMonthAvailabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.params.provider_id;
    const { month, year } = request.body;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService
    );

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availability);
  }
}
