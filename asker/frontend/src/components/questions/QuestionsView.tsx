import { Box, CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';
import {  useQuery } from '@apollo/client';
import {  GET_CONFERENCE } from '../../common/graphql-queries';
import { QuestionsForm } from './QuestionForm';
import { QuestionsList } from './QuestionLists';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'space-around',
    justifySelf: 'center',
    flexDirection: 'row',
    marginTop: 100,
    marginBottom: 100,
    borderRadius: 8,
    height: '100%',
    overflow: 'auto'
  },
  wrapper: {
    width: '100%',
  },
  list: {},
}))

export const QuestionsView = () => {
  const classes = useStyles();

  const queryConferenceResult = useQuery(GET_CONFERENCE, {
    variables: {
      id: localStorage.getItem('conference')
    }, 
    pollInterval: 500
  });
  
  return (<Box className={classes.root}>
    <Box className={classes.wrapper}>
      <Box display='flex' flexDirection='column' padding={10}>
        <QuestionsForm />

        {queryConferenceResult?.loading &&
          <Box alignSelf='center' marginTop={5}>
            <CircularProgress color="secondary" />
          </Box>
        }
      
        <Box className={classes.list}>
          <QuestionsList questions={queryConferenceResult.data?.ConferenceReadModel?.questions || []}/>
        </Box>
      </Box>
    </Box>
  </Box>
  )
}
