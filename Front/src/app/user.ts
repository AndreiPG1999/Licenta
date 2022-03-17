export interface User{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password:string;
    treatments: string;
    appointment: Date;
    id_doctor: number;
    datorii_totale: Float32Array;
    nr_telefon:string;
    type:string;
}