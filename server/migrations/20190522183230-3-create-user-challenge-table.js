'use strict'

exports.up = function(db) {
    return db.createTable('users_challenges', {
        columns: {
            id: {
                type: 'int',
                primaryKey: true,
                autoIncrement: true
            },
            challenge_id: {
                type: 'int',
                notNull: true,
                foreignKey: {
                    name: 'fk_users_challenges_challenge_id',
                    table: 'challenges',
                    rules: {
                        onDelete: 'CASCADE',
                        onUpdate: 'RESTRICT'
                    },
                    mapping: 'id'
                }
            },
            user_1: {
                type: 'int',
                notNull: true,
                foreignKey: {
                    name: 'fk_users_challenges_user1_id',
                    table: 'users',
                    rules: {
                        onDelete: 'CASCADE',
                        onUpdate: 'RESTRICT'
                    },
                    mapping: 'id'
                }
            },
            user_2: {
                type: 'int',
                notNull: true,
                foreignKey: {
                    name: 'fk_users_challenges_user2_id',
                    table: 'users',
                    rules: {
                        onDelete: 'CASCADE',
                        onUpdate: 'RESTRICT'
                    },
                    mapping: 'id'
                }
            }
        }
    })
}

exports.down = function(db) {
    return db.dropTable('users_challenges')
}

exports._meta = {
    version: 1
}
