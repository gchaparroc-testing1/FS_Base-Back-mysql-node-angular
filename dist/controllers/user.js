"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = require('bcryptjs');
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validamos si el usuario existe en la base de datos
        //const user: any = await User.findOne({ where: { email: email } });
        const user = yield user_1.User.findOne({
            where: { email: email },
            attributes: ['id', 'email', 'password']
        });
        if (!user) {
            return res.status(400).json({
                msg: `No existe un usuario con el email ${email} en la base datos`
            });
        }
        // Validamos password
        //const passwordValid = await bcrypt.compare(password, user.password)
        const passwordValid = yield bcrypt.compareSync(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({
                msg: `Password Incorrecta`
            });
        }
        // Generamos token
        const token = jsonwebtoken_1.default.sign({
            email: email
        }, process.env.SECRET_KEY || 'bearerTokenGCHC123', {
            expiresIn: '40000'
        });
        res.json(token);
    }
    catch (error) {
        return res.status(400).json({
            msg: `Debe enviar paramentros correctos ${error}`
        });
    }
});
exports.loginUser = loginUser;
