import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Location Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
        name: 'type',
        type: 'string',
        title: 'Type',
        options: {
            list: [
              {title: 'Start', value: 'start'},
              {title: 'End', value: 'end'},
              {title: 'Elevator', value: 'elevator'},
              {title: 'Stairwell', value: 'stairwell'},
              {title: 'Intersection', value: 'intersection'}
            ],
          },
        validation: Rule => Rule.required()
    }),
    defineField({
        name: 'floor',
        title: 'Floor Number',
        type: 'number',
    }),
    defineField({
        name: 'x',
        title: 'X',
        type: 'number',
    }),
    defineField({
        name: 'y',
        title: 'Y',
        type: 'number',
    }),
    defineField({
        name: 'image3D',
        title: '3D Image',
        type: 'image',
    }),
    defineField({
        name: 'image2D',
        title: '2D Image',
        type: 'image',
    }),
  ],
})
