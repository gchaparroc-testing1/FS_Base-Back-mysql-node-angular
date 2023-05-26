import express, { Application } from 'express';
import cors from 'cors';
import routesClient from '../routes/client';
import routesUser from '../routes/user';
import { Client } from './client';
import { User } from './user';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puertoo ' + this.port);
        })
    }

    routes() {
        this.app.use('/api/clients', routesClient);
        this.app.use('/api/users', routesUser);
    }

    midlewares() {
        // Parseo body
        this.app.use(express.json());

        // Cors
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            console.error('Conexion exitosa a BD:');
            //await Client.sync()
            //await User.sync();
        } catch (error) {
            console.error('Error al conectar a la BD:', error);
        }
    }
}

export default Server;