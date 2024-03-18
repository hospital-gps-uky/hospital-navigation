import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'map',
  title: 'Map',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Map Name',
      type: 'string',
    }),
    defineField({
      name: 'floor',
      title: 'Floor Number',
      type: 'number',
    }),
    defineField({
        name: 'image',
        title: 'Map Image',
        type: 'image'
    })
  ],
})
