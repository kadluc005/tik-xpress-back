import { IsEmail } from 'class-validator';
export class CreateAuthDto {

    @IsEmail()
    email: string;

    nom: string;

    prenom: string;

    nomEntreprise: string;

    tel: string;
    
    password: string;

}
