import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

// ════════════════════════════════════════════════════════════
// PANEL DE ADMINISTRACIÓN 1: 🐒 MONKY FUSIÓN DRINKS
// ════════════════════════════════════════════════════════════
const monkyWorkspace = {
  name: 'monky-drinks',
  title: '🐒 Monky Fusión Drinks',
  basePath: '/monky',
  projectId: 'fk1u7ys6',
  dataset: 'production',
  plugins: [
    structureTool({
      title: 'Panel Monky Drinks',
      structure: (S) =>
        S.list()
          .title('🐒 Monky Drinks Admin')
          .items([
            // 1. Información de Monky
            S.listItem()
              .title('⚙️ Información de Monky Drinks')
              .child(
                S.documentList()
                  .title('Datos de Monky Drinks')
                  .filter('_type == "business" && (slug.current == "monky-drinks" || name match "*Monky*")')
              ),

            // 2. Categorías de Monky
            S.listItem()
              .title('🏷️ Categorías (Micheladas, Enchiladas...)')
              .child(
                S.documentList()
                  .title('Categorías de Monky')
                  .filter('_type == "category" && business->slug.current == "monky-drinks"')
              ),

            // 3. Productos de Monky
            S.listItem()
              .title('🍹 Menú de Bebidas & Micheladas')
              .child(
                S.documentList()
                  .title('Productos de Monky Drinks')
                  .filter('_type == "product" && business->slug.current == "monky-drinks"')
              ),

            S.divider(),
            S.documentTypeListItem('business').title('📋 Ver Todos los Negocios'),
            S.documentTypeListItem('category').title('📁 Ver Todas las Categorías'),
            S.documentTypeListItem('product').title('📦 Ver Todos los Productos'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
};

// ════════════════════════════════════════════════════════════
// PANEL DE ADMINISTRACIÓN 2: 🏡 MI CASA RESTAURANTE
// ════════════════════════════════════════════════════════════
const miCasaWorkspace = {
  name: 'mi-casa',
  title: '🏡 Mi Casa Restaurante',
  basePath: '/micasa',
  projectId: 'fk1u7ys6',
  dataset: 'production',
  plugins: [
    structureTool({
      title: 'Panel Mi Casa',
      structure: (S) =>
        S.list()
          .title('🏡 Mi Casa Restaurante Admin')
          .items([
            // 1. Información de Mi Casa
            S.listItem()
              .title('⚙️ Información de Mi Casa')
              .child(
                S.documentList()
                  .title('Datos de Mi Casa')
                  .filter('_type == "business" && (slug.current == "mi-casa" || name match "*Casa*")')
              ),

            // 2. Categorías de Mi Casa
            S.listItem()
              .title('🏷️ Categorías (Asados, Criollos, Picadas...)')
              .child(
                S.documentList()
                  .title('Categorías de Mi Casa')
                  .filter('_type == "category" && business->slug.current == "mi-casa"')
              ),

            // 3. Platos de Mi Casa
            S.listItem()
              .title('🥩 Menú de Asados & Platos')
              .child(
                S.documentList()
                  .title('Platos de Mi Casa Restaurante')
                  .filter('_type == "product" && business->slug.current == "mi-casa"')
              ),

            S.divider(),
            S.documentTypeListItem('business').title('📋 Ver Todos los Negocios'),
            S.documentTypeListItem('category').title('📁 Ver Todas las Categorías'),
            S.documentTypeListItem('product').title('📦 Ver Todos los Productos'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
};

export default defineConfig([monkyWorkspace, miCasaWorkspace]);
