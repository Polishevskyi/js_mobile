import { expect } from 'chai';
import HTTP_STATUS from '../../src/api/utils/httpStatus.js';
import CreatePetResponse from '../../src/api/models/createPetResponse.js';
import { assertThatModels } from '../../src/api/models/comparison/modelAssertions.js';
import { PetSteps } from '../../src/api/steps/petSteps.js';
import DataGenerator from '../../src/api/utils/dataGenerator.js';

describe('API - Update Pet Tests', () => {
  it('Verify that pet can be updated successfully with new data', async () => {
    const { responseData: createdPet } = await PetSteps.createPet();
    const updatedPetData = {
      ...createdPet,
      ...DataGenerator.generatePetUpdateData(),
    };
    const { responseData: updatedPet, status } =
      await PetSteps.updatePet(updatedPetData);

    expect(status).to.equal(HTTP_STATUS.OK);
    await assertThatModels(
      new CreatePetResponse(updatedPetData),
      updatedPet
    ).match();
  });
});
