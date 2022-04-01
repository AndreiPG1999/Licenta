export interface User{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password:string;
    treatments: string;
    appointment: Date;
    id_doctor: number;
    nr_telefon:string;
    type:string;
    diagnostic:string;
    dinte:string;
    pret:Float32Array;
}