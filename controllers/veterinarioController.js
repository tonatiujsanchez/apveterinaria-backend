import Veterinario from "../models/Veterinario.js"
import generarJWT from "../helpers/generarJWT.js"
import generarId from "../helpers/generarId.js"


const registrar = async( req, res )=>{

    const { email } = req.body
    
    // Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({ email })

    if(existeUsuario){
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({ msg: error.message });
    }

    try {
        // Guardar un nuevo veterinario a la DB
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

}

const olvidePassword = async(req, res) => {

    const { email } = req.body

    const existeUsuario = await Veterinario.findOne({email})
    
    if(!existeUsuario){
        const error = new Error('El usuario no existe')
        return res.status(400).json({ msg:error.message })
    }

    try {
        existeUsuario.token = generarId()
        await existeUsuario.save()
        res.json({msg: "Hemos enviado un email con las instrucciones para restablecer tu contraseña"})
    } catch (error) {
        console.log(error);
    }

}


const comprobarToken = async(req, res) => {
   const { token } = req.params

   const tokenValido = await Veterinario.findOne({token})

   if(!tokenValido){
        const error = new Error('Token no válido')
        return res.status(400).json({msg: error.message})
   }

   res.json({msg: 'Token válido y el usuario existe'})
}



const nuevoPassword = async(req, res) => {
    const { token } = req.params
    const { password } = req.body

    const usuario = await Veterinario.findOne({token})

    if(!usuario){
        const error = new Error('Hubo un error')
        return res.status(400).json({msg: error.message})
    }

    try {
        usuario.token = null
        usuario.password = password
        await usuario.save()

        res.json({msg: 'Password modificado correctamente'})
    } catch (error) {
        console.log(error);
    }
}




export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}