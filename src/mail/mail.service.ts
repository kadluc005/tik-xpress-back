import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path'

import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {

    private transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
        user: 'vacheck759@gmail.com',
        pass: 'dgak wkum ztbd kyfz',
        },
    });

    async sendBillet(to: string, subject: string, billetImagePath: string) {
        const attachmentExists = fs.existsSync(billetImagePath);

        if (!attachmentExists) {
        throw new Error('Image du billet non trouvée');
        }

        //const htmlPath = path.join(__dirname, 'mail-template.html');
        //const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

        const mailOptions = {
        from: '"Mon Événement" <vacheck759@gmail.com>',
        to,
        subject,
        text: 'Voici votre billet pour l’événement.',
        html: `<p>Bonjour,</p><p>Veuillez trouver en pièce jointe votre billet. Fouatabalaaa C'est tellement facike bébé, ça marche😂</p>,`,
        attachments: [
            {
            filename: 'billet.png',
            path: billetImagePath,
            },
        ],
        };

        await this.transporter.sendMail(mailOptions);
    }
}
