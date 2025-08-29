import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { useContext, useState } from 'react';
import { TodosContext } from '../contexts/TodosContext';


export default function ModalEdit({ ModalEditStatus, setModalEditStatus, todo }){

    const { todos, setTodos } = useContext(TodosContext)

    const [editedTodo, setEditedTodo] = useState({
        title: todo.title,
        details: todo.details
    })

    const handleModalEditClose = () => {
        setModalEditStatus(false)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditedTodo({...editedTodo, [name]: value})
    }

    const handleSubmit = () => {

        const updatedTodos = todos.map(t => {
            if(t.id == todo.id){
                return {...t, title: editedTodo.title, details: editedTodo.details}
            }else{
                return t
            }
        })

        setTodos(updatedTodos)
        localStorage.setItem("todos", JSON.stringify(updatedTodos))

        handleModalEditClose(false)
    };

    return (
        <>
            <Dialog open={ModalEditStatus} onClose={handleModalEditClose}>
                <DialogTitle>Edit your Todo tasks</DialogTitle>
                <DialogContent>
                    <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="title"
                    name="title"
                    label="Title Task"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={editedTodo.title}
                    onChange={handleInputChange}
                    />
                    <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="details"
                    name="details"
                    label="Details Task"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={editedTodo.details}
                    onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleModalEditClose}>Cancel</Button>
                <Button onClick={handleSubmit}>
                    Edit
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}