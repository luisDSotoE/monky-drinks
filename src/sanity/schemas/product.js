export default {
  name: 'product',
  title: 'Producto / Plato',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre del Producto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'business',
      title: 'Negocio',
      type: 'reference',
      to: [{ type: 'business' }],
      description: 'Selecciona si pertenece a Monky Drinks o a Mi Casa Restaurante',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'basePrice',
      title: 'Precio Base ($ COP)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'description',
      title: 'Descripción / Ingredientes',
      type: 'text',
      rows: 3,
    },
    {
      name: 'badge',
      title: 'Etiqueta Destacada (Opcional)',
      type: 'string',
      description: 'Ej: Más Vendido, Recomendado, Nuevo',
    },
    {
      name: 'image',
      title: 'Foto del Producto',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'isAvailable',
      title: '¿Está Disponible?',
      type: 'boolean',
      initialValue: true,
    },
    // ════ MODIFICADORES DE PRECIO (Cervezas, Salsas, Adicionales) ════
    {
      name: 'modifiers',
      title: 'Grupos de Modificadores (Opciones con precio)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'modifierGroup',
          title: 'Grupo de Modificadores',
          fields: [
            {
              name: 'groupName',
              title: 'Nombre del Grupo (ej: Tipo de Bebida, Término de la Carne)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'required',
              title: '¿Es obligatorio elegir una opción?',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'options',
              title: 'Opciones del Grupo',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'optionItem',
                  title: 'Opción',
                  fields: [
                    {
                      name: 'name',
                      title: 'Nombre de la Opción (ej: Corona, Like, Cuates, Papa Criolla)',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'extraPrice',
                      title: 'Precio Adicional ($ COP)',
                      type: 'number',
                      description: 'Valor que se suma al precio base (ej: 5000 o 2000). Deja en 0 si no tiene costo extra.',
                      initialValue: 0,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'basePrice',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `$${subtitle.toLocaleString('es-CO')}` : '',
        media,
      };
    },
  },
};

