'use strict'

exports.up = function(db) {
    return db.createTable('user', {
        columns: {
            id: {
                type: 'int',
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: 'string',
                unique: true
            },
            firstName: {
                type: 'string'
            },
            lastName: {
                type: 'string'
            },
            weightLogs: 'jsonb',
            googleId: {
                unique: true,
                type: 'string'
            }
        }
    })
}

exports.down = function(db) {
    return db.dropTable('users')
}

exports._meta = {
    version: 1
}
