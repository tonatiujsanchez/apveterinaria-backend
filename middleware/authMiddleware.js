import jwt from 'jsonwebtoken'
import Veterinario from '../models/Veterinario.js';

const authMiddleware = async (req, res, next) => {
    
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            const veterinario = await Veterinario.findById(decoded.id).select(
                "-password -token -confirmado"
            )
           
            req.veterinario = veterinario
            return next()
        } catch (error) { 
            const err = new Error('Token no Válido')
            return res.status(403).json({ msg: err.message })
        }

    }else{
        console.log('NO hay el token o Bearer');
    }
    
    if(!token){
        const error = new Error('Token no Válido o inexistente')
        res.status(403).json({ msg: error.message })
    }

    next()
}

export default authMiddleware