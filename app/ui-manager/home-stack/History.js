import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Gradient4 } from '../../components';
import { TopBack, GradientBG } from '../../components';

const dummyHazardData = [
  { date: '2023-01-01', incidents: 5 },
  { date: '2023-01-02', incidents: 8 },
  { date: '2023-01-03', incidents: 12 },
  // Add more dummy data as needed
];

const HazardHistoryScreen = () => {
  return (
    <GradientBG>
      <ScrollView style={styles.container}>
        <TopBack>
          <Text style={styles.header}>Hazard History</Text>
        </TopBack>

        {/* Total Incidents */}
        <View style={{ paddingHorizontal: 16 }}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Incidents</Text>
            <Text style={styles.statValue}>25</Text>
          </View>

          {/* Monthly Statistics */}
          <Text style={styles.sectionHeader}>Monthly Statistics</Text>
          <View style={styles.statsContainer}>
            <View style={styles.monthlyStat}>
              <Text style={styles.statLabel}>January</Text>
              <Text style={styles.statValue}>10</Text>
            </View>
            <View style={styles.monthlyStat}>
              <Text style={styles.statLabel}>February</Text>
              <Text style={styles.statValue}>8</Text>
            </View>
            {/* Add more monthly stats */}
          </View>

          {/* Hazard History Graph */}
          <Text style={styles.sectionHeader}>Hazard History Graph</Text>
          <LineChart
            data={{
              labels: dummyHazardData.map((entry) => entry.date),
              datasets: [
                {
                  data: dummyHazardData.map((entry) => entry.incidents),
                },
              ],
            }}
            width={350}
            height={200}
            yAxisLabel="Incidents"
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      </ScrollView>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  statCard: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  statLabel: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  statValue: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  monthlyStat: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default HazardHistoryScreen;
