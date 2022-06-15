import mongoose from 'mongoose'

const conectarDB = async() => {
    try {
        const urlConeccion = 'mongodb+srv://tonatiujdev:_manager.db@cluster0.7oyxq.mongodb.net/?retryWrites=true&w=majority'
        const db = await mongoose.connect(process.env.MONGO_URI)


        // const db = await mongoose.connect(urlConeccion, {
        //     useNewUrlParser: true,
        //     useUnifiedTopologys: true
        // })

        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`MongoDB conectado en ${url}`);
        
    } catch (error) {
        console.log(`Error en la coneccion a la DB ${error.message}`)
        process.exit(1)
    }
}

export default conectarDB