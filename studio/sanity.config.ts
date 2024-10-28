import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { contentGraphView } from "sanity-plugin-graph-view";

export default defineConfig({
  name: 'default',
  title: 'hospital-navigation',

  projectId: 'ed5c6bkr',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), contentGraphView({})],

  schema: {
    types: schemaTypes,
  },
})
