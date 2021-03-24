
import { Box, makeStyles, Typography, Tooltip, Avatar, Divider, IconButton } from '@material-ui/core';
import React from 'react';
import { getInitials, colors } from '../../common/helpers';
import StarsIcon from '@material-ui/icons/Stars';
import { useMutation } from '@apollo/client';
import { CLAP_QUESTION } from '../../common/graphql-queries';

const useStyles = makeStyles(theme => ({
  postedBy: {
    fontSize: 14,
    fontWeight: 600,
  },
  postedAt: {
    fontSize: 12,
  },
  question: {
    fontSize: 16,
    fontWeight: 600,
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
}

type QuestionItemProps = {
  question: Question
  index: number
}

const QuestionItem = (props: QuestionItemProps) => {
  const { question, index } = props
  const classes = useStyles()

  const [Clap] = useMutation(CLAP_QUESTION);

  const onCountChange = () => {
    Clap({
      variables: {
        byWhom: localStorage.getItem('email'),
        questionId: question.id
      }
    }).then(() => console.log('Creating')).catch(e => console.log(e))
  }

  return (
    <>
      <Box key={question.id} mt={4} mb={4}>
        <Box display='flex' alignItems='center'>
          <Tooltip title={question.questioner} aria-label='add'>
            <Avatar style={{ backgroundColor: colors[index % colors.length] }}>{getInitials(question.questioner)}</Avatar>
          </Tooltip>
          <Box alignSelf='center' flexGrow='1' ml={2}>
            <Typography color='textPrimary' className={classes.postedBy}>
              {question.questioner}
            </Typography>
            <Typography color='textSecondary' className={classes.postedAt}>
              {new Date().toISOString()}
            </Typography>
          </Box>
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <IconButton aria-label="delete" onClick={onCountChange}>
              <StarsIcon fontSize='large' color='secondary' />
            </IconButton>
            {question.claps > 0 && <Typography color='textSecondary' className={classes.postedAt}>
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
    </>
  )
};

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
    { questions.map((item, index) => {
      return <QuestionItem key={item.id} question={item} index={index} />
    })}
  </>)
};

