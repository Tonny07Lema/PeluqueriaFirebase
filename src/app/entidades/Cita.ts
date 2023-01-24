export class Cita{
    paciente: string ='';
    correo: string ='';
    celular: string ='';
}

export interface Usuario{
    correo: string;
    password : string;
    nombre : string;
    cedula : string;
    telefono:string;
    uid:string;
    perfil:'estilista'|'cliente';
}
