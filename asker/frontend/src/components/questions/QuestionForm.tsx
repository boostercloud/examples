
import { Button, TextField, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  textInput: {
    marginBottom: 20,
    marginTop: 30,
  },
  submit: {
    marginBottom: 10,
    marginTop: 50,
  }
}))

export const QuestionsForm = () => {
  const classes = useStyles();
  const [question, setQuestion] = useState('What is Booster all about?')

   // component handlers
   const onSubmit = () => {
    setQuestion('')
  };

  return (
    <>
      <Typography variant='h4' color='secondary'>
        {localStorage.getItem('conference')}
      </Typography>
      <Typography variant='h6' color='secondary'>
        Connected as: {localStorage.getItem('fullName')} • {localStorage.getItem('email')}
      </Typography>
      <TextField
        className={classes.textInput}
        inputMode='url'
        label='Question?'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
        value={question}
      />
      <Button variant="contained" color="primary" className={classes.submit} onClick={onSubmit} disableElevation>
        Ask!
    </Button>
    </>
  )
}