import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function InputField() {
        return(
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <ThemeProvider theme={darkTheme}>
            <TextField className="border-white text-white" id="titleText" label="Title" variant="outlined" />
            <TextField id="textText" label="Text" variant="filled" />
            <Button>Add Item</Button>
            </ThemeProvider>
            </Box>
        )
    }