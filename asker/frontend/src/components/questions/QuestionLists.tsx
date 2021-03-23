
import { Box, makeStyles, Typography, Tooltip, Avatar, Divider } from '@material-ui/core';
import React from 'react';
import { FavoriteBorderOutlined } from '@material-ui/icons'
import { getInitials, colors } from '../../common/helpers';

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
    marginBottom: 20,
    marginTop: 30,
  },
  submit: {
    marginBottom: 10,
    marginTop: 50,
  },
  postedBy: {
    fontSize: 14,
    fontWeight: 600,
  },
  postedAt: {
    fontSize: 12,
  },
  likes: {
    fontSize: 16,
  },
  question: {
    fontSize: 16,
  },
  wrapper: {
    width: '80%',
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
  return (
    <>
      <Box key={question.id} mt={4} mb={4}>
        <Box display='flex'>
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
            <FavoriteBorderOutlined fontSize='large' color="primary" />
          </Box>
        </Box>
        <Box mt={2}>
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
      return <QuestionItem question={item} index={index} />
    }) }
  </>)
};
