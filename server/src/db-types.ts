/* tslint:disable */

/**
 * AUTO-GENERATED FILE @ 2019-05-22 15:41:42 - DO NOT EDIT!
 *
 * This file was automatically generated by schemats v.3.0.3
 * $ schemats generate -c postgresql://username:password@localhost:5432/lose-to-gain -t migrations -t users -s public
 *
 */

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
