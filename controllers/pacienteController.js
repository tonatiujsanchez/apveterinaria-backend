import mongoose from "mongoose";
import Paciente from "../models/Paciente.js";



const agregarPaciente = async(req, res) => {

    const paciente = new Paciente(req.body)
    paciente.veterinario = req.veterinario._id

    try {
        const pacienteGuardado = await paciente.save()
        res.json(pacienteGuardado)

    } catch (error) {
        console.log(error)
    }

}


const obtenerPacientes = async(req, res) => {

    try {
        const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario)
        res.json(pacientes)
    } catch (error) {
        console.log(error)
    }

}

// 
const obtenerPaciente = async(req, res) => {
    const { idPaciente } = req.params

    if (!mongoose.Types.ObjectId.isValid(idPaciente)) {
        const error = new Error('Id no válido');
        return res.status(403).json({ msg: error.message });
    }

    const paciente = await Paciente.findById(idPaciente)

    if(!paciente){
        const error = new Error('Paciente no encontrado')
        return res.status(404).json({ msg: error.message })
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        const error = new Error('Acción no valida')
        return res.status(404).json({ msg: error.message })
    }
   
    res.json(paciente)
    
}


const actualizarPaciente = async(req, res) => {
    const { idPaciente } = req.params

    if (!mongoose.Types.ObjectId.isValid(idPaciente)) {
        const error = new Error('Id no válido');
        return res.status(403).json({ msg: error.message });
    }

    const paciente = await Paciente.findById(idPaciente)

    if(!paciente){
        const error = new Error('Paciente no encontrado')
        return res.status(404).json({ msg: error.message })
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        const error = new Error('Acción no valida')
        return res.status(404).json({ msg: error.message })
    }

    // Actualizar paciente
    paciente.nombre      = req.body.nombre || paciente.nombre
    paciente.propietario = req.body.propietario || paciente.propietario
    paciente.email       = req.body.email || paciente.email
    paciente.fecha_alta  = req.body.fecha_alta || paciente.fecha_alta
    paciente.sintomas    = req.body.sintomas || paciente.sintomas

    try {
        const pacienteActualizado = await paciente.save()
        res.json(pacienteActualizado)
    } catch (error) {
        console.log(error)
    }
    
}


const eliminarPaciente = async(req, res) => {
    const { idPaciente } = req.params

    if (!mongoose.Types.ObjectId.isValid(idPaciente)) {
        const error = new Error('Id no válido');
        return res.status(403).json({ msg: error.message });
    }

    const paciente = await Paciente.findById(idPaciente)

    if(!paciente){
        const error = new Error('Paciente no encontrado')
        return res.status(404).json({ msg: error.message })
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        const error = new Error('Acción no valida')
        return res.status(404).json({ msg: error.message })
    }

    try {
        await paciente.deleteOne()
        res.json({msg:'Paciente eliminado'})
    } catch (error) {
        console.log(error)
    }
}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}