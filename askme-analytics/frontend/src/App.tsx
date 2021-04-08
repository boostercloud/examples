import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { shadows } from '@material-ui/system';


import { Bar } from 'react-chartjs-2';
import * as M from '@material-ui/core';
import Selector from './Selector';
import { gql, useQuery, useSubscription } from '@apollo/client';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  logo: {
    fontFamily: 'Pacifico',
    fontStyle: 'cursive',
    paddingTop: 10,
    paddingLeft: 20,
    fontSize: '40px'
  },
  button: {
    marginRight: 5
  }
}))



const dataViewModel = (dataset: Record<string, number>, limit?: number) => {
  return {
    labels: Object.keys(dataset ?? {}).slice(0, limit),
    datasets: [
      {
        label: '# of appearances',
        data: Object.values(dataset ?? {}).slice(0, limit),
        backgroundColor: '#757ce855',
        borderColor: '#00288455',
        borderWidth: 1,
      },
    ],
  };
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    ],
  },
};

type WordCategory = 'allWords' | 'nouns' | 'verbs' | 'adjectives';

const sortDataset = (
  dataset: Record<string, number>,
): Record<string, number> => {
  if (!dataset || Object.keys(dataset).length <= 0) return dataset;
  const entries = Object.entries(dataset);
  return Object.fromEntries(entries.sort((a, b) => b[1] - a[1]));
};

const CONFERENCE_STATS_QUERY = gql`
  query ConferenceStatistic($id: ID!) {
    ConferenceStatistic(id: $id) {
      verbs
      nouns
      adjectives
      allWords
    }
  }
`;

const CONFERENCE_STATS_SUBSCRIPTION = gql`
  subscription ConferenceStatistic($id: ID!) {
    ConferenceStatistic(id: $id) {
      verbs
      nouns
      adjectives
      allWords
    }
  }
`;

const App = () => {
  const classes = useStyles()
  const [conferenceId, setConferenceId] = useState('');
  const [data, setData] = useState(
    {} as Record<WordCategory, Record<string, number>>,
  );
  const [dataset, setDataset] = useState({} as Record<string, number>);
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(CONFERENCE_STATS_QUERY, {
    onCompleted: (data) => {
      if (!data.ConferenceStatistic) return;
      setData(data['ConferenceStatistic']);
    },
    variables: {
      id: conferenceId,
    },
  });
  const {
    loading: subLoading,
    error: subError,
    data: subData,
  } = useSubscription(CONFERENCE_STATS_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      const data = subscriptionData.data;
      if (!data.ConferenceStatistic) return;
      setData(data['ConferenceStatistic']);
    },
    variables: {
      id: conferenceId,
    },
  });
  const [shownElements, setShownElements] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState(
    'allWords' as WordCategory,
  );
  useEffect(() => {
    setDataset(sortDataset(data[selectedCategory]));
    setShownElements(Math.min(Object.keys(data[selectedCategory] ?? {}).length, 50))
  }, [selectedCategory, data]);
  
  return (
    <M.Container>
      <M.Box mt={10} display='flex' flexDirection='row' justifyItems='center' alignItems='center'>
        <M.Card elevation={3}>
          <M.CardContent>
            <M.Container>
              <M.Grid container>
                <M.Grid item xs={9}>
                  <M.Typography variant='h2' color='primary' className={classes.logo}>
                    ask.me analytics
                    </M.Typography>
                </M.Grid>
                <M.Grid container item justify="flex-end" xs={3}>
                  <M.TextField
                    label="Conference ID"
                    variant="outlined"
                    onChange={(e) => setConferenceId(e.target.value)}
                    value={conferenceId}
                  />
                </M.Grid>
                <M.Grid item xs={12}>
                  <M.Box mt={5}>
                  <Bar
                    data={dataViewModel(dataset, shownElements)}
                    options={options}
                  />
                  </M.Box>
                </M.Grid>

                <M.Grid item xs={12}>
                  <M.Box mt={5} display='flex' flexDirection='row'>
                    <M.Box display='flex' flexDirection='row' flexWrap='no-wrap' flexGrow='1'>
                      <Selector
                        currentSelection={selectedCategory}
                        setSelection={setSelectedCategory}
                        options={['allWords', 'nouns', 'verbs', 'adjectives']}
                      />
                    </M.Box>
                  </M.Box>
                </M.Grid>
              </M.Grid>
            </M.Container>
          </M.CardContent>
        </M.Card>
      </M.Box>
    </M.Container>
  );
};

export default App;
