import exrpress, { json } from "express";

const app = exrpress();

app.use(json());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Port is runing on port: ${PORT}`);
});
