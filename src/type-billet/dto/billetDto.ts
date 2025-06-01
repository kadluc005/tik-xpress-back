import { Billet } from "../entities/billet.entity";

// billet.dto.ts
export class BilletDto {
  id: number;
  code: string;
  image_url: string;
  estUtilise: boolean;
  type: {
    id: number;
    libelle: string;
    prix: number;
    privileges: string;
    quantite: number;
    is_active: boolean;
    is_visible: boolean;
    created_at: Date;
    updated_at: Date;
    eventId: number; // 👈 ajouté ici
  };

  constructor(billet: Billet) {
    this.id = billet.id;
    this.code = billet.code;
    this.image_url = billet.image_url;
    this.estUtilise = billet.estUtilise;
    this.type = {
      id: billet.type.id,
      libelle: billet.type.libelle,
      prix: billet.type.prix,
      privileges: billet.type.privileges,
      quantite: billet.type.quantite,
      is_active: billet.type.is_active,
      is_visible: billet.type.is_visible,
      created_at: billet.type.created_at,
      updated_at: billet.type.updated_at,
      eventId: billet.type.event.id, // 👈 ici
    };
  }
}
