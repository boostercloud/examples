import { Box, Button, TextField, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'space-around',
    justifySelf: 'center',
    flexDirection: 'row',
    height: '100vh',
  },
  left: {
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 50,
    minHeight: '600px',
  },
  right: {
    backgroundColor: theme.palette.background.paper,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    minHeight: '600px',
  },
  title: {
    marginBottom: 10
  },
  textInput: {
    marginBottom: 10,
    marginTop: 10,
  },
  submit: {
    marginBottom: 10,
    marginTop: 50,
  }
}))


export const ConferenceView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [serverUrl, setServerUrl] = useState('https://s55vk1ty90.execute-api.us-east-1.amazonaws.com/on-aws/graphql')
  const [email, setEmail] = useState('john@booster.cloud')
  const [location, setLocation] = useState('Canary Islands')
  const [fullName, setFullName] = useState('John Doe')
  const [conference, setConference] = useState('booster-conference')

  const onSubmit = () => {
    // Perform some validation
    localStorage.setItem('serverUrl', serverUrl)
    localStorage.setItem('email', email)
    localStorage.setItem('conference', conference)
    localStorage.setItem('fullName', fullName)
    localStorage.setItem('location', location)
    navigate(`/conference/${conference}`);
  }

  return (
    <Box className={classes.root}>
      <Box padding={10} alignSelf='center' width='50%' height='50%' className={classes.left}>
        <Typography variant='h3' className={classes.title} color='primary'>
          Welcome to Asker
        </Typography>
        <Typography variant='h5' color='secondary'>
          Ask live whatever you want and vote for your favourite question
        </Typography>
      </Box>
      <Box alignSelf='center' width='50%' height='50%' className={classes.right}>
        <Box display='flex' flexDirection='column' padding={10}>
          <Typography variant='h6' color='secondary'>
            Let's ask?
          </Typography>
          <TextField
            className={classes.textInput}
            inputMode='url'
            label='Backend URL'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setServerUrl(e.target.value)}
            value={serverUrl}
          />
          <TextField
            className={classes.textInput}
            inputMode='text'
            label='Conference'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConference(e.target.value)}
            value={conference}
          />
           <TextField
            className={classes.textInput}
            inputMode='text'
            label='Location'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
            value={location}
          />
          <TextField
            className={classes.textInput}
            inputMode='text'
            label='Full name'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
            value={fullName}
          />
          <TextField
            className={classes.textInput}
            inputMode='text'
            label='Email'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            value={email}
          />
          <Button variant="contained" color="primary" className={classes.submit} onClick={onSubmit} disableElevation>
            Enter
        </Button>
        </Box>
      </Box>
    </Box>
  );
};

