import DataGenerator from '../utils/dataGenerator.js';
import Requester from '../utils/requester.js';
import { ENDPOINTS_KEY } from '../utils/endpoints.js';
import CreatePetRequest from '../models/createPetRequest.js';

export class PetSteps {
  static async createPet(petData = null) {
    const data = petData || DataGenerator.generatePet();
    const requester = new Requester();

    const response = await requester.request(ENDPOINTS_KEY.CREATE_PET, {
      data: new CreatePetRequest(data),
    });

    return {
      requestData: data,
      responseData: response.data,
      status: response.status,
    };
  }

  static async getPetById(petId) {
    const requester = new Requester();

    const response = await requester.request(ENDPOINTS_KEY.GET_PET, {
      pathParams: { petId },
    });

    return {
      responseData: response.data,
      status: response.status,
    };
  }

  static async updatePet(petData) {
    const requester = new Requester();

    const response = await requester.request(ENDPOINTS_KEY.UPDATE_PET, {
      data: new CreatePetRequest(petData),
    });

    return {
      requestData: petData,
      responseData: response.data,
      status: response.status,
    };
  }

  static async deletePet(petId) {
    const requester = new Requester();

    const response = await requester.request(ENDPOINTS_KEY.DELETE_PET, {
      pathParams: { petId },
    });

    return {
      status: response.status,
    };
  }
}
