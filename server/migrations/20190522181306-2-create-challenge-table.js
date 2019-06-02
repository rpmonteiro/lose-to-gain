'use strict'

exports.up = function(db) {
    return db.createTable('challenge', {
        columns: {
            id: {
                type: 'int',
                primaryKey: true,
                autoIncrement: true
            },
            startDate: {
                type: 'timestamp',
                notNull: true
            },
            data: 'jsonb',
            endDate: {
                notNull: true,
                type: 'timestamp'
            }
        }
    })
}

exports.down = function(db) {
    return db.dropTable('challenge')
}

exports._meta = {
    version: 1
}
