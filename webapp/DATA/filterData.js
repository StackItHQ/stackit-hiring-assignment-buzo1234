export const sortSpecs = [
  { id: 'ASCENDING', name: 'Ascending' },
  { id: 'DESCENDING', name: 'Descending' },
];

export const conditionTypes = [
  { id: 'NUMBER_GREATER', name: 'Greater than', type: 'number', inputs: 1 },
  {
    id: 'NUMBER_GREATER_THAN_EQ',
    name: 'Greater than and equal',
    type: 'number',
    inputs: 1,
  },
  { id: 'NUMBER_LESS', name: 'Less than', type: 'number', inputs: 1 },
  {
    id: 'NUMBER_LESS_THAN_EQ',
    name: 'Less than and equal',
    type: 'number',
    inputs: 1,
  },
  { id: 'NUMBER_EQ', name: 'Equal to', type: 'number', inputs: 1 },
  { id: 'NUMBER_NOT_EQ', name: 'Not equal to', type: 'number', inputs: 1 },
  { id: 'NUMBER_BETWEEN', name: 'Number between', type: 'text', inputs: 2 },
  {
    id: 'NUMBER_NOT_BETWEEN',
    name: 'Number not between',
    type: 'text',
    inputs: 2,
  },

  { id: 'TEXT_CONTAINS', name: 'Text contains', type: 'text', inputs: 1 },
  {
    id: 'TEXT_NOT_CONTAINS',
    name: 'Text not contains',
    type: 'text',
    inputs: 1,
  },
  { id: 'TEXT_STARTS_WITH', name: 'Text starts with', type: 'text', inputs: 1 },
  { id: 'TEXT_ENDS_WITH', name: 'Text end with', type: 'text', inputs: 1 },
  { id: 'TEXT_EQ', name: 'Text equal to', type: 'text', inputs: 1 },
  { id: 'TEXT_EQ', name: 'Text equal to', type: 'text', inputs: 1 },
];
