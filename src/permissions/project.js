const { getNotes } = require('../contollers/noteController')
const { ROLE } = require('../models/user')

function canViewNotes(user, note){
    return (
        user.role === ROLE.ADMIN ||
        note.userId === user.id
    )
}

function scopedNotes(user, projects) {
    if (user.role === ROLE.ADMIN) return getNotes
    return getNotes.filter(getNotes=> getNotes.userId === user.id) 

}

module.exports = {
    canViewNotes,
    scopedNotes
}