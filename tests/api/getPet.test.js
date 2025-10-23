import { expect } from 'chai';
import HTTP_STATUS from '../../src/api/utils/httpStatus.js';
import CreatePetResponse from '../../src/api/models/createPetResponse.js';
import { assertThatModels } from '../../src/api/models/comparison/modelAssertions.js';
import { PetSteps } from '../../src/api/steps/petSteps.js';

describe('API - Get Pet Tests', () => {
  it('Verify that pet can be retrieved successfully by ID', async () => {
    const { responseData: createdPet } = await PetSteps.createPet();
    const { responseData, status } = await PetSteps.getPetById(createdPet.id);

    expect(status).to.equal(HTTP_STATUS.OK);
    await assertThatModels(
      new CreatePetResponse(responseData),
      responseData
    ).match();
  });
});
