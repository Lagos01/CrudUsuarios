import {IUsuario, Usuario} from './index';

describe('Usuario Lib Unit Tests', ()=>{

  it( 'should Create an Instance of Usuario', ()=>{
      const usuarioInstance = new Usuario();
      expect(usuarioInstance).toBeDefined();
  });
  it(' should Add a new Usuario Item', ()=>{
      const usuarioInstance = new Usuario();
      const usuarioItem : IUsuario = {
        correo: 'User2312@gmail.com',
        contrasena: 'Usuario',
        nombre: 'Usuario',
        direccion: 'nn',
        estado: 'Inactivo',
        tipo: 'Normal',
      };
      const index = usuarioInstance.addUsuario(usuarioItem);
      expect(index).toBe(0);
  });
});
