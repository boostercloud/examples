
import { useMutation } from '@apollo/client';
import { Button, TextField, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { CREATE_QUESTION } from '../../common/graphql-queries';

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

  return (
    <>
      <Typography variant='h4' color='secondary'>
        {localStorage.getItem('conference')}
      </Typography>
      <Typography variant='h6' color='secondary'>
        Connected as: {localStorage.getItem('email')}
      </Typography>
      <TextField
        className={classes.textInput}
        inputMode='url'
        label='Question?'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
        value={question}
      />
      <Button variant="contained" color="primary" disabled={question.length === 0} className={classes.submit} onClick={onSubmit} disableElevation>
        Ask!
    </Button>
    </>
  )
}