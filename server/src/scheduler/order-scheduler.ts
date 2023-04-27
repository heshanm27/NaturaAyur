import { schedule } from "node-cron";
import { updateOrderStatusToPending } from "../service/order.service";

export const dailySchedule = schedule(
  "* * 1 * * *",
  async () => {
    const value = await updateOrderStatusToPending();
    console.log(value);
  },
  {
    scheduled: false,
  }
);

export const dailyScheduleTwo = schedule(
  "* * * * * *",
  () => {
    console.log("running every minute 1, 2, 4 and 5");
  },
  {
    scheduled: false,
  }
);
