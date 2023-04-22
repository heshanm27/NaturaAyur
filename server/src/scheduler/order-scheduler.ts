import { schedule } from "node-cron";
import { updateOrderStatusToPending } from "../service/order.service";

export const dailySchedule = schedule("* * 1 * * *", async () => {
  const value = await updateOrderStatusToPending();
  console.log(value);
});
