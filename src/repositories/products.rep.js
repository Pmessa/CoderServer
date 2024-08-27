import dao from "../dao/dao.factory.js";
import ProductsDTO from "../dto/products.dto.js";
const { products } = dao;
//REPOSITORIO ES LA CAPA QUE LLAMA A DAO (DAO importa la persistencia que corresponda)
//ADEMAS ES LA CAPA ENCARGADA DE TRANSFORMAR LOS OBJETOS CON LOS DTO CORRESPONDIENTES

class ProductsRepository {
  constructor(manager) {
    this.model = manager;
  }
  createRepository = async (data) => {
    try {
      data = new ProductsDTO(data);
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
  readOneRepository = async (pid) => {
    try {
      const one = await this.model.readOne(pid);
      return one;
    } catch (error) {
      throw error;
    }
  };
  updateRepository = async (pid, data) => {
    try {
      const one = await this.model.update(pid, data);
      return one;
    } catch (error) {
      throw error;
    }
  };
  destroyRepository = async (pid) => {
    try {
      const one = await this.model.destroy(pid);
      return one;
    } catch (error) {
      throw error;
    }
  };
  paginateRepository = async ({ filter, opts }) => {
    try {
      const all = await this.model.paginate({ filter, opts });
      return all
    } catch (error) {
      throw error;
    }
  };
  destroyAllRepository = async ({ user_id: user_id }) => {
    try {
      const all = await this.model.destroyAll({ user_id: user_id });
    } catch (error) {
      throw error;
    }
  };
}

const productsRepository = new ProductsRepository(products);
export default productsRepository;

