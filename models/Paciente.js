import mongoose from 'mongoose'


const PacienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    propietario: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    fecha_ingreso: {
        type: Date,
        default: Date.now()
    },
    fecha_alta: {
        type: Date,
        default: null,
    },
    sintomas: {
        type: String,
        require: true,
    },
    veterinario: {
        type: mongoose.Types.ObjectId,
        ref: 'Veterinario'
    },


},{
    timestamps: true,
})

const Paciente = mongoose.model('Paciente', PacienteSchema)

export default Paciente

