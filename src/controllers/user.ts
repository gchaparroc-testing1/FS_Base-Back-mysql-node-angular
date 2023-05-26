import { Request, Response} from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
const bcrypt = require('bcryptjs');


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
    
        // Validamos si el usuario existe en la base de datos
        //const user: any = await User.findOne({ where: { email: email } });
        const user: any = await User.findOne({
            where: { email: email },
            attributes: ['id', 'name', 'email', 'password']
        });

        if(!user) {
            return res.status(400).json({
                msg: `No existe un usuario con el email ${email} en la base datos`
            })
        }

        // Validamos password
        //const passwordValid = await bcrypt.compare(password, user.password)
        const passwordValid = await bcrypt.compareSync(password, user.password);

        if(!passwordValid) {
            return res.status(400).json({
                msg: `Password Incorrecta`
            })
        }

        // Generamos token
        const token = jwt.sign({
            email: email
        }, process.env.SECRET_KEY || 'bearerTokenGCHC123', {
            expiresIn: '40000'
        });
            
        res.json(token);
    } catch (error) {
        return res.status(400).json({
            msg: `Debe enviar paramentros correctos ${error}`
        })
    }
}