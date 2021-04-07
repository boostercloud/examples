/* eslint-disable react-hooks/exhaustive-deps */
import { Box, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {  useQuery } from '@apollo/client';
import {  GET_CONFERENCE, GET_QUESTIONS } from '../../common/graphql-queries';
import { QuestionsForm } from './QuestionForm';
import { QuestionsList } from './QuestionLists';
import { Question } from '../../common/types';

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
  list: {}
}))

export const QuestionsView = () => {
  const classes = useStyles();
  const [questions, setQuestions] = useState<any[]>([])

  
  const queryConferenceResult = useQuery(GET_CONFERENCE, {
    variables: {
      id: localStorage.getItem('conference')
    }, 
    pollInterval: 500
  });

  const byLikes = (questionA: Question, questionB: Question): number => {
    return questionB.likes - questionA.likes
  }

  const filterByConfAndSortByLikes = (): any[] => {
    if (!questionsResult.data?.QuestionReadModels) return []
    return questionsResult.data?.QuestionReadModels
    .filter((item: any) => item.conferenceId === localStorage.getItem('conference'))
    .sort(byLikes)
  }

  const questionsResult = useQuery(GET_QUESTIONS, {
    pollInterval: 500
  });

  useEffect(() => {
    const conferenceQuestions = queryConferenceResult.data?.ConferenceReadModel?.questions || []
    const globalQuestions = filterByConfAndSortByLikes()
    setQuestions([...conferenceQuestions, ...globalQuestions])
  }, [queryConferenceResult.data, questionsResult.data])

  return (<Box className={classes.root}>
    <Box className={classes.wrapper}>
      <Box display='flex' flexDirection='column' paddingTop={6} paddingBottom={10} paddingLeft={10} paddingRight={10}>
        <QuestionsForm questions={questions} />
        <Box className={classes.list}>
          <QuestionsList loading={questionsResult?.loading} questions={questions}/>
        </Box>
      </Box>
    </Box>
  </Box>
  )
}
