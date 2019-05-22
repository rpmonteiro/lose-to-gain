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
                type: 'string'
            },
            last_name: {
                type: 'string'
            },
            google_id: {
                unique: true,
                type: 'string'
            },
            fitbit_token: {
                type: 'string',
                unique: true
            },
            active: {
                type: 'boolean',
                defaultValue: false
            },
            invited_by: {
                type: 'int'
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
