import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'edge',
  title: 'Edge',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Edge Name',
      type: 'string',
    }),
    defineField({
      name: 'location1',
      title: 'Location 1',
      type: 'reference',
      to: [{type: 'location'}]
    }),
    defineField({
        name: 'location2',
        title: 'Location 2',
        type: 'reference',
        to: [{type: 'location'}]
    })
  ],
})
