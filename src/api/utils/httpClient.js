import axios from 'axios';
import dotenv from 'dotenv';
import ApiConstants from './constants.js';
import Logger from '../../../helpers/logger.js';

dotenv.config();

const backendUrl = process.env.API_BASE_URL;

export default class HttpClient {
  constructor() {
    this.client = axios.create({
      baseURL: backendUrl,
      headers: {
        'Content-Type': ApiConstants.HEADERS.CONTENT_TYPE,
        Accept: ApiConstants.HEADERS.ACCEPT,
      },
    });
  }

  async get(url, config = {}) {
    try {
      Logger.apiRequest('GET', url);
      const response = await this.client.get(url, config);
      Logger.apiResponse(response.status, response.data);
      return response;
    } catch (error) {
      if (error.response) {
        Logger.error(`GET request failed: ${error.response.status} - ${url}`);
        throw {
          message: ApiConstants.ERROR_MESSAGES.REQUEST_FAILED.replace(
            '{status}',
            error.response.status
          ),
          response: error.response,
        };
      }
      Logger.error(`GET request error: ${error.message} - ${url}`);
      throw error;
    }
  }

  async post(url, data, config = {}) {
    try {
      Logger.apiRequest('POST', url, data);
      const response = await this.client.post(url, data, config);
      Logger.apiResponse(response.status, response.data);
      return response;
    } catch (error) {
      if (error.response) {
        Logger.error(`POST request failed: ${error.response.status} - ${url}`);
        throw {
          message: ApiConstants.ERROR_MESSAGES.REQUEST_FAILED.replace(
            '{status}',
            error.response.status
          ),
          response: error.response,
        };
      }
      Logger.error(`POST request error: ${error.message} - ${url}`);
      throw error;
    }
  }

  async put(url, data, config = {}) {
    try {
      Logger.apiRequest('PUT', url, data);
      const response = await this.client.put(url, data, config);
      Logger.apiResponse(response.status, response.data);
      return response;
    } catch (error) {
      if (error.response) {
        Logger.error(`PUT request failed: ${error.response.status} - ${url}`);
        throw {
          message: ApiConstants.ERROR_MESSAGES.REQUEST_FAILED.replace(
            '{status}',
            error.response.status
          ),
          response: error.response,
        };
      }
      Logger.error(`PUT request error: ${error.message} - ${url}`);
      throw error;
    }
  }

  async delete(url, config = {}) {
    try {
      Logger.apiRequest('DELETE', url);
      const response = await this.client.delete(url, config);
      Logger.apiResponse(response.status);
      return response;
    } catch (error) {
      if (error.response) {
        Logger.error(
          `DELETE request failed: ${error.response.status} - ${url}`
        );
        throw {
          message: ApiConstants.ERROR_MESSAGES.REQUEST_FAILED.replace(
            '{status}',
            error.response.status
          ),
          response: error.response,
        };
      }
      Logger.error(`DELETE request error: ${error.message} - ${url}`);
      throw error;
    }
  }
}
