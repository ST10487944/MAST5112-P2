import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function App() {
  // Variables for storing data
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [screen, setScreen] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState('');

  // Predefined courses
  const courses = ['Starters', 'Mains', 'Desserts'];

  // Preloaded demo data for visuals (mockup dishes)
  const [menuItems, setMenuItems] = useState([
    {
      id: '1',
      name: 'Garlic Bread',
      description: 'Crispy baguette slices topped with garlic butter and herbs.',
      course: 'Starters',
      price: 35.00,
    },
    {
      id: '2',
      name: 'Chicken Alfredo Pasta',
      description: 'Creamy Alfredo sauce tossed with grilled chicken and fettuccine.',
      course: 'Mains',
      price: 120.00,
    },
    {
      id: '3',
      name: 'Beef Burger Deluxe',
      description: 'Juicy beef patty with cheese, lettuce, tomato, and special sauce.',
      course: 'Mains',
      price: 110.00,
    },
    {
      id: '4',
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with a gooey molten center served with ice cream.',
      course: 'Desserts',
      price: 60.00,
    },
    {
      id: '5',
      name: 'Greek Salad',
      description: 'Fresh tomatoes, cucumbers, olives, and feta cheese drizzled with olive oil.',
      course: 'Starters',
      price: 45.00,
    },
  ]);

  // Handle adding a menu item
  const addMenuItem = () => {
    if (dishName && description && course && price) {
      const newItem = {
        id: Math.random().toString(),
        name: dishName,
        description: description,
        course: course,
        price: parseFloat(price),
      };
      setMenuItems([...menuItems, newItem]);
      setDishName('');
      setDescription('');
      setCourse('');
      setPrice('');
      setScreen('home');
    }
  };

  // Remove a menu item
  const removeMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  // Calculate total items
  const totalItems = menuItems.length;

  // Calculate average price by course
  const calculateAveragePrice = (courseType: string) => {
    const courseItems = menuItems.filter(item => item.course === courseType);
    if (courseItems.length === 0) return 0;
    const total = courseItems.reduce((sum, item) => sum + item.price, 0);
    return total / courseItems.length;
  };

  // Filter items based on selected course
  const filteredItems = selectedCourse
    ? menuItems.filter(item => item.course === selectedCourse)
    : menuItems;

  // HOME SCREEN
  if (screen === 'home') {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Christoffel's Restaurant Menu</Text>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Total Menu Items: {totalItems}</Text>
          <Text style={styles.statsText}>Avg Starters: R{calculateAveragePrice('Starters').toFixed(2)}</Text>
          <Text style={styles.statsText}>Avg Mains: R{calculateAveragePrice('Mains').toFixed(2)}</Text>
          <Text style={styles.statsText}>Avg Desserts: R{calculateAveragePrice('Desserts').toFixed(2)}</Text>
        </View>

        {/* Menu List */}
        <ScrollView style={styles.listContainer}>
          {menuItems.map((item) => (
            <View key={item.id} style={styles.menuItem}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.course}>{item.course}</Text>
              <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
              <TouchableOpacity onPress={() => removeMenuItem(item.id)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Buttons */}
        <TouchableOpacity style={styles.button} onPress={() => setScreen('add')}>
          <Text style={styles.buttonText}>Add Menu Item</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setScreen('filter')}>
          <Text style={styles.buttonText}>Filter by Course</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ADD/EDIT SCREEN
  if (screen === 'add') {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Add / Edit Menu Item</Text>

        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={dishName}
          onChangeText={setDishName}
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Select Course:</Text>
        {courses.map((courseOption) => (
          <TouchableOpacity
            key={courseOption}
            style={[
              styles.courseOption,
              course === courseOption && styles.selectedCourse,
            ]}
            onPress={() => setCourse(courseOption)}
          >
            <Text style={styles.courseText}>{courseOption}</Text>
          </TouchableOpacity>
        ))}

        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={addMenuItem}>
          <Text style={styles.buttonText}>Save Item</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setScreen('home')}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // FILTER SCREEN
  if (screen === 'filter') {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Filter Menu by Course</Text>

        <Text style={styles.label}>Select Course:</Text>
        {courses.map((courseOption) => (
          <TouchableOpacity
            key={courseOption}
            style={[
              styles.courseOption,
              selectedCourse === courseOption && styles.selectedCourse,
            ]}
            onPress={() => setSelectedCourse(courseOption)}
          >
            <Text style={styles.courseText}>{courseOption}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.button} onPress={() => setSelectedCourse('')}>
          <Text style={styles.buttonText}>Clear Filter</Text>
        </TouchableOpacity>

        <ScrollView style={styles.listContainer}>
          {filteredItems.map((item) => (
            <View key={item.id} style={styles.menuItem}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.course}>{item.course}</Text>
              <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={() => setScreen('home')}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333333',
  },
  statsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  statsText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333333',
  },
  listContainer: {
    flex: 1,
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginVertical: 5,
  },
  course: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#50E3C2',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333333',
  },
  courseOption: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  selectedCourse: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  courseText: {
    fontSize: 16,
    color: '#333333',
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  removeText: {
    color: '#F44336',
    marginTop: 5,
    fontWeight: '600',
  },
})