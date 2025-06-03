import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import { from } from 'form-data';

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
    // Nettoyer le chemin du fichier pour éviter les slashs en trop
    const cleanPath = billetImagePath.replace(/^\/+/, '');

    // Recomposer le chemin absolu si nécessaire
    const finalPath = path.resolve(cleanPath);

    if (!fs.existsSync(finalPath)) {
      throw new Error('Image du billet non trouvée');
    }

    const mailOptions = {
      from: '"Mon Événement" <vacheck759@gmail.com>',
      to,
      subject,
      text: 'Voici votre billet pour l’événement.',
      html: `
      <h2 style="font-family: Arial, sans-serif; color: #2c3e50;">Bonjour👋,</h2>
      <h3 style="font-family: Arial, sans-serif; color: #34495e;">Merci pour votre inscription à notre événement.</h3>
      <p style="font-family: Arial, sans-serif; color: #555;">Veuillez trouver en pièce jointe votre billet d’entrée.</p>
      <p style="font-family: Arial, sans-serif; color: #27ae60;">Nous avons hâte de vous accueillir !🎉</p>
      <p style="font-family: Arial, sans-serif; color: #555;">Cordialement,<br>L’équipe d’organisation</p>
    `,
      attachments: [
        {
          filename: 'billet.png',
          path: finalPath,
        },
      ],
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendMail(to: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: '"Mon Événement" <vacheck759@gmail.com>',
      to,
      subject,
      text,
    });
  }
}
