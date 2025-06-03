import { Image, ScrollView, View, StyleSheet, Text } from "react-native";

import { mockedProviders } from "@/mocks/data";
import { CustomButtonLight } from "@/components/CustomSquareButton";

export default function Following() {
  return (
    <ScrollView>
      {mockedProviders.map((provider, idx) => {
        return (
          <View
            key={idx}
            style={{ borderBottomWidth: 1 }}
            className="flex flex-row px-4 py-3 border-black items-center gap-3 justify-between"
          >
            <Image style={styles.img} source={provider.img_src} />
            <Text className="flex-1">{provider.name}</Text>
            <CustomButtonLight
              style={{ padding: 10, margin: 0 }}
              buttonStyle={`border-2 border-secondarydark bg-transparent`}
              textStyle={`text-secondarydark text-xs`}
              text={`Following`}
              handlePress={() => {}}
            />
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 10000,
  },
});
