import BaseModel from './baseModel.js';

export default class CreatePetRequest extends BaseModel {
  constructor({ id, category, name, photoUrls, tags, status }) {
    super({ id, category, name, photoUrls, tags, status });
  }

  static get validationRules() {
    return {
      id: { type: 'number', min: 0 },
      category: {
        type: 'object',
        properties: {
          id: { type: 'number', min: 0 },
          name: { type: 'string', regex: /^[A-Za-z]{3,10}$/ },
        },
      },
      name: { type: 'string', regex: /^[A-Za-z]{3,15}$/ },
      photoUrls: { type: 'array', minItems: 1 },
      tags: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', min: 0 },
            name: { type: 'string', regex: /^[A-Za-z]{3,10}$/ },
          },
        },
      },
      status: { type: 'string', enum: ['available', 'pending', 'sold'] },
    };
  }
}
