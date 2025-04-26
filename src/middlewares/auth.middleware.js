const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    console.log('Middleware authenticateToken ejecutado'); // Depuración
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        console.log('No se proporcionó token'); // Depuración
        return res.status(401).json({ message: 'Acceso denegado, no se proporcionó un token'});
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.log('Error al verificar token:', err); // Depuración
            return res.status(403).json({ message: 'Token no valido' });
        }
        req.user = user;
        console.log('Token verificado correctamente'); // Depuración
        next();
    });
};

const checkRole = (roles) => {
    return (req, res, next) => {
        console.log('Middleware checkRole ejecutado'); // Depuración
        const { rol_id } = req.user;
        console.log(`Rol del usuario: ${rol_id}`); // Depuración
        console.log(`Roles permitidos: ${roles}`); // Depuración
        if (!roles.includes(rol_id)) {
            console.log('Acceso denegado'); // Depuración
            return res.status(403).json({ message: 'Acceso denegado, no tienes permiso para realizar esta acción'})
        }        
        next();
    };
};

module.exports = { authenticateToken, checkRole };