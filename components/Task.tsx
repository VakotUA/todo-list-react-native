import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface Props {
  task: { id: string; text: string; isDone: boolean }
  onDelete: any
  onResolve: any
}

const Task: React.FC<Props> = ({ task, onDelete, onResolve }) => {
  return (
    <TouchableOpacity
      style={styles.Task}
      onPress={onResolve.bind(null, task.id)}
      onLongPress={onDelete.bind(null, task.id)}
    >
      <Text style={[styles.Text, task.isDone && styles.Done]}>
        {task?.text}
      </Text>
    </TouchableOpacity>
  )
}

export default Task

const styles = StyleSheet.create({
  Task: {
    width: '100%',
    borderWidth: 0,
    borderColor: '#e7e7e7',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Text: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontWeight: 'bold',
  },

  Done: {
    opacity: 0.5,
    textDecorationLine: 'line-through',
  },
})
