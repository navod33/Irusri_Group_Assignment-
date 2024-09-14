// src/components/TodoList.js
import { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { Container, Typography, Box, Button, List, ListItem, ListItemText, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoList = () => {
  const { todos, addTodo, editTodo, deleteTodo, toggleCompletion } = useTodo();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddOrUpdate = () => {
    if (editMode) {
      editTodo(currentTodo.id, title, description);
    } else {
      addTodo(title, description);
    }
    setDialogOpen(false);
    setTitle('');
    setDescription('');
  };

  const handleEditClick = (todo) => {
    setEditMode(true);
    setCurrentTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
    setDialogOpen(true);
  };

  const handleAddClick = () => {
    setEditMode(false);
    setDialogOpen(true);
    setTitle('');
    setDescription('');
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ mt: 8, mb: 3 }}>
        Todo List
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddClick} sx={{  mb: 3 }}>
        Add Todo
      </Button>
      <List>
        {todos.map(todo => (
          <ListItem key={todo.id}>
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleCompletion(todo.id)}
            />
            <ListItemText
              primary={todo.title}
              secondary={todo.description}
            />
            <IconButton onClick={() => handleEditClick(todo)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{editMode ? 'Edit Todo' : 'Add Todo'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddOrUpdate} variant="contained" color="primary">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TodoList;
