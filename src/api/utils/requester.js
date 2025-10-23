import HttpClient from './httpClient.js';
import endpoints from './endpoints.js';
import ApiConstants from './constants.js';

export default class Requester {
  constructor() {
    this.httpClient = new HttpClient();
  }

  async request(
    endpointKey,
    { data = null, config = {}, pathParams = {} } = {}
  ) {
    const endpoint = endpoints[endpointKey];

    if (!endpoint) {
      throw new Error(
        ApiConstants.ERROR_MESSAGES.ENDPOINT_NOT_FOUND.replace(
          '{endpointKey}',
          endpointKey
        )
      );
    }

    let {
      url,
      method = ApiConstants.DEFAULT_HTTP_METHOD,
      responseModel,
    } = endpoint;

    if (typeof url === 'function') {
      url = url(...Object.values(pathParams));
    }

    const requestData = data?.toJson ? data.toJson() : data;
    const httpMethod = method.toLowerCase();

    try {
      let response;

      if (httpMethod === 'get') {
        response = await this.httpClient.get(url, {
          params: requestData,
          ...config,
        });
      } else if (httpMethod === 'delete') {
        response = await this.httpClient.delete(url, config);
      } else if (httpMethod === 'post' || httpMethod === 'put') {
        response = await this.httpClient[httpMethod](url, requestData, config);
      } else {
        response = await this.httpClient[httpMethod](url, requestData, config);
      }

      const responseData = responseModel
        ? this.#instantiateModel(responseModel, response.data)
        : response.data;

      return {
        data: responseData,
        status: response.status,
        headers: response.headers,
      };
    } catch (error) {
      throw error;
    }
  }

  #instantiateModel(ModelClass, data) {
    if (typeof ModelClass.fromJson === 'function') {
      return ModelClass.fromJson(data);
    }
    return new ModelClass(data);
  }
}
