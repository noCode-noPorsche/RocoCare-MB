import { StyleSheet, Text, View } from "react-native";
import VitalsBarChart from "./VitalsBarChart";

export default function VitalsChartCard({ data }) {
  const recentData = data.slice(0, 7).reverse();

  const heartRateData = recentData.map((d) => ({
    value: d.heartRate,
  }));
  const oxygenData = recentData.map((d) => ({
    value: d.oxygenLevel,
  }));

  const maxHeartRate = Math.max(...heartRateData.map((d) => d.value));
  const avgHeartRate = (
    heartRateData.reduce((sum, d) => sum + d.value, 0) / heartRateData.length
  ).toFixed(1);

  const maxOxygen = 100;
  const avgOxygen = (
    oxygenData.reduce((sum, d) => sum + d.value, 0) / oxygenData.length
  ).toFixed(1);

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>📊 Chỉ số sức khỏe</Text>

      <VitalsBarChart
        title="❤️ Nhịp tim (bpm)"
        color="#FF3B30"
        unit="bpm"
        data={heartRateData}
        maxValue={maxHeartRate}
        avgValue={avgHeartRate}
      />

      <VitalsBarChart
        title="🫁 Oxy trong máu (SpO₂)"
        color="#34C759"
        unit="%"
        data={oxygenData}
        maxValue={maxOxygen}
        avgValue={avgOxygen}
      />
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
  sectionTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 12,
  },
});
