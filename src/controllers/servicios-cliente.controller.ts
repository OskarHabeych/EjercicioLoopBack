import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Servicios,
  Cliente,
} from '../models';
import {ServiciosRepository} from '../repositories';

export class ServiciosClienteController {
  constructor(
    @repository(ServiciosRepository)
    public serviciosRepository: ServiciosRepository,
  ) { }

  @get('/servicios/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Servicios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Servicios.prototype.id,
  ): Promise<Cliente> {
    return this.serviciosRepository.destinoFk(id);
  }
}
