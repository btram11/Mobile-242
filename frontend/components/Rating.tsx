// import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Star } from "@/components/ui/SvgIcon";

export default function Rating({
  rating,
  className,
}: {
  className?: string;
  rating: number;
}) {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const starColor = "#FFBB29";
  const strokeColor = "#FFBB29";
  const strokeWidth = 1.2;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          size={19}
          color={starColor}
          strokeColor={starColor}
          percision={1}
          strokeWidth={strokeWidth}
        />
      );
    }

    if (halfStars) {
      stars.push(
        <Star
          key="half"
          size={19}
          color={starColor}
          strokeColor={starColor}
          percision={rating % 1}
          strokeWidth={strokeWidth}
        />
      );
    }

    // Add empty stars if needed (up to 5 stars)
    for (let i = fullStars + halfStars; i < 5; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          size={19}
          color={starColor}
          strokeColor={strokeColor}
          percision={0}
          strokeWidth={strokeWidth}
        />
      );
    }
    return stars;
  };
  return (
    <View className="flex-row items-center">
      {renderStars()}
      <Text className={`ml-2 text-md ${className}`}>({rating ?? "N/A"})</Text>
    </View>
  );
}
