import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la Categoría',
      type: 'string',
      description: 'Ej: Asados al Carbón, Micheladas, Enchiladas, Platos Criollos',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'business',
      title: 'Negocio al que pertenece',
      type: 'reference',
      to: [{ type: 'business' }],
      description: 'Selecciona si esta categoría pertenece a Monky Drinks o a Mi Casa Restaurante',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden de Visualización',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      businessName: 'business.name',
    },
    prepare({ title, businessName }) {
      return {
        title,
        subtitle: businessName ? `Negocio: ${businessName}` : 'Sin negocio asignado',
      };
    },
  },
});

