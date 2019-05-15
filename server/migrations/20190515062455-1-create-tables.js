'use strict'

exports.up = function(db) {
    return db.createTable('users', {
        columns: {
            id: {
                type: 'int',
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: 'string',
                unique: true,
                notNull: true
            },
            first_name: {
                type: 'string',
                notNull: true
            },
            last_name: {
                type: 'string',
                notNull: true
            },
            google_id: {
                type: 'string',
                notNull: true
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
