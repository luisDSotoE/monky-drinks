export default {
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título de la Categoría',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'business',
      title: 'Negocio al que pertenece',
      type: 'reference',
      to: [{ type: 'business' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Orden de Visualización',
      type: 'number',
      initialValue: 0,
    },
  ],
};

