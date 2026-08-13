export interface IEmpleado {
  EMPId: number;
  EMPNombre: string;
  EMPDPI: string;
  EMPPassword: string;
  EMPFechaCreacion: Date;
  EMPFechaModificacion?: Date | null;
  EMPEstado: boolean;
}
