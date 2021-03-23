import { Box, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_CONFERENCE, GET_CONFERENCE } from '../../common/graphql-queries';
import { QuestionsForm } from './QuestionForm';
import { QuestionsList } from './QuestionLists';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'space-around',
    justifySelf: 'center',
    flexDirection: 'row',
    height: '100vh',
  },
  wrapper: {
    width: '80%',
  }
}))

export const QuestionsView = () => {
  const classes = useStyles();
  const [CreateConference, createConferenceResult] = useMutation(CREATE_CONFERENCE);

  const queryConferenceResult = useQuery(GET_CONFERENCE, {
    variables: {
      id: localStorage.getItem('conference')
    },
    pollInterval: 5000
  });

  useEffect(() => {
    if (queryConferenceResult.error) {
      CreateConference({
        variables: {
          location: localStorage.getItem('location'),
          id: localStorage.getItem('conference')
        }
      }).catch(e => console.log(e))
    };
  }, [queryConferenceResult, CreateConference]);

  if (queryConferenceResult.loading || createConferenceResult.loading) {
    return <p>Loading....</p>
  }

  return (<Box className={classes.root}>
    <Box className={classes.wrapper}>
      <Box display='flex' flexDirection='column' padding={10}>
        <QuestionsForm />
        <QuestionsList questions={queryConferenceResult.data?.questions}/>
      </Box>
    </Box>
  </Box>
  )
}
