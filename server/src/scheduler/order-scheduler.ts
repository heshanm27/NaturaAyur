import { schedule } from "node-cron";
import { updateOrderStatusToPending } from "../service/order.service";

export const dailySchedule = schedule("* * 1 * * *", async () => {
  const value = await updateOrderStatusToPending();
  console.log(value);
});

export const dailyScheduleTwo = schedule("1,2,4,5 * * * *", () => {
  console.log("running every minute 1, 2, 4 and 5");
});
