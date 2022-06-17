import Veterinario from "../models/Veterinario.js"
import generarJWT from "../helpers/generarJWT.js"


const registrar = async( req, res )=>{

    const { email } = req.body
    
    // Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({ email })

    if(existeUsuario){
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({ msg: error.message });
    }

    try {
        // Guardar un nievo veterinario a la DB
        const veterinario = new Veterinario(req.body)
        const veterinarioGuardado = await veterinario.save()
        res.json(veterinarioGuardado);
    } catch (error) {
        console.log( error )
    }
    
}


const perfil = ( req, res )=>{

    const { veterinario } = req

    res.json({perfil: veterinario})
}


const confirmar = async( req, res )=>{

    const { token } = req.params
    const usuarioConfirmar = await Veterinario.findOne({ token })

    if(!usuarioConfirmar){
        const error = new Error('Token no valido')
        return res.status(404).json({ msg: error.message })
    }

    try {
        usuarioConfirmar.token = null
        usuarioConfirmar.confirmado = true
        await usuarioConfirmar.save()

        res.json({msg: 'Usuario confirmado correctamente'})
    } catch (error) {
        console.log(error)
    }

}

const autenticar = async( req, res ) => {

    const { email, password } = req.body

    // Comprobar si el Usuario existe en la DB
    const existeUsuario = await Veterinario.findOne({email})
    
    if(!existeUsuario){
        const error = new Error('El usuario no existe')
        return res.status(404).json({ msg: error.message })
    }

    // Comprobar si el Usuario esta confirmado
    if(!existeUsuario.confirmado){
        const error = new Error('Tu cuenta no esta confirmada')
        return res.status(403).json({msg: error.message})
    }

    // Revisar si el password es correcto
    if( !(await existeUsuario.comprobarPassword( password )) ){
        const error = new Error('Password incorrecto')
        return res.status(403).json({msg: error.message})
    }

    // Autenticar usuario
    res.json({
        msg: 'Auntenticando veterinario....',
        token: generarJWT(existeUsuario.id)
    })

    // res.json({msg: 'Auntenticando veterinario....', data: existeUsuario })
}




export {
    registrar,
    perfil,
    confirmar,
    autenticar
}