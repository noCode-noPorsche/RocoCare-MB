import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SPo2Icon from "../assets/spo2_blue.svg";
import moment from "moment";

const MAX_HEIGHT = 100;

export default function VitalsOxygenChart({ data, latestValue, latestTime }) {
  const recentData = data.slice(0, 7).reverse();
  const maxOxygen = 100;
  const avgOxygen = (
    recentData.reduce((sum, d) => sum + d.oxygenLevel, 0) / recentData.length
  ).toFixed(1);

  let status = "";
  let statusColor = "";
  const avg = parseFloat(avgOxygen);

  if (avg >= 95) {
    status = "Bình thường";
    statusColor = "#2260FF";
  } else if (avg >= 90) {
    status = "Không ổn định";
    statusColor = "#FF9500";
  } else {
    status = "Nguy hiểm";
    statusColor = "#FF3B30";
  }

  return (
    <View style={styles.card}>
      <View style={styles.metricTitle}>
        <SPo2Icon
          width={26}
          height={26}
          fill="#2260FF"
          style={{ marginRight: 0 }}
        />
        <Text style={styles.metricTitleText}>Oxy trong máu (SpO₂)</Text>
      </View>
      <View style={styles.chartWrapper}>
        <View
          style={[
            styles.avgLine,
            { top: (1 - avgOxygen / maxOxygen) * MAX_HEIGHT },
          ]}
        />
        <View style={styles.chart}>
          {recentData.map((item, index) => {
            const height = (item.oxygenLevel / maxOxygen) * MAX_HEIGHT;
            return (
              <View key={index} style={styles.chartItem}>
                <View
                  style={[styles.bar, { height, backgroundColor: "#34C759" }]}
                />
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.viewAvg}>
        <Text style={styles.avgText}>Trung bình: {avgOxygen}%</Text>
        <Text style={styles.statusText}>
          Tình trạng:
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
          Chỉ số mới nhất: {latestValue ?? "--"} %
        </Text>
        <Text>
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
    margin: 16,
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
  viewNow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  bar: {
    width: 12,
    borderRadius: 6,
  },
  avgLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: "#FFD60A",
    zIndex: 1,
  },
  viewAvg: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avgText: {
    color: "#000",
    fontSize: 14,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "400",
  },
  latestText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
    // marginBottom: 4,
  },
});
