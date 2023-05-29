import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
   const headerToken = req.headers['authorization'];   //obtenemos el token de la cabecera

   if (headerToken != undefined && headerToken.startsWith('Bearer ')) {    //validamos que venga el token y que sea del tipo bearer
      const bearerToken = headerToken.slice(7);

      const servicioRutaCompleta = req.originalUrl;      //Obtenemos la ruta del servicio
      console.log('Ruta completa:', servicioRutaCompleta);

      const metodo = req.method;                         //Obtenemos el verbo del metodo
      console.log('Verbo HTTP:', metodo);

      //const ipv6Address = req.ip;
      //console.log('IP desde donde se hace la solicitud: ',ipv6Address);

      interface DecodedToken {
         id: number;
         iat: number;
         exp: number;
      }

      try {
         const decodedToken = jwt.verify(bearerToken, process.env.SECRET_KEY || 'bearerTokenGCHC123') as DecodedToken;
         const id = decodedToken.id;      //decodificamos el token para obtener el id del usuario
         console.log('id del usuario que consulta:', id);

         // Consultar la base de datos para obtener el usuario
         const user: any = await User.findOne({
            where: { id: id },
            attributes: ['id', 'email', 'password', 'user_type_id']
         });
         console.log(user.user_type_id);  //Hasta este punto ya tenemos el user_type_id del usuario que consulta

         //TODO: ACA DEBERIA VALIDAR QUE EL SERVICIO A TRAVES DE SU RUTA SE PUEDA CONSUMIR DE ACUERDO AL ROL O TIPO DE USUARIO DE QUIEN CONSULTA
         //TODO: SE DEBE REVISAR EL MODELO PROPUESTO POR VICTOR PARA HACER EL MATCH ENTRE LOS ROLES Y LOS SERVICIOS
         if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
         }
   
         if (user?.dataValues.rol !== 'admin') {
            return res.status(403).json({ msg: 'Acceso denegado - Lo sentimos, tu perfil no puede acceder a este contenido.' });
         }

         next();
      } catch (error) {
         res.status(401).json({ msg: 'Token no válido o expirado' });
      }
   } else {
      res.status(401).json({ msg: 'Acceso denegado' });
   }
};

export default adminAuthMiddleware;