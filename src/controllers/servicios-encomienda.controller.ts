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
  Encomienda,
} from '../models';
import {ServiciosRepository} from '../repositories';

export class ServiciosEncomiendaController {
  constructor(
    @repository(ServiciosRepository)
    public serviciosRepository: ServiciosRepository,
  ) { }

  @get('/servicios/{id}/encomienda', {
    responses: {
      '200': {
        description: 'Encomienda belonging to Servicios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Encomienda)},
          },
        },
      },
    },
  })
  async getEncomienda(
    @param.path.string('id') id: typeof Servicios.prototype.id,
  ): Promise<Encomienda> {
    return this.serviciosRepository.encomiendaFk(id);
  }
}
