import { Byte } from "@angular/compiler/src/util";

export interface User{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password:string;
    id_doctor: number;
    nr_telefon:string;
    type:string;
    profile_picture: Byte;
}