import { useState, useEffect } from "react";
import { Alert, DeviceEventEmitter } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as Sentry from "@sentry/react-native";
import { Coordinates } from "../types";
import { GEOFENCE_TASK } from "../tasks/geofenceTask";
import { calculateDistance } from "@/utils/calculate_distance";

export const useGeofence = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [insideFence, setInsideFence] = useState(false);
  const [currentCoords, setCurrentCoords] = useState<Coordinates | null>(null);
  const [fenceCoords, setFenceCoords] = useState<Coordinates | null>(null);

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

  return {
    isTracking,
    insideFence,
    currentCoords,
    fenceCoords,
    distanceFromGeofence,
    startGeofencing,
    stopGeofencing,
  };
};
