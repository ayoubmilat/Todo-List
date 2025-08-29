import { useState, useContext, useEffect } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

import { v4 as uuidv4 } from 'uuid';

//Components Importing
import ToDo from "./ToDo";

export default function ToDoList(){

    const { todos, setTodos } = useContext(TodosContext)

    const [alignment, setAlignment] = useState('All');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    }

    const [todoInput, setTodoInput] = useState("")
    const [buttonToggle, setButtonToggle] = useState("All")

    let finalTodos = todos
    const handleButtonToggleChange = (e) => {
        setButtonToggle(e.target.value)
    }

    const completed = todos.filter(t => {
        return t.isCompleted
    })

    const notCompleted = todos.filter(t => {
        return !t.isCompleted
    })

    if(buttonToggle == "Done"){
        finalTodos = completed
    }
    else if(buttonToggle == "Pending"){
        finalTodos = notCompleted
    }

    const todo = finalTodos.map(t => {
        return <ToDo key={t.id} todo={t} />
    })


    const handleTodoInput = (e) => {
        setTodoInput(e.target.value)
    }

    const handleTodoAdd = () => {
        if(todoInput != ""){
            const newTodos = {
                id: uuidv4(),
                title: todoInput,
                details: "",
                isCompleted: false
            }

            //=========== Search For It ============//
            const newTodosUpdate = [...todos, newTodos]
            setTodos(newTodosUpdate)
            localStorage.setItem("todos", JSON.stringify(newTodosUpdate))
            setTodoInput("")
        }else{
            alert("Mark what you want to do!")
        }
    }


    //Side Effect
    useEffect(() => {
        const todosFromLocalStorage = JSON.parse(localStorage.getItem("todos")) ?? []
        setTodos(todosFromLocalStorage)
    }, [])

    return (
        <>
            <Container maxWidth="sm">
                <Card sx={{ minWidth: 275 }} style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
                    <CardContent>
                        <Typography variant="h4" component="div" style={{fontWeight:"700", padding:".7rem", textAlign:"center"}}>
                            My ToDo List
                        </Typography>
                        <Divider/>
                        <ToggleButtonGroup
                            value={buttonToggle}
                            exclusive
                            onChange={handleButtonToggleChange}
                            aria-label="Platform"
                            color="primary"
                            style={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center", marginTop:"20px"}}
                            >
                            <ToggleButton value="All">All</ToggleButton>
                            <ToggleButton value="Done">Done</ToggleButton>
                            <ToggleButton value="Pending">Pending</ToggleButton>
                        </ToggleButtonGroup>

                        {/* List Of ToDo Component */}
                        <div style={{width:"500px", maxHeight:"60vh", overflowY:"auto", scrollbarColor: "#575757ff #f3f3f3ff", scrollbarWidth: "thin"}}>
                            {todo}
                        </div>
                        
                        {/* List Of ToDo Component */}

                    </CardContent>
                    <CardActions style={{width:"100%", display:"flex", alignContent:"center", justifyContent:"center"}}>
                        <Grid container spacing={1} sx={{width:"100%"}}>
                            <Grid size={9}>
                                <TextField id="outlined-basic" label="Mark what you want to do" variant="outlined" sx={{width:"100%"}} value={todoInput} onChange={handleTodoInput} />
                            </Grid>
                            <Grid size={3}>
                                <Button variant="contained" size="large" sx={{width:"100%",height:"100%"}} onClick={handleTodoAdd} disabled={todoInput.length == 0 || todoInput.length < 3}>Add Task</Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Container>
        </>
    )
}