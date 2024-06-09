import productsManager from "../data/mongo/managers/ProductsManager.mongo.js";

class Service {
  constructor(manager) {
    this.manager = manager;
  }
  async createService(data) {
    try {
      const one = await this.manager.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async readService(role) {
    try {
      const all = await this.manager.read(role);
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOneService(uid) {
    try {
      const one = await this.manager.readOne(uid);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async updateService(uid, data) {
    try {
      const one = await this.manager.update(uid, data);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroyService(uid) {
    try {
      const one = await this.manager.destroy(uid);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async paginateService({ filter, opts }) {
    try {
      const all = await productsManager.paginate({ filter, opts });
      return all;
    } catch (error) {
      throw error;
    }
  }
  async destroyAllService({ user_id: user_id }) {
    try {
      const all = await this.manager.destroyAll({ user_id: user_id });
    } catch (error) {
      throw error;
    }
  }
}

export default Service;
