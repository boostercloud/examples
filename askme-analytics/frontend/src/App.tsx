import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { shadows } from '@material-ui/system';

import './App.css';

interface AppProps {}

import { Bar } from 'react-chartjs-2';
import * as M from '@material-ui/core';
import Selector from './Selector';
import { gql, useQuery, useSubscription } from '@apollo/client';

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

const VerticalBar = () => {
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
  }, [selectedCategory, data]);
  return (
    <div id="app">
      <M.Container>
        <M.Card elevation={3}>
          <M.CardContent>
            <M.Container>
              <M.Grid container>
                <M.Grid item xs={9}>
                  <h1 className="title">Askme Analytics</h1>
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
                  <Bar
                    data={dataViewModel(dataset, shownElements)}
                    options={options}
                  />
                </M.Grid>
                <M.Grid item container justify="space-around" xs={5}>
                  <Selector
                    currentSelection={selectedCategory}
                    setSelection={setSelectedCategory}
                    options={['allWords', 'nouns', 'verbs', 'adjectives']}
                  ></Selector>
                </M.Grid>
                <M.Grid item xs={5}></M.Grid>
                <M.Grid xs={2} item container justify="space-around">
                  <M.Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setShownElements(Math.max(1, shownElements - 1));
                    }}
                  >
                    -
                  </M.Button>
                  <M.Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setShownElements(
                        Math.min(
                          Object.keys(dataset).length,
                          shownElements + 1,
                        ),
                      );
                    }}
                  >
                    +
                  </M.Button>
                </M.Grid>
              </M.Grid>
            </M.Container>
          </M.CardContent>
        </M.Card>
      </M.Container>
    </div>
  );
};

export default VerticalBar;
