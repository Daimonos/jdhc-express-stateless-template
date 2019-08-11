module.exports = {
  hasRole(role) {
    return function checkHasRole(req, res, next) {
      if (role === req.user.role) {
        next()
      } else {
        res.status(403).json({ message: 'Unauthorized' })
      }
    }
  },
  hasAnyRole(roles) {
    return function checkHasAnyRole(req, res, next) {
      let authorized = false
      let allRoles
      if (!(roles instanceof Array)) {
        allRoles = [roles]
      } else {
        allRoles = roles
      }
      allRoles.forEach(r => {
        if (r === req.user.role) {
          authorized = true
        }
      })
      if (authorized) {
        next()
      } else {
        res.status(403).json({ message: 'Unauthorized' })
      }
    }
  },
}
