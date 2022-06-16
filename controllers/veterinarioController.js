import Veterinario from "../models/Veterinario.js"


const registrar = async( req, res )=>{

    const { email } = req.body
    
    // Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({ email })

    if(existeUsuario){
        const error = new Error('Usuario ya registrado')
        res.status(400).json({ msg: error.message });
        return
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
    res.json({msg: 'Mostrando perfil... /API/VETERINARIOS/perfil'})

}


export {
    registrar,
    perfil
}