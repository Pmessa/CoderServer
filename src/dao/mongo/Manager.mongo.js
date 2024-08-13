class Manager {
  constructor(Model) {
    this.Model = Model;
  }
  async create(data) {
    try {
      const one = await this.Model.create(data); /* .lean() */
      return one;
    } catch (error) {
      throw error;
    }
  }
  async read(filter) {
    try {
      const all = await this.Model.find(filter).lean();
      return all;
    } catch (error) {
      throw error;
    }
  }
  async paginate({ filter, opts }) {
    try {
      const all = await this.Model.paginate(filter, opts);
      return all;
    } catch (error) {
      throw error;
    }
  }

  async readCart(user_id) {
    try {
      const all = await this.Model.find({ user_id: user_id }).lean();
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = await this.Model.findById(id).lean();
      return one;
    } catch (error) {
      throw error;
    }
  }
  async readByEmail(email) {
    try {
      const one = await this.Model.findOne({ email }).lean();
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const one = await this.Model.findByIdAndUpdate(id, data, {
        new: true,
      }).lean();
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = await this.Model.findByIdAndDelete(id).lean();
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroyAll(filter) {
    try {
      const all = await this.Model.deleteMany(filter).lean();
      return all;
    } catch (error) {
      throw error;
    }
  }
  async aggregate(obj) {
    try {
      const result = await this.Model.aggregate(obj);
      return result;
    } catch (error) {
      throw error;
    }
  }
  }


export default Manager;
