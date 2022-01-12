import AuthDBService from "./services/dbService";
import AuthRoutingService from "./services/routingService";

const authDbService = new AuthDBService();

const authRoutingService = new AuthRoutingService(authDbService);

export default authRoutingService;
