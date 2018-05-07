module.exports = {
  hasRole: function(role) {
    return function(req, res, next) {
      if(role === req.user.role) {
        next();
      }
      else{
        return res.status(403).json({message:'Unauthorized'});
      }
    }
  },
  hasAnyRole: function(roles) {
    return function(req, res, next) {
      let authorized = false;
      if(!(roles instanceof Array)) {
        roles = [roles];
      }
      roles.forEach(r => {
        if(r === req.user.role) {
          authorized = true;
        }
      });
      if(authorized){
        next();
      }
      else{
        return res.status(403).json({message:'Unauthorized'});
      }
    }
  }
}