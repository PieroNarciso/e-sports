module.exports = {
  /**
  * Middleware para la autenticación de un usuario `global`
  *
  * Cualquier role puede pasar este middleware, solo necesita estar logueado
  *
  * Al momento de hacer un login se tiene que registrar el `id` del usuario
  * en la `SessionData`: `userID`
  *
  * Ejemplo:
  *   ```js
  *   req.session.userID = user.id; // User.id viene de un query de la base de datos
  *   ```
  *
  * @param {import('express').Request & import('express-session').SessionData} req
  * @param {import('express').Response} res
  * @param {import('express').NextFunction} next
  */
  authSession: (req, res, next) => {
    if (!req.session.userId || !req.session.rol) {
      res.status(401).redirect('/login');
    } else {
      next();
    }
  },

  /**
  * Middleware para la atenticacion de un Admin
  *
  * Solo un admin puede pasar este middleware
  *
  * Al momento de hacer el login del usuario, se debe guardar su role en el atributo
  * `role`
  *
  * Ejemplo:
  *   ```js
  *   req.session.role = user.role;
  *   ````
  *
  * @param {import('express').Request & import('express-session').SessionData} req
  * @param {import('express').Response} res
  * @param {import('express').NextFunction} next
  */
  authAdmin: (req, res, next) => {
    console.log(req.session);
    if (req.session.rol !== 'admin') {
      res.status(401).redirect('/login');
    } else {
      next();
    }
  },
  /**
  * Middleware para la atenticacion de un Organizador
  *
  * Al momento de hacer el login del usuario, se debe guardar su role en el atributo
  * `role`
  *
  * Ejemplo:
  *   ```js
  *   req.session.role = user.role;
  *   ````
  *
  * @param {import('express').Request & import('express-session').SessionData} req
  * @param {import('express').Response} res
  * @param {import('express').NextFunction} next
  */
  authOrganizador: (req, res, next) => {
    if (req.session.rol !== 'org') {
      res.status(401).redirect('/login');
    } else {
      next();
    }
  },
  /**
  * Middleware para la atenticacion de un Organizador
  *
  * Solo un participante lider puede pasar la atenticacion
  *
  * Al momento de hacer el login del usuario, se debe guardar su role en el atributo
  * `role`
  *
  * Ejemplo:
  *   ```js
  *   req.session.role = user.role;
  *   ````
  *
  * @param {import('express').Request & import('express-session').SessionData} req
  * @param {import('express').Response} res
  * @param {import('express').NextFunction} next
  */
  authParticipanteLider: (req, res, next) => {
    if (req.session.rol !== 'lider') {
      res.status(401).redirect('/login');
    } else {
      next();
    }
  },
}
