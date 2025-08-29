import { useContext, useState } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';


let styling = {}
let doneStyling = {}
let done = "Pending Task"

export default function ToDo({ todo }){

    const { todos, setTodos } = useContext(TodosContext)
    const [ModalDeleteStatus, setModalDeleteStatus] = useState(false)
    const [ModalEditStatus, setModalEditStatus] = useState(false)

    const hanldeDoneTodo = () => {
        const updateTodos = todos.map(t => {
            if(t.id == todo.id){
                t.isCompleted = !t.isCompleted
            }
            return t
        })

        setTodos(updateTodos)
        localStorage.setItem("todos", JSON.stringify(updateTodos))
    }

    const handleModalDelete = () => {
        setModalDeleteStatus(true)
    }

    const handleModalEdit = () => {
        setModalEditStatus(true)
    }


    if(todo.isCompleted){
        styling = {color:"white",background:"green", border:"1px solid green"}
        doneStyling = {color:"green", fontSize:"14px"}
        done = "Task Finished Successfully"
    }else{
        styling = {color:"green",background:"white", border:"1px solid green"}
        doneStyling = {color:"red", fontSize:"14px"}
        done = "Pending Task"
    }
    
    return (
        <>
            <ModalDelete ModalDeleteStatus={ModalDeleteStatus}  setModalDeleteStatus={setModalDeleteStatus} todo={todo} />
            <ModalEdit ModalEditStatus={ModalEditStatus}  setModalEditStatus={setModalEditStatus} todo={todo} />
            <Card sx={{ minWidth: 275 }} style={{background:"#f5f5f5ff", border:"1px solid #3a0c64ff", borderRadius:"3px", alignItems:"center", justifyContent:"center", marginTop:"20px"}}>
                <Grid container spacing={2}>
                    <Grid size={8}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                <p style={doneStyling}>{done}</p>
                                <div style={{textDecoration: todo.isCompleted ? "line-through 2px" : "none"}}>{todo.title}</div>
                                
                            </Typography>
                            <Typography sx={{ color: 'text.secondary'}}>{todo.details}</Typography>
                        </CardContent>
                    </Grid>
                    <Grid size={4} style={{display:"flex", alignItems: 'center', justifyContent:"center"}}>
                        <Stack direction="row" spacing={1} sx={{ }}>
                            <IconButton aria-label="check" size="small" style={styling} onClick={hanldeDoneTodo}>
                                <CheckIcon />
                            </IconButton>
                            <IconButton aria-label="edit" size="small" style={{color:"blue", background:"transparent", border:"1px solid blue"}} onClick={handleModalEdit}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" size="small" style={{color:"red", background:"transparent", border:"1px solid red"}} onClick={handleModalDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}