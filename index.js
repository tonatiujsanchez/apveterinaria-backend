import dotenv from 'dotenv'
import express from 'express'
import conectarDB from './config/db.js'
import veterinarioRoutes from './routes/veterinarioRoutes.js'

const app = express()
app.use( express.json() )

dotenv.config()

// Conectarse a la base de datos
conectarDB()



app.use('/api/veterinarios', veterinarioRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`)
})