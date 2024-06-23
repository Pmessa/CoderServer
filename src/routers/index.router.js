import { fork } from "child_process";
import CustomRouter from "./CustomRouter.js";
import indexApiRouter from "./api/index.api.router.js";
import viewsRouter from "./views/index.view.js";
import sendEmail from "../utils/mailing.utils.js";

class IndexRouter extends CustomRouter {
  init() {
    this.use("/api", indexApiRouter);
    this.use("/", viewsRouter);
    this.create("/api/nodemailer", ["PUBLIC"], async (req, res, next) => {
      try {
        const { email, name } = req.body;
        await sendEmail({ to: email, name });
        return res.message200("EMAIL SENT");
      } catch (error) {
        next(error);
      }
    });
    this.read("/fork", ["PUBLIC"], (req, res, next) => {
      try {
        const childProcess = fork("./src/processes/sum.proc.js");
        childProcess.send("start");
        childProcess.on("message", (result) => {
          return res.json({ result });
        });
      } catch (error) {
        return next(error);
      }
    });
  }
}

const indexRouter = new IndexRouter();

export default indexRouter.getRouter();