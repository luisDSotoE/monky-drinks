import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Producto / Plato',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Producto',
      type: 'string',
      description: 'Ej: Monky Mix, Punta de Anca al Carbón, Monky Supreme',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'business',
      title: 'Negocio',
      type: 'reference',
      to: [{ type: 'business' }],
      description: 'Selecciona si este producto es de Monky Drinks o de Mi Casa Restaurante',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Categoría en la que aparecerá dentro del menú',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'basePrice',
      title: 'Precio Base ($ COP)',
      type: 'number',
      description: 'Precio en pesos colombianos (ej: 13000, 32000)',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Descripción / Ingredientes',
      type: 'text',
      rows: 3,
      description: 'Detalles del plato o ingredientes',
    }),
    defineField({
      name: 'badge',
      title: 'Etiqueta Destacada (Opcional)',
      type: 'string',
      description: 'Ej: Recomendado del Chef, Más Vendido, Favorito Criollo',
    }),
    defineField({
      name: 'image',
      title: 'Foto del Producto',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'isAvailable',
      title: '¿Está Disponible en el Menú?',
      type: 'boolean',
      initialValue: true,
    }),
    // ════ MODIFICADORES DE PRECIO (Opciones de Cerveza, Términos, Adicionales) ════
    defineField({
      name: 'modifiers',
      title: 'Grupos de Opciones / Modificadores (con aumento de precio)',
      type: 'array',
      description: 'Permite configurar opciones que suman precio, ej: Cerveza Like (+5.000) o Cuates (+5.000)',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'modifierGroup',
          title: 'Grupo de Opciones',
          fields: [
            defineField({
              name: 'groupName',
              title: 'Nombre del Grupo (ej: Elige tu Bebida, Término de la carne)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'required',
              title: '¿Es obligatorio elegir una opción?',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'options',
              title: 'Opciones disponibles',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'optionItem',
                  title: 'Opción con Precio',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Nombre de la Opción (ej: Like, Cuates, Corona, Ginger)',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'extraPrice',
                      title: 'Precio Adicional ($ COP)',
                      type: 'number',
                      description: 'Valor adicional a sumar al precio base (ej: 5000 o 2000). Dejar en 0 si no tiene recargo.',
                      initialValue: 0,
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      extra: 'extraPrice',
                    },
                    prepare({ title, extra }) {
                      return {
                        title,
                        subtitle: extra > 0 ? `+ $${extra.toLocaleString('es-CO')}` : 'Sin costo adicional',
                      };
                    },
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'basePrice',
      businessName: 'business.name',
      media: 'image',
    },
    prepare({ title, subtitle, businessName, media }) {
      return {
        title,
        subtitle: `${businessName ? `[${businessName}] ` : ''}$${subtitle ? subtitle.toLocaleString('es-CO') : 0}`,
        media,
      };
    },
  },
});

