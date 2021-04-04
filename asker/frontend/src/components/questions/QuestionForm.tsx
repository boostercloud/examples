
import { useMutation } from '@apollo/client';
import { Button, TextField, makeStyles, Typography, Box, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import { CREATE_QUESTION } from '../../common/graphql-queries';
import { FavoriteBorder, Favorite } from '@material-ui/icons'


const useStyles = makeStyles(theme => ({
  textInput: {
    marginBottom: 20,
    marginTop: 30,
  },
  submit: {
    marginBottom: 10,
    marginTop: 50,
  },
  logo: {
    fontFamily: 'Pacifico',
    fontStyle: 'cursive',
    paddingBottom: 50,
    textAlign: 'center',
    fontSize: '80px'
  },
  serverTitle: {
    fontSize: '14px',
  }
}))

export const QuestionsForm = () => {
  const classes = useStyles();
  const [question, setQuestion] = useState('')
  const [Ask] = useMutation(CREATE_QUESTION);

   const onSubmit = () => {
    Ask({
      variables: {
        who: localStorage.getItem('email'),
        conference: localStorage.getItem('conference'),
        question
      }
    })
    .then(() => {
      setQuestion('')
    })
    .catch(e => console.log(e))
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <>
     <Typography variant='h2' color='primary' className={classes.logo}>
       ask.me
      </Typography>
      <Box display='flex' flexDirection='row'>
        <Box display='flex' flexDirection='column' flexGrow='1' >
          <Typography variant='h4' color='secondary'>
            Conference: {localStorage.getItem('conference')}
          </Typography>
          <Typography variant='h6' color='secondary'>
            Connected as: {localStorage.getItem('email')}
          </Typography>
          <Typography variant='h6' className={classes.serverTitle} color='secondary'>
            Connected to: {localStorage.getItem('serverUrl')}
          </Typography>
        </Box>
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' alignContent='center'>
          <IconButton aria-label="delete">
            <FavoriteBorder />
          </IconButton>
        </Box>
      </Box>
      <TextField
        className={classes.textInput}
        inputMode='url'
        label='Question?'
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => onKeyPress(e)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
        value={question}
      />
      <Button variant="contained" color="primary" disabled={question.length === 0} className={classes.submit} onClick={onSubmit} disableElevation>
        Ask!
    </Button>
    </>
  )
}