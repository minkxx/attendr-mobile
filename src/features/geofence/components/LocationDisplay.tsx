import { Text, View } from "react-native";
import { Coordinates } from "../types";

type Props = {
  currentCoords: Coordinates | null;
  fenceCoords: Coordinates | null;
};

export const LocationDisplay = ({ currentCoords, fenceCoords }: Props) => (
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
);
