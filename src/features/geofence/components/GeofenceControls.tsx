import { Text, TouchableOpacity } from "react-native";

type Props = {
  isTracking: boolean;
  onStart: () => void;
  onStop: () => void;
};

export const GeofenceControls = ({ isTracking, onStart, onStop }: Props) => (
  <TouchableOpacity
    className="bg-slate-800 px-4 py-2 rounded-md items-center"
    onPress={isTracking ? onStop : onStart}
  >
    <Text className="text-white text-xl">
      {isTracking ? "Stop Geofencing" : "Start Geofencing"}
    </Text>
  </TouchableOpacity>
);
