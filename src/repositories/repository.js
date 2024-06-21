class Repository {
  constructor(manager) {
    this.model = manager;
  }
  createRepository = async (data) => {
    try {
      const one = await this.repository.createRepository(data);
      return one;
    } catch (error) {
      throw error;
    }
  };
  readRepository = async (filter) => {
    try {
      const all = await this.repository.readRepository(filter);
      return all;
    } catch (error) {
      throw error;
    }
  };
  readOneRepository = async (uid) => {
    try {
      const one = await this.repository.readOneRipository(uid);
      return one;
    } catch (error) {
      throw error;
    }
  };
  updateRepository = async (uid, data) => {
    try {
      const one = await this.repository.updateRepository(uid, data);
      return one;
    } catch (error) {
      throw error;
    }
  };
  destroyRepository = async (uid) => {
    try {
      const one = await this.repository.destroyRepository(uid);
      return one;
    } catch (error) {
      throw error;
    }
  };
  paginateRepository = async ({ filter, opts }) => {
    try {
      const all = await this.repository.paginateRepository({ filter, opts });
      return all;
    } catch (error) {
      throw error;
    }
  };
  destroyAllRepository = async ({ user_id: user_id }) => {
    try {
      const all = await this.repository.destroyAllRepository({ user_id: user_id });
    } catch (error) {
      throw error;
    }
  };
}

export default Repository;
