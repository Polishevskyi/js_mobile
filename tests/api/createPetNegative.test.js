import ErrorHandlingRequester from '../../src/api/utils/errorHendlingRequester.js';
import ExpectedError from '../../src/api/models/expectedError.js';
import { ENDPOINTS_KEY } from '../../src/api/utils/endpoints.js';
import HTTP_STATUS from '../../src/api/utils/httpStatus.js';
import CreatePetRequest from '../../src/api/models/createPetRequest.js';
import DataGenerator from '../../src/api/utils/dataGenerator.js';
import ApiConstants from '../../src/api/utils/constants.js';

describe('API - Create Pet Negative Tests', () => {
  const errorRequester = new ErrorHandlingRequester();
  const invalidDataGenerators = DataGenerator.generateInvalidPetData();

  const INVALID_INPUT_ERROR = new ExpectedError({
    statusCode: HTTP_STATUS.BAD_REQUEST,
    errorKey: 'message',
    errorMessage: ApiConstants.ERROR_MESSAGES.INVALID_INPUT,
  });

  const testCases = Object.entries(invalidDataGenerators).map(
    ([key, generator]) => ({
      description: `Verify that error is returned when ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
      petDataGenerator: generator,
    })
  );

  testCases.forEach(({ description, petDataGenerator }) => {
    it(description, async () => {
      await errorRequester.requestExpectingError(ENDPOINTS_KEY.CREATE_PET, {
        data: new CreatePetRequest(petDataGenerator()),
        expectedError: INVALID_INPUT_ERROR,
      });
    });
  });
});
