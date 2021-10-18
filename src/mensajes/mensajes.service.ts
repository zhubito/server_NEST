import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { Mensaje } from './entities/mensaje.entity';

@Injectable()
export class MensajesService {
  constructor(
    @InjectRepository(Mensaje)
    private readonly mensajeRepository: Repository<Mensaje>,
  ) {}

  async getAll(): Promise<Mensaje[]> {
    return await this.mensajeRepository.find();
  }

  async createMensaje(mensajeNuevo: CreateMensajeDto): Promise<Mensaje> {
    const nuevoMensaje = new Mensaje();
    nuevoMensaje.mensaje = mensajeNuevo.mensaje;
    nuevoMensaje.nick = mensajeNuevo.nick;

    return this.mensajeRepository.save(nuevoMensaje);
  }

  async updateMensaje(
    idMensaje: number,
    mensajeActualizar: CreateMensajeDto,
  ): Promise<Mensaje> {
    const mensajeUpdate = await this.mensajeRepository.findOne(idMensaje);
    mensajeUpdate.nick = mensajeActualizar.nick;
    mensajeUpdate.mensaje = mensajeActualizar.mensaje;

    return await this.mensajeRepository.save(mensajeUpdate);
  }

  async deleteMensaje(idMensaje: number): Promise<any> {
    return await this.mensajeRepository.delete(idMensaje);
  }
}
