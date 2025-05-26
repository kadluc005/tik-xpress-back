import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
    nom?: string;
    description?: string;
    type?: string;
    date_debut?: Date;
    date_fin?: Date;
    lieu?: string;
    latitude?: number;
    longitude?: number;
    image_url?: string;
    updated_at?: Date;

}
