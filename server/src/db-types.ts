/* tslint:disable */

/**
 * AUTO-GENERATED FILE @ 2019-05-22 20:40:34 - DO NOT EDIT!
 *
 * This file was automatically generated by schemats v.3.0.3
 * $ schemats generate -c postgresql://username:password@localhost:5432/lose-to-gain -t users_challenges -t migrations -t challenges -t users -s public
 *
 */

export namespace users_challengesFields {
    export type id = number;
    export type user_1 = number;
    export type user_2 = number;

}

export interface users_challenges {
    id: users_challengesFields.id;
    user_1: users_challengesFields.user_1;
    user_2: users_challengesFields.user_2;

}

export namespace migrationsFields {
    export type id = number;
    export type name = string;
    export type run_on = Date;

}

export interface migrations {
    id: migrationsFields.id;
    name: migrationsFields.name;
    run_on: migrationsFields.run_on;

}

export namespace challengesFields {
    export type id = number;
    export type start_date = Date;
    export type goals = Object | null;
    export type end_date = Date;
    export type goal_description = string;
    export type goal_prize = string;
    export type goal_image = string | null;

}

export interface challenges {
    id: challengesFields.id;
    start_date: challengesFields.start_date;
    goals: challengesFields.goals;
    end_date: challengesFields.end_date;
    goal_description: challengesFields.goal_description;
    goal_prize: challengesFields.goal_prize;
    goal_image: challengesFields.goal_image;

}

export namespace usersFields {
    export type id = number;
    export type email = string;
    export type first_name = string | null;
    export type last_name = string | null;
    export type google_id = string | null;
    export type fitbit_token = string | null;
    export type active = boolean | null;
    export type invited_by = number | null;

}

export interface users {
    id: usersFields.id;
    email: usersFields.email;
    first_name: usersFields.first_name;
    last_name: usersFields.last_name;
    google_id: usersFields.google_id;
    fitbit_token: usersFields.fitbit_token;
    active: usersFields.active;
    invited_by: usersFields.invited_by;

}
