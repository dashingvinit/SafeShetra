// EmergencyContactsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons from react-native-vector-icons
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome from react-native-vector-icons
import { TopBack } from '../../components';

const emergencyContacts = [
  { id: '1', name: 'Police', number: '911' },
  { id: '2', name: 'Manager', number: '123-456-7890' },
  { id: '3', name: 'Home', number: '987-654-3210' },
  { id: '4', name: 'Amita', number: '987-650-3210' },
  // Add more contacts as needed
];

const EmergencyContactsScreen = ({ navigation }) => {
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.contactItem}>
      <View style={styles.contactInfo}>
        <Image
          source={require('../../assets/images/home.jpg')}
          style={styles.contactImage}
        />
        <View>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactNumber}>{item.number}</Text>
        </View>
      </View>
      <View style={styles.contactActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
          onPress={() => handleWhatsAppMessage(item.number)}>
          <FontAwesomeIcon name="whatsapp" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#2196F3' }]}
          onPress={() => handleRemoveContact(item.id)}>
          <Icon name="remove" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const handleWhatsAppMessage = (phoneNumber) => {
    // Implement WhatsApp message functionality here
    alert(`Sending WhatsApp message to ${phoneNumber}`);
  };

  const handleRemoveContact = (contactId) => {
    // Implement contact removal functionality here
    alert(`Removing contact with ID ${contactId}`);
  };

  const handleAddContact = () => {
    // Implement adding a new contact functionality here
    alert(`Adding new contact: ${newContactName}, ${newContactNumber}`);
    // You can update the emergencyContacts array or your database accordingly
  };

  return (
    <View style={styles.container}>
      <TopBack />
      <View style={{ flex: 1, marginHorizontal: 8 }}>
        <Text style={styles.title}>Emergency Contacts</Text>
        <FlatList
          data={emergencyContacts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.addContactContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newContactName}
          onChangeText={(text) => setNewContactName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          value={newContactNumber}
          onChangeText={(text) => setNewContactNumber(text)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
          <Text style={styles.addButtonText}>Add Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 16,
    color: '#666',
  },
  contactActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addContactContainer: {
    margin: 16,
    marginBottom: 100,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default EmergencyContactsScreen;
