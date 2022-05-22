import { Byte } from "@angular/compiler/src/util";

export interface Radiografie{
    id: number;
    email: string;
    name:string;
    type:string;
    picByte:Byte;
}