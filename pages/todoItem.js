import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react'
import { useRouter } from "next/router";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function TodoItem({ id, title, text, completed=false }) {

  const [open, setOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(title);
  const [newText, setNewText] = React.useState(text);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (event) => {
    event.preventDefault()

    if (event.target.name == 'save') {
      const data = {
        title: newTitle,
        text: newText,
        id: id,
        completed: completed 
      }
  
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
      console.log(result)
      router.push({pathname: `/`}, undefined, {scroll: false})
    }
    setOpen(false);
  };

  const router = useRouter()

  const handleDelete = async (event) => {
      event.preventDefault()
    
      const data = {
        id: id,
        title: title
      }
  
        const JSONdata = JSON.stringify(data)
    
      const endpoint = '/api/todo'
    
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata
      }
    
      const response = await fetch(endpoint, options)
    
      const result = await response.json()
      router.push({pathname: `/`}, undefined, {scroll: false})
    }

  const handleComplete = async (event) => {
    if (completed) {
      completed = false
    }
    else {
      completed = true
    }
    event.preventDefault()
    
      const data = {
        title: title,
        text: text,
        id: id,
        completed: completed 
      }
  
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
      console.log(result)
      router.push({pathname: `/`}, undefined, {scroll: false})
    }

  const handleTitleChange = async (event) => {
    setNewTitle(event.target.value)
    setNewText(text)
  }
  const handleTextChange = async (event) => {
    setNewTitle(title)
    setNewText(event.target.value)
  }

  return (
    <div className={completed ? styles.completed : styles.card}>
        <div onClick={handleComplete}>
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
        <div className="justify-end">
          <ModeEditIcon onClick={handleClickOpen} fontSize="large"/>
          <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Edit</DialogTitle>
              <DialogContent>
                <DialogContentText>
                    Change Title:
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="newText"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={title}
                    onChange={handleTitleChange}
                  />
                <DialogContentText>
                  Change Text:
                </DialogContentText>
                <TextField
                  margin="dense"
                  id="newText"
                  label="Text"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={text}
                  onChange={handleTextChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button name='save' onClick={handleClose}>Save</Button>
              </DialogActions>
          </Dialog>
            <DeleteIcon onClick={handleDelete} fontSize="large"/>
        </div>
        </div>
  )

}