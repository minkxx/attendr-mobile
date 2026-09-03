import { calculateDistance } from "@/utils/calculate_distance";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { useEffect, useState } from "react";
import {
  Alert,
  DeviceEventEmitter,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Sentry from "@sentry/react-native";

const GEOFENCE_TASK = "BACKGROUND_GEOFENCE_TASK";

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

type Coordinates = { latitude: number; longitude: number };

export default function Index() {
  const [isTracking, setIsTracking] = useState(false);
  const [insideFence, setInsideFence] = useState(false);

  const [currentCoords, setCurrentCoords] = useState<Coordinates | null>(null);
  const [fenceCoords, setFenceCoords] = useState<Coordinates | null>(null);

  useEffect(() => {
    // TODO: Replace with actual logged in user data
    Sentry.setUser({
      id: "student_12345",
      username: "johndoe",
      email: "john.doe@university.edu",
    });

    // Clear user on unmount or when they log out
    return () => {
      Sentry.setUser(null);
    };
  }, []);

  useEffect(() => {
    const checkStatus = async () => {
      const isRegistered =
        await TaskManager.isTaskRegisteredAsync(GEOFENCE_TASK);
      setIsTracking(isRegistered);
    };
    checkStatus();

    const subscription = DeviceEventEmitter.addListener(
      "onGeofenceEvent",
      (isInside: boolean) => {
        setInsideFence(isInside);
      },
    );

    let locationWatcher: Location.LocationSubscription | null = null;
    const startWatchingLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          locationWatcher = await Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.Balanced,
              timeInterval: 2000,
              distanceInterval: 1,
            },
            (location) => {
              setCurrentCoords({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              });
            },
          );
        } else {
          Sentry.addBreadcrumb({
            category: "permissions",
            message: "User denied foreground location permission",
            level: "warning",
          });
        }
      } catch (err) {
        Sentry.captureException(err);
      }
    };
    startWatchingLocation();

    return () => {
      subscription.remove();
      if (locationWatcher) {
        locationWatcher.remove();
      }
    };
  }, []);

  let distanceFromGeofence: number | null = null;
  if (currentCoords && fenceCoords) {
    distanceFromGeofence = calculateDistance(
      currentCoords.latitude,
      currentCoords.longitude,
      fenceCoords.latitude,
      fenceCoords.longitude,
    );
  }

  const requestPermissions = async () => {
    const { status: foregroundStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Foreground location permission is required.",
      );
      return false;
    }

    const { status: backgroundStatus } =
      await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Background location permission is required for geofencing.",
      );
      return false;
    }

    return true;
  };

  const startGeofencing = async () => {
    Sentry.addBreadcrumb({
      category: "ui.action",
      message: "Student tapped Start Geofencing",
      level: "info",
    });

    const granted = await requestPermissions();
    if (!granted) return;

    try {
      const currentLoc = await Location.getCurrentPositionAsync({});

      setFenceCoords({
        latitude: currentLoc.coords.latitude,
        longitude: currentLoc.coords.longitude,
      });

      const regions = [
        {
          identifier: "My_Room_Or_House",
          latitude: currentLoc.coords.latitude,
          longitude: currentLoc.coords.longitude,
          radius: 20,
          notifyOnEnter: true,
          notifyOnExit: true,
        },
      ];

      await Location.startGeofencingAsync(GEOFENCE_TASK, regions);
      setIsTracking(true);
      setInsideFence(true);

      Alert.alert(
        "Success",
        "Geofence activated! Walk 20+ meters away to test.",
      );
    } catch (err: any) {
      console.error(err);
      Sentry.captureException(err);
      Alert.alert("Error", "Failed to start geofencing.");
    }
  };

  const stopGeofencing = async () => {
    Sentry.addBreadcrumb({
      category: "ui.action",
      message: "Student tapped Stop Geofencing",
      level: "info",
    });

    try {
      await Location.stopGeofencingAsync(GEOFENCE_TASK);
      setIsTracking(false);
      setFenceCoords(null);
      setInsideFence(false);
      Alert.alert("Stopped", "Geofencing has been stopped.");
    } catch (err) {
      console.error(err);
      Sentry.captureException(err);
    }
  };

  return (
    <View className="flex-1 h-full w-full items-center">
      <Text className="text-white text-2xl mt-6 font-semibold">
        Geolocation Test
      </Text>

      <Text className="text-white mt-4">
        Status: {isTracking ? "🟢 Tracking Active" : "🔴 Tracking Stopped"}
      </Text>

      <View className="w-full px-8 mt-6">
        <Text className="text-gray-300 mb-1 text-center font-bold">
          Your Location:
        </Text>
        <Text className="text-white mb-4 text-center">
          {currentCoords
            ? `${currentCoords.latitude.toFixed(5)}, ${currentCoords.longitude.toFixed(5)}`
            : "Locating..."}
        </Text>

        <Text className="text-gray-300 mb-1 text-center font-bold">
          Geofence Center:
        </Text>
        <Text className="text-white mb-6 text-center">
          {fenceCoords
            ? `${fenceCoords.latitude.toFixed(5)}, ${fenceCoords.longitude.toFixed(5)}`
            : "Not Set"}
        </Text>
      </View>

      <View className="flex-1 px-4 mt-2">
        <TouchableOpacity
          className="bg-slate-800 px-4 py-2 rounded-md items-center"
          onPress={isTracking ? stopGeofencing : startGeofencing}
        >
          <Text className="text-white text-xl">
            {isTracking ? "Stop Geofencing" : "Start Geofencing"}
          </Text>
        </TouchableOpacity>

        <View className="w-full px-8 mt-4 items-center">
          <Text className="text-gray-300 font-bold mb-1">Live Distance:</Text>
          <Text className="text-yellow-400 font-bold text-xl">
            {distanceFromGeofence !== null
              ? `${distanceFromGeofence.toFixed(2)} meters`
              : isTracking
                ? "Calculating..."
                : "Geofence Inactive"}
          </Text>
        </View>

        <Text
          className={`mt-8 text-xl text-center font-bold ${insideFence ? "text-green-400" : "text-red-400"}`}
        >
          {insideFence ? "Inside Fence" : "Outside Fence"}
        </Text>
      </View>
    </View>
  );
}
