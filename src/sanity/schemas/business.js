export default {
  name: 'business',
  title: 'Negocio / Restaurante',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre del Negocio',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slogan',
      title: 'Eslogan',
      type: 'string',
    },
    {
      name: 'whatsappNumber',
      title: 'Número de WhatsApp',
      type: 'string',
      description: 'Sin espacios ni código de país (ej: 3118894341 o 3183630494)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'themeColor',
      title: 'Color Temático Principal (HEX)',
      type: 'string',
      description: 'Ej: #FF00B8 para Monky o #C21807 para Mi Casa',
    },
    {
      name: 'logo',
      title: 'Logotipo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bannerImage',
      title: 'Imagen de Portada / Banner',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};

