import { Text, View } from "react-native";

type Props = {
  isTracking: boolean;
  distanceFromGeofence: number | null;
  insideFence: boolean;
};

export const GeofenceStatus = ({
  isTracking,
  distanceFromGeofence,
  insideFence,
}: Props) => (
  <>
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
  </>
);
