import React from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";

const data = [
  { label: "T4", value: 10 },
  { label: "T5", value: 30 },
  { label: "T6", value: 35 },
  { label: "T7", value: 32 },
  { label: "CN", value: 80 },
  { label: "T2", value: 28 },
  { label: "T3", value: 25 },
];

const MAX_HEIGHT = 100;

export default function HighlightCard() {
  const avg = 29.7;
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Điểm nổi bật</Text>
      <View style={styles.content}>
        <Text style={styles.title}>🔥 Năng lượng hoạt động</Text>
        <Text style={styles.subtitle}>
          Bạn đã đốt cháy trung bình{" "}
          <Text style={{ fontWeight: "bold" }}>{avg} kilôcalo</Text> một ngày
          trong 7 ngày qua.
        </Text>

        <View style={styles.chartContainer}>
          <View style={styles.avgLine} />
          <View style={styles.chart}>
            {data.map((item, index) => {
              const height = (item.value / maxValue) * MAX_HEIGHT;
              return (
                <View key={index} style={styles.chartItem}>
                  <View style={[styles.bar, { height }]} />
                  <Text style={styles.label}>{item.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.avgLabel}>Kilôcalo trung bình</Text>
          <Text style={styles.avgValue}>{avg} kcal</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1C1C1E",
    borderRadius: 16,
    padding: 16,
    margin: 16,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 8,
    fontWeight: "600",
  },
  content: {
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 16,
    color: "#FF9500",
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 12,
  },
  chartContainer: {
    position: "relative",
    marginBottom: 12,
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: MAX_HEIGHT,
    paddingHorizontal: 4,
  },
  chartItem: {
    alignItems: "center",
    width: 24,
  },
  bar: {
    backgroundColor: "#999",
    width: 12,
    borderRadius: 6,
  },
  label: {
    color: "#ccc",
    fontSize: 12,
    marginTop: 4,
  },
  avgLine: {
    position: "absolute",
    top: (1 - 29.7 / 80) * MAX_HEIGHT,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#FF9500",
    zIndex: 1,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avgLabel: {
    color: "#ccc",
    fontSize: 14,
  },
  avgValue: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
});
