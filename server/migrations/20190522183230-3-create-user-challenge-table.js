'use strict'

exports.up = function(db) {
    return db.createTable('user_challenge', {
        columns: {
            id: {
                type: 'int',
                primaryKey: true,
                autoIncrement: true
            },
            challengeId: {
                type: 'int',
                notNull: true,
                foreignKey: {
                    name: 'fk_users_challenges_challenge_id',
                    table: 'challenge',
                    rules: {
                        onDelete: 'CASCADE',
                        onUpdate: 'RESTRICT'
                    },
                    mapping: 'id'
                }
            },
            user1: {
                type: 'int',
                notNull: true,
                foreignKey: {
                    name: 'fk_users_challenges_user1_id',
                    table: 'user',
                    rules: {
                        onDelete: 'CASCADE',
                        onUpdate: 'RESTRICT'
                    },
                    mapping: 'id'
                }
            },
            user2: {
                type: 'int',
                notNull: true,
                foreignKey: {
                    name: 'fk_users_challenges_user2_id',
                    table: 'user',
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
    return db.dropTable('user_challenge')
}

exports._meta = {
    version: 1
}
