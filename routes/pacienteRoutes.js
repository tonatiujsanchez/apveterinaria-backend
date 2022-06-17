import express from 'express'
import { 
    agregarPaciente, 
    obtenerPacientes } from '../controllers/pacienteController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router
    .route('/')
    .post(authMiddleware, agregarPaciente)
    .get(authMiddleware, obtenerPacientes)



export default router