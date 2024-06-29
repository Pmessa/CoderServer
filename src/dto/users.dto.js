import argsUtil from "../utils/args.util.js";
import crypto from "crypto";
import { createHash } from "../utils/hash.util.js";

const persistence = argsUtil.persistence;

class UsersDTO {
  constructor(data) {
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.name = data.name;
    this.email = data.email;
    this.password = createHash(data.password);
    this.role = data.role || 0;
    this.photo = data.photo || "https://cdn-icons-png.freepik.com/512/266/266033.png";
    this.verify = false;
    this.verifyCode = crypto.randomBytes(12).toString("hex")
    //verificar si corresponde o no evaluar el heasheo de la contraseña
    //porque el enrutador de sessions (/api/sessions/register) está usando PASSPORT!!!
    //pero yo acá estoy usando el CRUD de users (/api/users)
    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
    persistence !== "mongo" && (this.__v = 0);
  }
}

export default UsersDTO;
