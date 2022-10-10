import { Router} from 'express';

import UsuarioRouter  from './Usuarios';

const router  = Router();

// http://localhost:3001/usuario/byindex/1
router.use('/usuario', UsuarioRouter);

export default router;
