
import { useMutation } from '@apollo/client';
import { Button, TextField, makeStyles, Typography, Box, IconButton, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';
import { CREATE_QUESTION } from '../../common/graphql-queries';
import { Copy } from 'react-feather'
import { countLikes, Question } from '../../common/types';
import CopyToClipboard from 'react-copy-to-clipboard';


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

type QuestionsFormProps = {
  questions: Question[]
}

export const QuestionsForm = (props: QuestionsFormProps) => {
  const classes = useStyles();
  const [question, setQuestion] = useState('')
  const [Ask] = useMutation(CREATE_QUESTION)


  const generateCopyLink = () => {
    return `${window.location.origin}/conference?serverUrl=${localStorage.getItem('serverUrl')}&conference=${localStorage.getItem('conference')}`
  }

  const onSubmit = () => {
    Ask({
      variables: {
        who: localStorage.getItem('userName'),
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
            Connected as: {localStorage.getItem('userName')}
          </Typography>
          <Typography variant='h6' className={classes.serverTitle} color='secondary'>
            Connected to: {localStorage.getItem('serverUrl')}
          </Typography>
          <Typography style={{ marginTop: 10 }} variant='h6' className={classes.serverTitle} color='primary'>
            Questions asked: {props.questions.length}
          </Typography>
          <Typography variant='h6' className={classes.serverTitle} color='primary'>
            Global Likes: {countLikes(props.questions)}
          </Typography>
        </Box>
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' alignContent='center' paddingRight={2}>
          <Tooltip title="Copy conference URL">
            <CopyToClipboard text={generateCopyLink()} onCopy={() => alert('The conference link has been copied to your clipboard')}>
              <IconButton aria-label="delete" color='secondary'>
                <Copy size={'36'} />
              </IconButton>
            </CopyToClipboard>
          </Tooltip>
        </Box>
      </Box>
      <Box display='flex' flexDirection='column' style={{ backgroundColor: '#f0f0f0', marginTop: 32, borderRadius: 6, padding: 16 }}>
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
      </Box>
    </>
  )
}