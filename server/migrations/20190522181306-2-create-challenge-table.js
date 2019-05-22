'use strict'

exports.up = function(db) {
    return db.createTable('challenges', {
        columns: {
            id: {
                type: 'int',
                primaryKey: true,
                autoIncrement: true
            },
            start_date: {
                type: 'timestamp',
                notNull: true
            },
            goals: 'jsonb',
            end_date: {
                notNull: true,
                type: 'timestamp'
            },
            goal_description: {
                type: 'text',
                notNull: true
            },
            goal_prize: {
                type: 'text',
                notNull: true
            },
            goal_image: {
                type: 'text'
            }
        }
    })
}

exports.down = function(db) {
    return db.dropTable('challenges')
}

exports._meta = {
    version: 1
}
