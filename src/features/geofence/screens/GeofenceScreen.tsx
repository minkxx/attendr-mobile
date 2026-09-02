import { Text, View } from "react-native";
import { useGeofence } from "../hooks/useGeofence";
import { LocationDisplay } from "../components/LocationDisplay";
import { GeofenceControls } from "../components/GeofenceControls";
import { GeofenceStatus } from "../components/GeofenceStatus";

export const GeofenceScreen = () => {
  const {
    isTracking,
    insideFence,
    currentCoords,
    fenceCoords,
    distanceFromGeofence,
    startGeofencing,
    stopGeofencing,
  } = useGeofence();

  return (
    <View className="flex-1 h-full w-full items-center">
      <Text className="text-white text-2xl mt-6 font-semibold">
        Geolocation Test
      </Text>

      <Text className="text-white mt-4">
        Status: {isTracking ? "🟢 Tracking Active" : "🔴 Tracking Stopped"}
      </Text>

      <LocationDisplay
        currentCoords={currentCoords}
        fenceCoords={fenceCoords}
      />

      <View className="flex-1 px-4 mt-2">
        <GeofenceControls
          isTracking={isTracking}
          onStart={startGeofencing}
          onStop={stopGeofencing}
        />

        <GeofenceStatus
          isTracking={isTracking}
          distanceFromGeofence={distanceFromGeofence}
          insideFence={insideFence}
        />
      </View>
    </View>
  );
};
