import nordCord from "node-cron";
import { updateOrderStatusToPending } from "../service/order.service";

nordCord.schedule("* * * * *", () => {
  console.log("running a task every minute");
  updateOrderStatusToPending().catch((err: any) => console.error(err));
}); //
nordCord.schedule("1,2,4,5 * * * *", () => {
  console.log("running every minute 1, 2, 4 and 5");
});
