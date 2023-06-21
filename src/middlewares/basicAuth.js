const { canViewNotes, scopedNotes } = require("../permissions/project")

function authUser(req, res, next){
    if(req.user == null){
        res.status(403)
        return res.send('You need to sign in')
    }
    next()
}

function authRole(role) {
    return (req, res, next)=>{
      if (req.user.role !== role) {
        res.status(401)
        return res.send('Pending')
      }
      next()
    }
  }

function authGetNotes(req, res, next) {
    if(!canViewNotes(req.user, req.note)){
        return res.send('Not Allowed')
    } 
    next()
}
module.exports = {
    authUser,
    authRole
}