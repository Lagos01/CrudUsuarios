import { getConnection } from "@models/sqlite/SqliteConn";
import { UsuarioDao } from "@server/dao/models/sqlite/UsuarioDao";
export interface IUsuario {
  correo: string;
  contrasena: string;
  nombre: string;
  direccion: string;
  estado: 'Activo' | 'Inactivo';
  tipo: 'Normal' | 'Admin';
  _id?: unknown;
};
export class Usuario {
  private dao: UsuarioDao;
  public constructor(){
    getConnection()
      .then(conn=>{
        this.dao = new UsuarioDao(conn);
      })
      .catch(ex=>console.error(ex));
  }
  // Consultas
  public getAllUsuario() {
    return this.dao.getUsuarios()
  }
  public getUsuarioByIndex( index:number) {
      return this.dao.getUsuarioById({_id:index});
  }

  public addUsuario( usuario:IUsuario) {
    return this.dao.insertNewUsuario(usuario);
  }
  public updateUsuario( index:number, usuario:IUsuario){
   return this.dao.update({_id:index}, usuario);
  }
  public deleteUsuario( index:number) {
    return this.dao.deleteUsuario({_id:index});
  }
}
