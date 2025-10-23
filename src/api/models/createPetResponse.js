import BaseModel from './baseModel.js';

export default class CreatePetResponse extends BaseModel {
  constructor({ id, category, name, photoUrls, tags, status }) {
    super({ id, category, name, photoUrls, tags, status });
  }
}
