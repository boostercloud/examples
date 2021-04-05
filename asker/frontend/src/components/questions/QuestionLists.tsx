import { Box, makeStyles, Typography, Tooltip, Avatar, Divider, IconButton, CircularProgress } from '@material-ui/core';
import React, { useState, forwardRef, ForwardedRef } from 'react';
import { getInitials, colors } from '../../common/helpers';
import { useMutation } from '@apollo/client';
import { CLAP_QUESTION } from '../../common/graphql-queries';
import FlipMove from 'react-flip-move';
import moment from 'moment';
import { FavoriteBorder, Favorite } from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert';
import { Question } from '../../common/types';

const useStyles = makeStyles(theme => ({
  postedBy: {
    fontSize: 14,
    fontWeight: 600,
  },
  postedAt: {
    fontSize: 14,
    fontWeight: 600,
  },
  question: {
    fontStyle: 'light',
    fontSize: 26,
    fontWeight: 100,
  },
  questionTitle: {
    marginTop: 50,
  },
  heartColor: {
    color: '#f44336'
  },
}))

type QuestionItemProps = {
  question: Question
  index: number
}

const QuestionItem = forwardRef((props: QuestionItemProps, ref: ForwardedRef<HTMLDivElement>) => {
  const classes = useStyles()
  const [question, setQuestion] = useState(props.question)

  const [Clap] = useMutation(CLAP_QUESTION);

  const onCountChange = () => {
    setQuestion({
      ...question,
      claps: question.claps + 1,
    })

    Clap({
      variables: {
        byWhom: localStorage.getItem('userName'),
        questionId: question.id
      }
    }).then(() => console.log('Creating')).catch(e => console.log(e))
  }

  return (
    <div ref={ref}>
      <Box key={question.id} mt={4} mb={4}>
        <Box display='flex' alignItems='center'>
          <Tooltip title={question.questioner} aria-label='add'>
            <Avatar style={{ backgroundColor: colors[0] }}>{getInitials(question.questioner)}</Avatar>
          </Tooltip>
          <Box alignSelf='center' flexGrow='1' ml={2}>
            <Typography color='textPrimary' className={classes.postedBy}>
              {question.questioner}
            </Typography>
            <Typography color='textSecondary' className={classes.postedAt}>
              {moment(question.createdAt).fromNow()}
            </Typography>
          </Box>
          <Box paddingRight={2} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <IconButton aria-label="delete" onClick={onCountChange}>
              {question.claps === 0 ? <FavoriteBorder className={classes.heartColor} /> : <Favorite className={classes.heartColor} />}
            </IconButton>
            {question.claps > 0 && <Typography style={{ color: '#f44336' }} className={classes.postedAt}>
              {question.claps}
            </Typography>}
          </Box>
        </Box>
        <Box mt={2} pl={7}>
          <Typography color='textPrimary' className={classes.question}>
            {question.text}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </div>
  )
});

type QuestionListProps = {
  questions: Question[]
  loading: boolean
}

export const QuestionsList = (props: QuestionListProps) => {
  const { questions, loading } = props;
  const classes = useStyles()


  if (loading) {
    return (
      <Box textAlign='center' marginTop={4}>
        <CircularProgress color="secondary" />
      </Box>
    )
  }

  return (<>
    { questions?.length > 0 ?
      (<Typography className={classes.questionTitle} variant='h6' color='secondary'>
        Questions:
      </Typography>)
      : (<Box marginTop={4}>
        <Alert severity="info">No questions has been found. Post your first one!</Alert>
      </Box>)
    }
    <FlipMove>
      {questions.map((item, index) => {
        return <QuestionItem key={item.id} question={item} index={index} />
      })}
    </FlipMove>
  </>)
};

