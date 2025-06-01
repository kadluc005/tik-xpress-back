import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';

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
      html: `
            <h2 style="font-family: Arial, sans-serif; color: #2c3e50; margin-bottom: 10px;">
            Bonjour👋,
            </h2>
            <h3 style="font-family: Arial, sans-serif; color: #34495e; margin-bottom: 15px;">
            Merci pour votre inscription à notre événement.
            </h3>
            <p style="font-family: Arial, sans-serif; color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 15px;">
            Veuillez trouver en pièce jointe votre billet d’entrée. Présentez-le à l’entrée le jour de l’événement, sous format numérique ou imprimé.
            </p>
            <p style="font-family: Arial, sans-serif; color: #27ae60; font-size: 16px; line-height: 1.5; margin-bottom: 15px;">
            Nous avons hâte de vous accueillir !🎉
            </p>
            <p style="font-family: Arial, sans-serif; color: #555; font-size: 14px; line-height: 1.4;">
            Cordialement,<br>
            L’équipe d’organisation
            </p>
        `,
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
