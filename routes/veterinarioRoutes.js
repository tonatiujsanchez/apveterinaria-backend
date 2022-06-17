import express from 'express'
import { 
    perfil, 
    registrar, 
    confirmar,
    autenticar, 
    olvidePassword,
    comprobarToken,
    nuevoPassword } from '../controllers/veterinarioController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// ÁREA PÚBLICA
router.post('/', registrar)
router.get('/confirmar/:token', confirmar )
router.post('/login', autenticar )
router.post('/olvide-password', olvidePassword ) // introduce su email

router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)
// router.get('/olvide-password/:token', comprobarToken ) // comprovar que sea un token valido
// router.post('/olvide-password/:token', nuevoPassword ) // Introduce una nuevo contraseña


// ÁREA PRIVADA
router.get('/perfil',authMiddleware, perfil )



export default router