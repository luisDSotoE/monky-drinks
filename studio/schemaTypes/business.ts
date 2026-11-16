import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'business',
  title: 'Información del Negocio',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Negocio',
      type: 'string',
      description: 'Ej: Monky Fusión Drinks o Mi Casa Restaurante',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (Identificador en el sistema)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slogan',
      title: 'Eslogan Principal',
      type: 'string',
      description: 'Ej: La evolución de las micheladas / Una experiencia que deleitara tus sentidos',
    }),
    defineField({
      name: 'description',
      title: 'Descripción breve',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'address',
      title: 'Ubicación / Dirección',
      type: 'string',
      description: 'Ej: Chimichagua - Cesar',
      initialValue: 'Chimichagua - Cesar',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Número de WhatsApp para Pedidos',
      type: 'string',
      description: 'Solo números, sin espacios (ej: 3118894341 o 3183630494)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nequiNumber',
      title: 'Número para Transferencias (Nequi / Bancolombia)',
      type: 'string',
      description: 'Número donde los clientes enviarán el dinero de transferencias',
    }),
    defineField({
      name: 'schedule',
      title: 'Horario de Atención',
      type: 'string',
      description: 'Ej: 11:00 AM - 9:00 PM o Jueves a Domingo 4:00 PM - 12:00 AM',
    }),
    defineField({
      name: 'deliveryInfo',
      title: 'Texto de Domicilios',
      type: 'string',
      description: 'Ej: 🏠 Domicilio GRATIS en Chimichagua',
      initialValue: '🏠 Domicilio GRATIS',
    }),
    defineField({
      name: 'instagram',
      title: 'Usuario de Instagram',
      type: 'string',
      description: 'Ej: @monky_fusion_drinks',
    }),
    defineField({
      name: 'themeColor',
      title: 'Color Temático Principal (HEX)',
      type: 'string',
      description: 'Ej: #FF00B8 para Monky o #C21807 para Mi Casa',
    }),
    defineField({
      name: 'logo',
      title: 'Logotipo Oficial',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bannerImage',
      title: 'Foto de Portada / Banner',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'whatsappNumber',
      media: 'logo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `WhatsApp: ${subtitle}` : '',
        media,
      };
    },
  },
});
