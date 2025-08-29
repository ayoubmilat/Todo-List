"use client";
import ToDoList from "./components/ToDoList";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import { TodosContext } from "./contexts/TodosContext";

const themeFontFamily = createTheme({
  typography: {
    fontFamily: [
      "CalSans !important"
    ],
  },

  palette: {
    primary:{
        main: '#283593'
    }
  }
});

const initialTodos = []

export default function Myapp(){

    const [todos, setTodos] = useState(initialTodos)

    return (
       <div className='myapp' style={{height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <ThemeProvider theme={themeFontFamily}>
                <TodosContext.Provider value={{todos, setTodos}}>
                    <ToDoList />
                </TodosContext.Provider>
            </ThemeProvider>
       </div>
    )
}