import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { AuthService } from "src/auth/auth.service";
import { MailService } from "src/mail/mail.service";
import { EventCreatedEvent } from "./event-created.event";

@Injectable()
export class EventCreatedListener {
    constructor(
        private readonly mailService: MailService,
        private authService: AuthService
    ){}

    @OnEvent('event.created')
    async handleEventCreated(event: EventCreatedEvent) {
        const users = await this.authService.findAll();
        for (const u of users){
            this.mailService.sendMail(
                u.email,
                'Nouvel événement créé',
                `Un nouvel évènement a été ajouté ${event.data.nom}. Checkez le sur notre site ! et voyez si cela vous intéresse.`
            )
        }
    }
}