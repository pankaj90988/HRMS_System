
import { getUsersPersonalDetailsByIds } from "../controllers/employee.controller";

  
// } from "../controllers/employee.controller.js";
const router = express.Router();


router.get("/", getUsersPersonalDetailsByIds);
