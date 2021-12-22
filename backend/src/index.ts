import exrpress, { json } from "express";
import { AppRoutes } from "./types/Router";
import createDb from "./model";
import router from "./routes";

// Initiate Db and express App
createDb();
const app = exrpress();

// Add middleware
app.use(json());

// Add routes
app.use(AppRoutes.users, router.users);
app.use(AppRoutes.auth, router.auth);
app.use(AppRoutes.profile, router.profile);

// Start app
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Port is runing on port: ${PORT}`);
});
