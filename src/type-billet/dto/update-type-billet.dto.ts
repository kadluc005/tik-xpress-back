import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeBilletDto } from './create-type-billet.dto';

export class UpdateTypeBilletDto extends PartialType(CreateTypeBilletDto) {

    libelle?: string;
    prix?: number;
    privileges?: string;
    quantite?: number;
    eventId: number;
    updated_at?: Date;
    
}
