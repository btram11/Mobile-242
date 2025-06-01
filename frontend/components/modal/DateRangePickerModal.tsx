// @ts-nocheck

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
  Button,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useState, useEffect } from "react";
import Divider from "../common/Divider";
import { X } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setEndDate as setRentalEndDate,
  setStartDate as setRentalStartDate,
} from "@/features/rental/rentalSlice";

const unavailableDates = ["2025-05-15", "2025-05-16", "2025-05-20"];

const providerAvailableFrom = new Date().toISOString().split("T")[0];
export const DateRangePicker: React.FC<{
  onClose: any;
  leased_period?: string | number;
}> = ({ onClose, leased_period }) => {
  const { startDate: globalStartDate, endDate: globalEndDate } = useSelector(
    (state: RootState) => state.rental
  );
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(globalStartDate);
  const [endDate, setEndDate] = useState(globalEndDate);
  const [maxDate, setMaxDate] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleDayPress = (day) => {
    const selectedDate = new Date(day.dateString);
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (startDate && (endDate || selectedDate <= start)) {
      setStartDate(
        selectedDate.getTime() === start.getTime() ? null : day.dateString
      );
      setEndDate(null);
    } else if (startDate && !endDate) {
      setEndDate(day.dateString);
    } else if (!startDate) {
      setStartDate(day.dateString);
    }
  };

  const getNextUnavailableDate = (
    inputDateStr: string,
    unavailableDates: string[]
  ) => {
    const inputDate = new Date(inputDateStr);

    const futureUnavailable = unavailableDates
      .map((dateStr) => new Date(dateStr))
      .filter((date) => date > inputDate)
      .sort((a, b) => a - b);

    return futureUnavailable.length > 0
      ? futureUnavailable[0].toISOString().split("T")[0]
      : null;
  };

  useEffect(() => {
    if (startDate && !endDate) {
      const nextUnavailableDate = getNextUnavailableDate(
        startDate,
        unavailableDates
      );
      let leasedMaxDate = null;
      if (leased_period) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + leased_period - 1);
        leasedMaxDate = date.toISOString().split("T")[0];
      }

      // So sánh và lấy ngày sớm hơn
      let finalMaxDate = null;
      if (leasedMaxDate && nextUnavailableDate) {
        finalMaxDate =
          new Date(leasedMaxDate) < new Date(nextUnavailableDate)
            ? leasedMaxDate
            : nextUnavailableDate;
      } else {
        finalMaxDate = leasedMaxDate || nextUnavailableDate || null;
      }

      setMaxDate(finalMaxDate);
    } else if (!startDate) {
      setMaxDate(null);
    }
  }, [startDate, endDate]);

  const getMarkedDates = () => {
    let marked = {};

    unavailableDates.forEach((date) => {
      marked[date] = { disabled: true, disableTouchEvent: true };
    });

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let current = new Date(start);
      current.setDate(current.getDate() + 1); // Bỏ startDate

      // Đánh dấu các ngày ở giữa
      while (current < end) {
        const dateStr = current.toISOString().split("T")[0];
        marked[dateStr] = {
          color: "#66B89F", // màu khác giữa start-end
          textColor: "#000",
        };
        current.setDate(current.getDate() + 1);
      }
      marked[endDate] = {
        endingDay: true,
        color: "#008C6E",
        textColor: "#fff",
      };
    }
    if (startDate) {
      marked[startDate] = {
        startingDay: true,
        color: "#008C6E",
        textColor: "#fff",
      };
    }
    return marked;
  };
  const handleClose = () => {
    setIsVisible(false); // chạy animation đóng
    dispatch(setRentalStartDate(startDate)); // cập nhật state trong redux
    dispatch(setRentalEndDate(endDate)); // cập nhật state trong redux
    setTimeout(() => {
      onClose(); // gọi closeModal() từ context
    }, 300); // delay để animation có thời gian chạy
  };

  return (
    <Modal
      statusBarTranslucent={true}
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View className="h-24 bg-viridian-500 flex flex-row p-4 items-end">
          <Pressable onPress={() => onClose()}>
            <X size={30} color="white" />
          </Pressable>
        </View>
        <View className="flex flex-row px-4 gap-5">
          <View
            className={`rounded-md ${
              !startDate
                ? "border-2 border-viridian-400"
                : "border-[1.5px] border-gray-400"
            } py-2 px-4 flex-1 flex-row flex items-center justify-between`}
          >
            <View>
              <Text className="font-medium">Start date</Text>
              <Text className="text-base">{startDate || "YYYY-MM-DD"}</Text>
            </View>
            <TouchableOpacity
              className="rounded-full bg-slate-300 p-1"
              onPress={() => {
                setEndDate(null);
                setStartDate(null);
              }}
            >
              <X size={15} color={"black"} />
            </TouchableOpacity>
          </View>
          <View
            className={`rounded-md ${
              startDate && !endDate
                ? "border-2 border-viridian-400"
                : "border-[1.5px] border-gray-400"
            } py-2 px-4 flex-1 flex-row flex items-center justify-between`}
          >
            <View>
              <Text className="font-medium">End date</Text>
              <Text className="text-base">{endDate || "YYYY-MM-DD"}</Text>
            </View>
            <TouchableOpacity
              className="rounded-full bg-slate-300 p-1"
              onPress={() => setEndDate(null)}
            >
              <X size={15} color={"black"} />
            </TouchableOpacity>
          </View>
        </View>

        <Divider />

        <Calendar
          theme={{
            backgroundColor: "#F7F7F7",
            calendarBackground: "#F7F7F7",
            selectedDayBackgroundColor: "#008C6E",
            todayTextColor: "#008C6E",
            arrowColor: "#008C6E",
            textSectionTitleColor: "#004027",
            textDayHeaderFontSize: 13,
            textDayHeaderFontWeight: 500,
            textMonthFontSize: 18,
            textMonthFontWeight: 500,
            textDisabledColor: "#CBD1CC",
          }}
          minDate={providerAvailableFrom}
          maxDate={maxDate}
          markedDates={getMarkedDates()}
          markingType="period"
          onDayPress={handleDayPress}
        />

        <Text className="text-center text-sm text-gray-500 mt-2">
          Maximum rental period: {leased_period} day
          {leased_period > 1 ? "s" : ""}
        </Text>

        <View className=" flex-1 justify-end">
          <View className="flex flex-row justify-between px-4 py-3 border-t-2 border-gray-200 items-center h-20">
            <Text className="text-lg ">
              {!startDate
                ? "Select start date"
                : startDate && !endDate
                ? "Select end date"
                : ""}
            </Text>
            {startDate && endDate && (
              <Pressable
                className="px-5 py-3 bg-viridian-500 rounded-md"
                onPress={handleClose}
              >
                <Text className="text-white text-base font-medium">
                  Continue
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#F7F7F7",
    // paddingVertical: 20,
    gap: 20,
  },
  closeButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
