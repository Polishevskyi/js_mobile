import CreatePetRequest from '../models/createPetRequest.js';
import CreatePetResponse from '../models/createPetResponse.js';

export const ENDPOINTS_KEY = {
  CREATE_PET: 'CREATE_PET',
  GET_PET: 'GET_PET',
  UPDATE_PET: 'UPDATE_PET',
  DELETE_PET: 'DELETE_PET',
};

const endpoints = {
  [ENDPOINTS_KEY.CREATE_PET]: {
    url: '/pet',
    method: 'post',
    requestModel: CreatePetRequest,
    responseModel: CreatePetResponse,
  },
  [ENDPOINTS_KEY.GET_PET]: {
    url: (petId) => `/pet/${petId}`,
    method: 'get',
    responseModel: CreatePetResponse,
  },
  [ENDPOINTS_KEY.UPDATE_PET]: {
    url: '/pet',
    method: 'put',
    requestModel: CreatePetRequest,
    responseModel: CreatePetResponse,
  },
  [ENDPOINTS_KEY.DELETE_PET]: {
    url: (petId) => `/pet/${petId}`,
    method: 'delete',
  },
};

export default endpoints;
