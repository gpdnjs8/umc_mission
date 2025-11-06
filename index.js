import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./src/controllers/user.controller.js";
import { handleAddStore, handleListStoreReviews } from "./src/controllers/store.controller.js";
import { handleAddReview } from "./src/controllers/review.controller.js";
import { handleAddMission, handleListStoreMissions } from "./src/controllers/mission.controller.js";
import { handleAddUserMission, handleListUserMissionsInProgress } from "./src/controllers/userMission.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/stores", handleAddStore);
app.post("/api/v1/reviews", handleAddReview);
app.post("/api/v1/missions", handleAddMission);
app.post("/api/v1/users/missions", handleAddUserMission);

app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);
app.get("/api/v1/users/:userId/missions/inprogress", handleListUserMissionsInProgress);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});