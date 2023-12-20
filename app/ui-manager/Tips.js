// SafetyTipsScreen.js
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Linking } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { GradientBG } from '../components';

const safetyTips = [
  {
    id: 1,
    title: 'Fire Safety',
    description:
      'Learn about fire safety measures in the workplace. This includes using fire extinguishers, evacuation plans, and first aid training.',
    link: 'https://www.osha.gov/fire-safety',
    image: require('../assets/images/fire.jpg'),
  },
  {
    id: 2,
    title: 'Fall Protection',
    description:
      'Guidelines for preventing falls in the workplace. Use proper fall protection equipment and ensure a safe working environment.',
    link: 'https://www.osha.gov/fall-protection',
    image: require('../assets/images/electric.jpg'),
  },
  {
    id: 3,
    title: 'Electrical Safety',
    description:
      'Safety measures when working with electricity. Use insulated tools, follow lockout/tagout procedures, and wear appropriate personal protective equipment (PPE).',
    link: 'https://www.osha.gov/electrical-safety',
    image: require('../assets/images/ball.jpg'),
  },
  // Add more safety tips as needed
];

const SafetyTipsScreen = () => {
  const [expandedTips, setExpandedTips] = useState([]);

  const handleLinkPress = (link) => {
    Linking.openURL(link);
  };

  const handleExpandPress = (tipId) => {
    setExpandedTips((prevExpandedTips) => {
      const isTipExpanded = prevExpandedTips.includes(tipId);
      return isTipExpanded
        ? prevExpandedTips.filter((id) => id !== tipId)
        : [...prevExpandedTips, tipId];
    });
  };

  const renderSafetyTip = (tip) => {
    const isTipExpanded = expandedTips.includes(tip.id);

    return (
      <Card key={tip.id} style={styles.safetyTipItem}>
        <Card.Title style={styles.cardTitle} title={tip.title} />
        <Card.Cover source={tip.image} style={styles.cardImage} />
        <Card.Content>
          <Text style={styles.description}>
            {isTipExpanded ? tip.description : 'Click to expand'}
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => handleLinkPress(tip.link)}>Read More</Button>
          <Button onPress={() => handleExpandPress(tip.id)}>
            {isTipExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <GradientBG>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Safety Tips</Text>
        {safetyTips.map(renderSafetyTip)}
      </ScrollView>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  safetyTipItem: {
    marginBottom: 16,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 20,
  },
  cardImage: {
    margin: 8,
  },
  description: {
    fontSize: 16,
  },
});

export default SafetyTipsScreen;
