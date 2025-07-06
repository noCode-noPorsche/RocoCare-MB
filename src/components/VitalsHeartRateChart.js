import { StyleSheet, Text, View } from "react-native";
import MHRIcon from "../assets/heart_rate_blue.svg";
import moment from "moment";

const MAX_HEIGHT = 100;

export default function VitalsHeartRateChart({
  data,
  latestValue,
  latestTime,
}) {
  const recentData = data.slice(0, 7).reverse();
  const maxHeartRate = Math.max(...recentData.map((d) => d.heartRate));
  const avgHeartRate = (
    recentData.reduce((sum, d) => sum + d.heartRate, 0) / recentData.length
  ).toFixed(1);

  let status = "";
  let statusColor = "";

  const avg = parseFloat(avgHeartRate);

  if (avg >= 60 && avg <= 100) {
    status = "Bình thường";
    statusColor = "#2260FF"; // xanh
  } else if ((avg >= 50 && avg < 60) || (avg > 100 && avg <= 110)) {
    status = "Không ổn định";
    statusColor = "#FF9500"; // cam
  } else {
    status = "Nguy hiểm";
    statusColor = "#FF3B30"; // đỏ
  }

  return (
    <View style={styles.card}>
      <View style={styles.metricTitle}>
        <MHRIcon width={26} height={26} style={{ marginRight: 0 }} />
        <Text style={styles.metricTitleText}>Nhịp tim (bpm)</Text>
      </View>
      <View style={styles.chartWrapper}>
        <View
          style={[
            styles.avgLine,
            { top: (1 - avgHeartRate / maxHeartRate) * MAX_HEIGHT },
          ]}
        />
        <View style={styles.chart}>
          {recentData.map((item, index) => {
            const height = (item.heartRate / maxHeartRate) * MAX_HEIGHT;
            return (
              <View key={index} style={styles.chartItem}>
                <View
                  style={[styles.bar, { height, backgroundColor: "#FF3B30" }]}
                />
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.viewAvg}>
        <Text style={styles.avgText}>Trung bình: {avgHeartRate} bpm</Text>
        <Text style={[styles.statusText]}>
          Tình trạng:{" "}
          <Text
            style={[styles.statusText, { color: statusColor, fontWeight: 500 }]}
          >
            {" "}
            {status}
          </Text>
        </Text>
      </View>
      <View style={styles.viewNow}>
        <Text style={styles.latestText}>
          Chỉ số mới nhất: {latestValue ?? "--"} bpm
        </Text>
        <Text>
          {" "}
          {latestTime ? moment(latestTime).format("HH:mm DD/MM") : "N/A"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#CAD6FF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
  },
  metricTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    alignContent: "center",
    gap: 4,
    // justifyContent: "center",
  },
  metricTitleText: {
    fontSize: 16,
    color: "#2260FF",
    fontWeight: "bold",
  },
  chartWrapper: {
    position: "relative",
    height: MAX_HEIGHT,
    marginBottom: 8,
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: MAX_HEIGHT,
  },
  chartItem: {
    alignItems: "center",
    width: 16,
  },
  bar: {
    width: 12,
    borderRadius: 6,
  },
  viewAvg: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewNow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  avgLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: "#FFD60A",
    zIndex: 1,
  },
  avgText: {
    color: "#000",
    fontSize: 13,
    // marginTop: 4,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "400",
  },
  latestText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
    // marginBottom: 4,
  },
});
