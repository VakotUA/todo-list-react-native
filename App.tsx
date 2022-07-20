import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native'
import Task from './components/Task'

interface ITask {
  id: string
  text: string
  isDone: boolean
}

export default function App() {
  const [input, setInput] = useState<string>('')
  const [tasks, setTasks] = useState<ITask[]>([])

  const handleAddNewTask = () => {
    if (!input.trim()) return Alert.alert('Empty task name')

    setTasks([
      ...tasks,
      { id: Date.now().toString(), text: input, isDone: false },
    ])
    setInput('')
  }

  const handleMarkAsDone = (id: string) => {
    setTasks(
      tasks.map((item) =>
        item.id !== id ? item : { ...item, isDone: !item.isDone }
      )
    )
  }

  const handleDelete = (id: string) => {
    Alert.alert('Are you shure?', 'You want to delete task', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () =>
          setTasks((prev) => prev.filter((item) => item.id !== id)),
      },
    ])
  }

  return (
    <View style={styles.MainWrapper}>
      <View style={styles.HeaderWrapper}>
        <Text style={styles.Title}>Your tasks</Text>
        <Text style={styles.SubTitle}>count: {tasks?.length}</Text>
      </View>

      <FlatList
        style={styles.List}
        keyExtractor={(item) => item.id.toString()}
        data={tasks}
        renderItem={({ item }) => (
          <Task
            task={item}
            onDelete={handleDelete}
            onResolve={handleMarkAsDone}
          />
        )}
      />

      <KeyboardAvoidingView style={styles.AddTaskWrapper}>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.Input}
          placeholder="Task"
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <TouchableOpacity activeOpacity={0.9} onPress={handleAddNewTask}>
          <View>
            <Text style={styles.AddMark}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  MainWrapper: {
    flex: 1,
  },

  HeaderWrapper: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: '#0e1d3c',
  },
  Title: {
    fontSize: 32,
    color: '#fff',
  },
  SubTitle: {
    fontSize: 18,
    color: '#fff',
  },

  List: {
    marginBottom: 100,
  },

  AddTaskWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
    backgroundColor: '#0e1d3c',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  Input: {
    backgroundColor: '#fff',
    width: 250,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  AddMark: {
    backgroundColor: '#d4145a',
    fontSize: 50,
    textAlign: 'center',
    lineHeight: 60,
    color: '#f5a8f0',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
})
