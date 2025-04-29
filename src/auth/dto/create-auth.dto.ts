import { IsEmail } from 'class-validator';
export class CreateAuthDto {

    @IsEmail()
    email: string;

    nom: string;

    prenom: string;

    tel: string;
    
    password: string;
}
