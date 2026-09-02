import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const addTask = () => {
    if (title.trim() === '' || dueDate.trim() === '') {
      Alert.alert('Error', 'Please enter the task title and due date.');
      return;
    }

    const task = {
      id: Date.now().toString(),
      title: title,
      dueDate: dueDate,
      completed: false,
    };

    setTasks([...tasks, task]);
    setTitle('');
    setDueDate('');

    Alert.alert('Success', 'Task added successfully!');
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    Alert.alert('Deleted', 'Task deleted successfully!');
  };

  const pending = tasks.filter((task) => !task.completed).length;
  const completed = tasks.filter((task) => task.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>My Tasks</Text>

            <View style={styles.studentBox}>
              <Text style={styles.name}>Juan Dela Cruz</Text>
              <Text style={styles.program}>
                BS Information Technology
              </Text>
            </View>

            <View style={styles.stats}>
              <View style={styles.statBox}>
                <Text style={styles.number}>{pending}</Text>
                <Text>Pending</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.number}>{completed}</Text>
                <Text>Completed</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.number}>{tasks.length}</Text>
                <Text>Total</Text>
              </View>
            </View>

            <Text style={styles.heading}>Add New Task</Text>

            <TextInput
              style={styles.input}
              placeholder="Task title"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={styles.input}
              placeholder="Due date"
              value={dueDate}
              onChangeText={setDueDate}
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={addTask}
            >
              <Text style={styles.buttonText}>+ Add Task</Text>
            </TouchableOpacity>

            <Text style={styles.heading}>My Task List</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.taskBox}>
            <TouchableOpacity
              style={[
                styles.checkBox,
                item.completed && styles.checked,
              ]}
              onPress={() => completeTask(item.id)}
            >
              <Text style={styles.checkText}>
                {item.completed ? '✓' : ''}
              </Text>
            </TouchableOpacity>

            <View style={styles.taskInfo}>
              <Text
                style={[
                  styles.taskTitle,
                  item.completed && styles.completed,
                ]}
              >
                {item.title}
              </Text>

              <Text style={styles.date}>
                Due: {item.dueDate}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No tasks yet.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  studentBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  program: {
    color: 'gray',
    marginTop: 5,
  },

  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  statBox: {
    backgroundColor: 'white',
    width: '31%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  number: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  addButton: {
    backgroundColor: 'blue',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  taskBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkBox: {
    width: 26,
    height: 26,
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  checked: {
    backgroundColor: 'blue',
  },

  checkText: {
    color: 'white',
    fontWeight: 'bold',
  },

  taskInfo: {
    flex: 1,
  },

  taskTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },

  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },

  date: {
    color: 'gray',
    fontSize: 12,
    marginTop: 5,
  },

  delete: {
    color: 'red',
    fontWeight: 'bold',
  },

  empty: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
});