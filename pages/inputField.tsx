import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import handleSumbit from '../lib/handleSumbit'
import React, { useState } from 'react'
import { useRouter } from "next/router";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff6064',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    mode: 'dark',
  },
});

export default function InputField(clickedTitle, clickedText) {

  const router = useRouter()

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleChange = (event) => {
      setTitle(event.target.value)
  }

  const handleText = (event) => {
    setText(event.target.value)
  }

  const handleClear = () => {
        setTitle('')
        setText('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
  
    const data = {
      title: title,
      text: text,
      completed: false
    }
    handleClear()

      const JSONdata = JSON.stringify(data)
  
    const endpoint = '/api/todo'
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata
    }
  
    const response = await fetch(endpoint, options)
  
    const result = await response.json()

    router.push({
    pathname: `/`,
    })
  }
        return(
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            >
            <ThemeProvider theme={darkTheme}>
            <TextField className="border-white text-white" value={title} onChange={handleChange} name="titleText" label="Title" variant="outlined" />
            <TextField name="textText" label="Text" variant="outlined" onChange={handleText} value={text}/>
            <Button onClick={handleSubmit} type="submit">Add Item</Button>
            <Button onClick={handleClear} sx={{ color: 'white', backgroundColor: 'blue', borderColor: 'blue' }}>Clear</Button>
            </ThemeProvider>
            </Box>
        )
    }