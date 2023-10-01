export const sortSpecs = [
  { id: 'ASCENDING', name: 'Ascending' },
  { id: 'DESCENDING', name: 'Descending' },
];

export const conditionTypes = [
  { id: 'NUMBER_GREATER', name: 'Greater than', type: 'number' },
  {
    id: 'NUMBER_GREATER_THAN_EQ',
    name: 'Greater than and equal',
    type: 'number',
  },
  { id: 'NUMBER_LESS', name: 'Less than', type: 'number' },
  { id: 'NUMBER_LESS_THAN_EQ', name: 'Less than and equal', type: 'number' },
  { id: 'NUMBER_EQ', name: 'Equal to', type: 'number' },
  { id: 'NUMBER_NOT_EQ', name: 'Not equal to', type: 'number' },
  /* {id:"NUMBER_BETWEEN", name:"Not equal to"}, */
  /* Add support for range values */
  { id: 'TEXT_CONTAINS', name: 'Text contains', type: 'text' },
  { id: 'TEXT_NOT_CONTAINS', name: 'Text not contains', type: 'text' },
  { id: 'TEXT_STARTS_WITH', name: 'Text starts with', type: 'text' },
  { id: 'TEXT_ENDS_WITH', name: 'Text end with', type: 'text' },
  { id: 'TEXT_EQ', name: 'Text equal to', type: 'text' },
  { id: 'TEXT_EQ', name: 'Text equal to', type: 'text' },
];
