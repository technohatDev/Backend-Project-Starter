export const columns = [
  {
    name: 'Thumbnail',
    accessor: 'thumbnail',
    attr: 'thumbnail',
    type: 'image',
    mode: 'image',
    required: false,
  },
  {
    name: 'Name',
    accessor: 'name',
    attr: 'name',
    type: 'text',
    required: true,
  },
  {
    name: 'Description',
    accessor: 'description',
    attr: 'description',
    type: 'textarea',
    required: true,
  },
  {
    name: 'Category',
    accessor: 'category.name',
    attr: 'categoryId',
    mode: 'highlighted',
    type: 'select',
    options: [],
    required: true,
  },
  {
    name: 'Created At',
    accessor: 'createdAt',
    attr: 'createdAt',
    mode: 'labeled',
    type: 'date',
  },
  {
    name: 'Last Updated At',
    accessor: 'updatedAt',
    attr: 'updatedAt',
    mode: 'labeled',
    type: 'date',
  },
]