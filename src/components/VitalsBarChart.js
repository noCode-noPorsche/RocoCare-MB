// components/VitalsBarChart.js
import { StyleSheet, Text, View } from "react-native";

const MAX_HEIGHT = 100;

export default function VitalsBarChart({
  title,
  color,
  unit,
  data,
  maxValue,
  avgValue,
}) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.metricTitle}>{title}</Text>
      <View style={styles.chartWrapper}>
        <View
          style={[
            styles.avgLine,
            { top: (1 - avgValue / maxValue) * MAX_HEIGHT },
          ]}
        />
        <View style={styles.chart}>
          {data.map((item, index) => {
            const height = (item.value / maxValue) * MAX_HEIGHT;
            return (
              <View key={index} style={styles.chartItem}>
                <View
                  style={[styles.bar, { height, backgroundColor: color }]}
                />
              </View>
            );
          })}
        </View>
      </View>
      <Text style={styles.avgText}>
        Trung bình: {avgValue} {unit}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
  metricTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
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
  avgLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: "#FFD60A",
    zIndex: 1,
  },
  avgText: {
    color: "#ccc",
    fontSize: 13,
    marginBottom: 8,
  },
});
