import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { shadows } from '@material-ui/system';

import './App.css';

interface AppProps {}

import { Bar } from 'react-chartjs-2';
import * as M from '@material-ui/core';
import Selector from './Selector';

const addToDataset = (
  question: string,
  dataset?: Record<string, number>,
): Record<string, number> => {
  const input = question.replace(/[^0-9a-zA-Z\s]/gi, '').toLowerCase();
  const previousDataset = dataset ?? {};
  const dataFrequencies = input.split(' ').reduce((prev, curr) => {
    const count = prev[curr] ?? 0;
    return {
      ...prev,
      [curr]: count + 1,
    };
  }, previousDataset);
  const sortable = Object.entries(dataFrequencies);
  sortable.sort((a, b) => b[1] - a[1]);
  return Object.fromEntries(sortable);
};

const data = (dataset: Record<string, number>, limit?: number) => ({
  labels: Object.keys(dataset).slice(0, limit),
  datasets: [
    {
      label: '# of appearances',
      data: Object.values(dataset).slice(0, limit),
      backgroundColor: '#757ce855',
      borderColor: '#00288455',
      borderWidth: 1,
    },
  ],
});

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

type WordCategory = 'all words' | 'nouns' | 'verbs' | 'adjectives';

const VerticalBar = () => {
  const [shownElements, setShownElements] = useState(10);
  const [conferenceId, setConferenceId] = useState('');
  const [dataset, setDataset] = useState({} as Record<string, number>);
  const [selectedCategory, setSelectedCategory] = useState(
    'all words' as WordCategory,
  );
  return (
    <div id="app">
      <M.Button
        color="primary"
        onClick={() => {
          const question = prompt('What you wanna ask?');
          if (!question) return;
          setDataset(addToDataset(question, dataset));
        }}
      >
        CHEATCODE
      </M.Button>
      <M.Container>
        <M.Card elevation={3}>
          <M.CardContent>
            <M.Container>
              <M.Grid container>
                <M.Grid item xs={9}>
                  <h1 className="title">Asker Analytics</h1>
                </M.Grid>
                <M.Grid container item justify="flex-end" xs={3}>
                  <M.TextField
                    label="Conference ID"
                    variant="outlined"
                    onChange={(e) => setConferenceId(e.target.value)}
                  />
                </M.Grid>
                <M.Grid item xs={12}>
                  <Bar data={data(dataset, shownElements)} options={options} />
                </M.Grid>
                <M.Grid item container justify="space-around" xs={5}>
                  <Selector
                    currentSelection={selectedCategory}
                    setSelection={setSelectedCategory}
                    options={['all words', 'nouns', 'verbs', 'adjectives']}
                  ></Selector>
                </M.Grid>
                <M.Grid item xs={5}></M.Grid>
                <M.Grid xs={2} item container justify="space-around">
                  <M.Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setShownElements(Math.max(0, shownElements - 1));
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
