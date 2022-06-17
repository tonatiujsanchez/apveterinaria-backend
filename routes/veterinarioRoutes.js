import express from 'express'
import { 
    perfil, 
    registrar, 
    confirmar,
    autenticar } from '../controllers/veterinarioController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()


router.post('/', registrar)
router.get('/confirmar/:token', confirmar )
router.post('/login', autenticar )



router.get('/perfil',authMiddleware, perfil )



export default router