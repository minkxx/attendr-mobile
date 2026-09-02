import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { DeviceEventEmitter } from "react-native";
import * as Sentry from "@sentry/react-native";

export const GEOFENCE_TASK = "BACKGROUND_GEOFENCE_TASK";

TaskManager.defineTask(
  GEOFENCE_TASK,
  async ({ data, error }: { data: any; error: any }) => {
    if (error) {
      Sentry.captureException(error);
      console.error("Geofence Task Error:", error.message);
      return;
    }

    const { eventType, region } = data;

    if (eventType === Location.GeofencingEventType.Enter) {
      Sentry.addBreadcrumb({
        category: "geofence",
        message: `Entered region: ${region.identifier}`,
        level: "info",
      });

      console.log(`[Task] You have ENTERED the region: ${region.identifier}`);
      DeviceEventEmitter.emit("onGeofenceEvent", true);
    } else if (eventType === Location.GeofencingEventType.Exit) {
      Sentry.addBreadcrumb({
        category: "geofence",
        message: `Exited region: ${region.identifier}`,
        level: "info",
      });

      console.log(`[Task] You have EXITED the region: ${region.identifier}`);
      DeviceEventEmitter.emit("onGeofenceEvent", false);
    }
  },
);
