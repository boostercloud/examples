
import { Box, makeStyles, Typography, Tooltip, Avatar, Divider, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import { getInitials, colors } from '../../common/helpers';
import { useMutation } from '@apollo/client';
import { CLAP_QUESTION } from '../../common/graphql-queries';
import { Fade } from "react-awesome-reveal";


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
}

type QuestionItemProps = {
  question: Question
  index: number
}

const QuestionItem = (props: QuestionItemProps) => {
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
    <>
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
              {new Date().toISOString()}
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
      return <Fade delay={200}>
        <QuestionItem key={item.id} question={item} index={index} />
      </Fade>
    })}
  </>)
};

