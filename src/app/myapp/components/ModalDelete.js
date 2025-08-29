import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';


export default function ModalDelete({ ModalDeleteStatus, setModalDeleteStatus, todo }){

    const { todos, setTodos } = useContext(TodosContext)

    const handleModalDeleteClose = () => {
      setModalDeleteStatus(false)
    }

    const handleDeleteTodo = () => {
      const updateFiltredTodos = todos.filter(t => {
        return t.id == todo.id ? false : true // return t.id == !todo.id
      })

      setTodos(updateFiltredTodos)
      localStorage.setItem("todos", JSON.stringify(updateFiltredTodos))

      // setModalDeleteStatus(false)
    }

    return (
      <>
      <Dialog
        onClose={handleModalDeleteClose}
        open={ModalDeleteStatus}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure To Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this task from Todo list =={">"} {todo.title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalDeleteClose}>Cancel</Button>
          <Button onClick={handleDeleteTodo} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </>
    )
}