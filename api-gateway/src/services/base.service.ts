import ServiceResponse from "../libs/serviceResponse.lib";

export default abstract class BaseService {
  protected readonly response: ServiceResponse;

  constructor() {
    this.response = new ServiceResponse();
  }
}
