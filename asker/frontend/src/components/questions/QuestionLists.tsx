import { Box, makeStyles, Typography, Tooltip, Avatar, Divider, IconButton } from '@material-ui/core';
import React, { useState, forwardRef, ForwardedRef } from 'react';
import { getInitials, colors } from '../../common/helpers';
import { useMutation } from '@apollo/client';
import { CLAP_QUESTION } from '../../common/graphql-queries';
import FlipMove from 'react-flip-move';
import moment from 'moment';

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
  }
}))

type Question = {
  id: string
  conferenceId: string
  questioner: string
  text: string
  claps: number
  createdAt: string
}

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
        byWhom: localStorage.getItem('email'),
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
              👏
            </IconButton>
            {question.claps > 0 && <Typography color='secondary' className={classes.postedAt}>
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
}

export const QuestionsList = (props: QuestionListProps) => {
  const { questions } = props;
  const classes = useStyles()

  return (<>
    <Typography className={classes.questionTitle} variant='h6' color='secondary'>
      Questions:
    </Typography>
    <FlipMove>
      {questions.map((item, index) => {
        return <QuestionItem key={item.id} question={item} index={index} />
      })}
    </FlipMove>
  </>)
};

