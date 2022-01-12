import UsersDBService from "./services/dbService";
import UsersRoutingService from "./services/routingService";

const usersDbService = new UsersDBService();

const usersRoutingService = new UsersRoutingService(usersDbService);

export default usersRoutingService;
