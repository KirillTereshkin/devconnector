import ProfileDBService from "./services/dbService";
import ProfileRoutingService from "./services/routingService";

const profileDbService = new ProfileDBService();

const profileRoutingService = new ProfileRoutingService(profileDbService);

export default profileRoutingService;
