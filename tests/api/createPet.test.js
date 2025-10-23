import { expect } from 'chai';
import HTTP_STATUS from '../../src/api/utils/httpStatus.js';
import CreatePetResponse from '../../src/api/models/createPetResponse.js';
import { assertThatModels } from '../../src/api/models/comparison/modelAssertions.js';
import { PetSteps } from '../../src/api/steps/petSteps.js';

describe('API - Create Pet Tests', () => {
  it('Verify that pet can be created successfully with valid data', async () => {
    const { requestData, responseData, status } = await PetSteps.createPet();

    expect(status).to.equal(HTTP_STATUS.OK);
    await assertThatModels(
      new CreatePetResponse(requestData),
      responseData
    ).match();
  });
});
