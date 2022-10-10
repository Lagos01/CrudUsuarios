export interface IUsuario {
  correo: string;
  contrasena: string;
  nombre: string;
  direccion: string;
  estado: 'Activo' | 'Inactivo';
  tipo: 'Normal' | 'Admin';
  _id?: unknown;
};
