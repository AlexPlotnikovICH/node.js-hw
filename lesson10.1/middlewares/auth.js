import jwt from 'jsonwebtoken'
function authJWT(req, res, next) {
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ message: 'Forbidden: Invalid or expired token' })
      }
      req.user = user
      next()
    })
  } else {
    return res
      .status(401)
      .json({ message: "Unaithorized: No token provided or it's invalid" })
  }
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role === role) {
      next()
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden: You don't have access to this resource" })
    }
  }
}
export { authJWT }
