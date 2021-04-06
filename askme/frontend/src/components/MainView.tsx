import { useLazyQuery } from '@apollo/client';
import { Box, Button, TextField, makeStyles, Typography, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { GET_CONFERENCES } from '../common/graphql-queries';
import { RefreshConection } from '../common/helpers';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#00000000',
    display: 'flex',
    justifyContent: 'space-around',
    justifySelf: 'center',
    flexDirection: 'row',
    height: '100vh',
  },
  sectionRight: {
    backgroundColor: theme.palette.background.paper,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    minHeight: '600px',
  },
  sectionLeft: {
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
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
  },
  logo: {
    fontFamily: 'Pacifico',
    fontStyle: 'cursive',
    fontSize: '60px'
  }
}))

type MainViewProps = {
  onRefreshConection: RefreshConection
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const MainView = (props: MainViewProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const query = useQuery();

  const [serverUrl, setServerUrl] = useState(query.get('serverUrl') ?? localStorage.getItem('serverUrl') ?? '')
  const [conference, setConference] = useState(query.get('conference') ?? '')
  const [userName, setUserName] = useState(query.get('userName') ?? '')
  const [error, setError] = useState(false);

  const [ConferenceReadModels, queryConferencesResult] = useLazyQuery(GET_CONFERENCES);

  const isValid = () => serverUrl?.length > 0 && userName?.length > 0 && conference?.length > 0 && !queryConferencesResult.error

  useEffect(() => {
    ConferenceReadModels();
  }, [ConferenceReadModels])

  useEffect(() => {
    props.onRefreshConection(serverUrl)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverUrl])

  const onSubmit = () => {
    if (isValid()) {
      // Perform some validation
      localStorage.setItem('serverUrl', serverUrl ?? '')
      localStorage.setItem('userName', userName ?? '')
      localStorage.setItem('conference', conference ?? '')

      const location = queryConferencesResult.data?.ConferenceReadModels?.find((item: any) => item.id === conference)?.location
      localStorage.setItem('location', location)

      navigate(`/conference/${conference}`);
    } else {
      setError(true)
    }
  }

  return (
    <Box className={classes.root}>
      <Box alignSelf='center' width='50%' height='50%' className={classes.sectionLeft}>
        <Box padding={10} alignSelf='center'>
          <Typography variant='h3' className={classes.title} color='primary'>
            Welcome to <span className={classes.logo}>ask.me</span>
          </Typography>
          <Typography variant='h5' color='secondary'>
            Ask live whatever you want and vote for your favourite question
          </Typography>
        </Box>
      </Box>
      <Box alignSelf='center' width='50%' height='50%' className={classes.sectionRight}>
        <Box display='flex' flexDirection='column' padding={10}>
          <Typography variant='h6' color='secondary'>
            Let's ask?
          </Typography>
          <TextField
            className={classes.textInput}
            inputMode='url'
            label='Backend URL'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setServerUrl(e.target.value)
            }}
            value={serverUrl}
          />

          <FormControl className={classes.textInput}>
            <InputLabel>Conference • Location</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={conference}
              onChange={(e: React.ChangeEvent<{ value: any }>) => setConference(e.target.value)}>
              {queryConferencesResult.data?.ConferenceReadModels?.map((item: any) => {
                return <MenuItem key={item.id} value={item.id}>{item.id} • {item.location}</MenuItem>
              })}
            </Select>
          </FormControl>

          <TextField
            className={classes.textInput}
            inputMode='text'
            label='Name or Alias'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
            value={userName}
          />
          {error && 
          <Box mt={6}> 
            <Alert severity="error">All fields are required to enter the conference</Alert>
          </Box>
          }
          <Button variant="contained" color="primary" className={classes.submit} onClick={onSubmit} disableElevation>
            Enter
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

