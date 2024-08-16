import dao from "../dao/dao.factory.js";
import CartsDTO from "../dto/carts.dto.js";
const { payment } = dao;
//REPOSITORIO ES LA CAPA QUE LLAMA A DAO (DAO importa la persistencia que corresponda)
//ADEMAS ES LA CAPA ENCARGADA DE TRANSFORMAR LOS OBJETOS CON LOS DTO CORRESPONDIENTES
class PaymentRepository {
  constructor(manager) {
    this.model = manager;
  }
  createRepository = async (data) => {
    try {
      data = new PaymentsDTO(data);
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  };
  readRepository = async (filter) => {
    try {
      const all = await this.model.read(filter);
      return all;
    } catch (error) {
      throw error;
    }
  };
  readOneRepository = async (uid) => {
    try {
      const one = await this.model.readOne(uid);
      return one;
    } catch (error) {
      throw error;
    }
  };
  readByEmailRepository = async (email) => {
    try {
      const one = await this.model.readByEmail(email);
      return one;
    } catch (error) {
      throw error;
    }
  };
  updateRepository = async (uid, data) => {
    try {
      const one = await this.model.update(uid, data);
      return one;
    } catch (error) {
      throw error;
    }
  };
  destroyRepository = async (uid) => {
    try {
      const one = await this.model.destroy(uid);
      return one;
    } catch (error) {
      throw error;
    }
  };
}
