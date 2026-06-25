export type Category =
  | 'tous'
  | 'homme'
  | 'femme'
  | 'mixte'
  | 'enfant'
  | 'accessoires'
  | 'edition-speciale';

export interface Product {
  id: number;
  name: string;
  sizes: string;
  price: number;
  images: string[];
  category: Exclude<Category, 'tous'>;
  isSpecial?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Tee-shirt Homme',
    sizes: 'S — 5XL',
    price: 15,
    images: [
      'images/articles/t-shirt_homme.jpeg',
      'images/articles/t-shirt_homme_2.jpeg',
      'images/ori/t-shirt homme ori.jpeg',
    ],
    category: 'homme',
  },
  {
    id: 2,
    name: 'Débardeur Homme',
    sizes: 'S — 5XL',
    price: 15,
    images: [
      'images/articles/debardeur_homme.jpeg',
      'images/articles/debardeur_homme_2.jpeg',
      'images/ori/debardeur homme ori.jpeg',
    ],
    category: 'homme',
  },
  {
    id: 3,
    name: 'Tee-shirt Baseball Homme',
    sizes: 'S — 3XL',
    price: 18,
    images: [
      'images/articles/t-shirt_homme_baseball.jpeg',
      'images/articles/t-shirt_homme_baseball_2.jpeg',
      'images/ori/t-shirt homme baseball ori.jpeg',
    ],
    category: 'homme',
  },
  {
    id: 4,
    name: 'Gilet à capuche Homme',
    sizes: 'S — 4XL',
    price: 50,
    images: [
      'images/articles/gilet_a_capuche_homme.jpeg',
      'images/articles/gilet_a_capuche_homme_2.jpeg',
      'images/ori/gilet a capuche homme ori.jpeg',
    ],
    category: 'homme',
  },
  {
    id: 5,
    name: 'Blouson Teddy Homme',
    sizes: 'S — 3XL',
    price: 60,
    images: [
      'images/articles/blouson_teddy_homme.jpeg',
      'images/articles/blouson_teddy_homme_2.jpeg',
      'images/ori/blouson teddy homme ori.jpeg',
    ],
    category: 'homme',
  },
  {
    id: 6,
    name: 'Tee-shirt Femme',
    sizes: 'XS — XXL',
    price: 15,
    images: [
      'images/articles/t-shirt_femme.jpeg',
      'images/articles/t-shirt_femme_2.jpeg',
      'images/ori/t-shirt femme ori.jpeg',
    ],
    category: 'femme',
  },
  {
    id: 7,
    name: 'Débardeur Femme',
    sizes: 'XS — XXL',
    price: 15,
    images: [
      'images/articles/debardeur_femme.jpeg',
      'images/articles/debardeur_femme_2.jpeg',
      'images/ori/debardeur femme ori.jpeg',
    ],
    category: 'femme',
  },
  {
    id: 8,
    name: 'Gilet à capuche Femme',
    sizes: 'S — XL',
    price: 50,
    images: [
      'images/articles/gilet_a_capuche_femme.jpeg',
      'images/articles/gilet_a_capuche_femme_2.jpeg',
      'images/ori/gilet a capuche femme ori.jpeg',
    ],
    category: 'femme',
  },
  {
    id: 9,
    name: 'Sweat Mixte',
    sizes: 'S — 4XL',
    price: 25,
    images: [
      'images/articles/sweat_mixte.jpeg',
      'images/articles/sweat_mixte_2.jpeg',
      'images/ori/sweat mixte ori.jpeg',
    ],
    category: 'mixte',
  },
  {
    id: 10,
    name: 'Sweat à capuche Mixte',
    sizes: 'S — 5XL',
    price: 30,
    images: [
      'images/articles/sweat_a_capuche_mixte.jpeg',
      'images/articles/sweat_a_capuche_mixte_2.jpeg',
      'images/ori/sweat a capuche mixte ori.jpeg',
    ],
    category: 'mixte',
  },
  {
    id: 11,
    name: 'Tee-shirt Enfant',
    sizes: '2 — 14 ans',
    price: 15,
    images: [
      'images/articles/t-shirt_enfant.jpeg',
      'images/articles/t-shirt_enfant_2.jpeg',
      'images/ori/t-shirt enfant ori.jpeg',
    ],
    category: 'enfant',
  },
  {
    id: 12,
    name: 'Tablier',
    sizes: 'Taille unique',
    price: 30,
    images: [
      'images/articles/tablier.jpeg',
      'images/articles/tablier_2.jpeg',
      'images/ori/tablier ori.jpeg',
    ],
    category: 'accessoires',
  },
  {
    id: 13,
    name: 'Casquette',
    sizes: 'Taille unique',
    price: 15,
    images: [
      'images/articles/casquette.jpeg',
      'images/articles/casquette_2.jpeg',
      'images/ori/casquette ori.jpeg',
    ],
    category: 'accessoires',
  },
  {
    id: 14,
    name: 'Bonnet',
    sizes: 'Taille unique',
    price: 15,
    images: [
      'images/articles/bonnet.jpeg',
      'images/articles/bonnet_2.jpeg',
      'images/ori/bonnet ori.jpeg',
    ],
    category: 'accessoires',
  },
  {
    id: 15,
    name: 'Sac à dos',
    sizes: 'Taille unique',
    price: 15,
    images: [
      'images/articles/sac_a_dos.jpeg',
      'images/articles/sac_a_dos_2.jpeg',
      'images/ori/sac a dos ori.jpeg',
    ],
    category: 'accessoires',
  },
  {
    id: 16,
    name: 'Tee-shirt Homme',
    sizes: 'S — 5XL',
    price: 20,
    images: [
      'images/articles/t-shirt_edition_speciale_homme.jpeg',
      'images/articles/t-shirt_edition_speciale_homme_2.jpeg',
      'images/ori/t-shirt edition speciale homme ori.jpeg',
    ],
    category: 'edition-speciale',
    isSpecial: true,
  },
  {
    id: 17,
    name: 'Tee-shirt Femme',
    sizes: 'XS — XXL',
    price: 20,
    images: [
      'images/articles/t-shirt_edition_speciale_femme.jpeg',
      'images/articles/t-shirt_edition_speciale_femme_2.jpeg',
      'images/ori/t-shirt edition speciale femme ori.jpeg',
    ],
    category: 'edition-speciale',
    isSpecial: true,
  },
];

export const categories: { id: Category; label: string }[] = [
  { id: 'tous', label: 'Tous' },
  { id: 'homme', label: 'Homme' },
  { id: 'femme', label: 'Femme' },
  { id: 'mixte', label: 'Mixte' },
  { id: 'enfant', label: 'Enfant' },
  { id: 'accessoires', label: 'Accessoires' },
  { id: 'edition-speciale', label: 'Édition Spéciale' },
];

export const pdfs = [
  {
    label: 'Articles 1 à 6',
    file: "/catalogues/Catalogue_Lix'scenes_1_a_6.pdf",
    description: 'Tee-shirts & Débardeurs',
  },
  {
    label: 'Articles 7 à 14',
    file: "/catalogues/Catalogue_Lix'scenes_7_a_14.pdf",
    description: 'Sweats, Gilets & Enfant',
  },
  {
    label: 'Articles 15 à 18',
    file: "/catalogues/Catalogue_Lix'scenes_15_a_18.pdf",
    description: 'Accessoires & Édition Spéciale',
  },
];
