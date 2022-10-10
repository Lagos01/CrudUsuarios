import {Router} from 'express';
import { IUsuario, Usuario } from '@server/libs/Usuario';
import { commonValidator, validateInput } from '@server/utils/validator';

const router = Router();
const usuarioInstance = new Usuario();

router.get('/', async (_req, res)=>{
  try {
    res.json(await usuarioInstance.getAllUsuario());
  } catch (ex) {
    console.error(ex);
    res.status(503).json({error:ex});
  }
});

router.get('/byindex/:index', async (req, res) => {
  try {
    const { index } = req.params;
    res.json(await usuarioInstance.getUsuarioByIndex(+index));
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({'msg': 'Error al obtener Registro'});
  }
});

router.post('/testvalidator', async (req, res)=>{
  const { email } = req.body;
  const validateEmailSchema = commonValidator.email;
  validateEmailSchema.param="email";
  validateEmailSchema.required =true;
  validateEmailSchema.customValidate = (values)=> {return values.includes('unicah.edu');}
  const errors = validateInput({email}, [validateEmailSchema]);
  if(errors.length > 0){
    return res.status(400).json(errors);
  }
  return res.json({email});
});

router.post('/new', async (req, res)=>{
  try {
    const newUsuario = req.body as unknown as IUsuario;
    //VALIDATE

    const newUsuarioIndex = await usuarioInstance.addUsuario(newUsuario);
    res.json({newIndex: newUsuarioIndex});
  } catch (error) {
    res.status(500).json({error: (error as Error).message});
  }
});

router.put('/update/:index', async (req, res)=>{
  try {
    const { index } = req.params;
    const UsuarioFromForm = req.body as IUsuario;
    await usuarioInstance.updateUsuario(+index, UsuarioFromForm);
    res.status(200).json({"msg":"Registro Actualizado"});
  } catch(error) {
    res.status(500).json({error: (error as Error).message});
  }
});

router.delete('/delete/:index', (req, res)=>{
  try {
    const { index } = req.params;
    if (usuarioInstance.deleteUsuario(+index)) {
      res.status(200).json({"msg": "Registro Eliminado"});
    } else {
      res.status(500).json({'msg': 'Error al eliminar Registro'});
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({'msg': 'Error al eliminar Registro'});
  }
});


export default router;
