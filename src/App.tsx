import React, { useState } from 'react';
import './App.css';
import { getQuizDetails } from './Services/quiz_service';
import { QuizType } from './Types/quiz_types';
import Header from './Components/Header'
import { QuestionCard } from './Components/QuestionCard';

// importing Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';



// importing selection UI
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//Importing text field
import TextField from '@material-ui/core/TextField';

// Material UI styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 85,
  },
  container: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    padding: 30,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  '& > *': {
    margin: theme.spacing(1),
    width: '25ch',
  },
  obtainedScore: {
    color: 'green',
    fontWeight: 'bold',
  },
  totalScore: {
    color: 'blue',
    fontWeight: "bold",
  },
  scorePara: {
    fontSize: 25,
  },
  resultCard: {
    maxWidth: 600,
    marginTop: 10,
    marginRight: "auto",
    marginLeft: "auto",
    textAlign: "center",
    padding: 25,

  },
  restartButton: {
    margin: 5,
  },
  newButton: {
    margin: 5,
  },
  form: {
    textAlign: "center"
  },
  startQuizButtonGrid: {
    textAlign: "center",
    padding: 20,
  },
  startQuizButton: {
    padding: 10,
  },
  startNote: {
    textAlign: "center",
    padding: 20,
    color: "#3f51b5",
    fontSize: 30,
    textTransform: "capitalize"
  }
}));


function App() {
  function refreshPage() {
    window.location.reload(false);
  }

  const [quiz, setQuiz] = useState([]);
  let [currentStep, setCurrentStep] = useState(0);
  let [score, setScore] = useState(0);

  const [readySubmit, setreadySubmit] = useState(false);
  const [showResult, setshowResult] = useState(false)

  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();


    const currentQuestion: QuizType = quiz[currentStep];


    if (userAns === currentQuestion.correct_answer) {
      setScore(++score);
    }

    if (currentStep !== quiz.length - 1) {
      setCurrentStep(++currentStep);
    } else {
      setshowResult(true);
    }
  }


  // Start data starts
  const [keeploading, setkeeploading] = useState(true);
  const [noOfQuestions, setNoOfQuestions] = React.useState();
  const handleNoOfQuestions = (event) => {
    setNoOfQuestions(parseInt(event.target.value));
    if (noOfQuestions > 0 && noOfQuestions < 51) {
      setreadySubmit(true);
    }
  }
  const classes = useStyles();

  const [Difficulty, setDifficulty] = React.useState('any');
  const handleChange = (event) => {
    setDifficulty(event.target.value);
  };

  const [Category, setCategory] = React.useState('any');
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const [ShowQuiz, setShowQuiz] = useState(false);
  const startQuiz = () => {
    if (noOfQuestions > 0 && noOfQuestions < 51) {
      setShowQuiz(true);
      setTimeout(() => {
        setkeeploading(false);
      }, 4000);
    }
  }

  async function fetchData() {

    if (noOfQuestions > 0 && noOfQuestions < 51 && readySubmit) {
      const questions: QuizType[] = await getQuizDetails(noOfQuestions, Difficulty, Category);
      setQuiz(questions);
      setreadySubmit(false);

    }

  }
  fetchData();

  if (showResult) {
    return (
      <div className="">
        <Header></Header>
        <div className="resultcardParent">
          <Paper elevation={3} className={classes.resultCard}>
            <h2>Quiz Completed</h2>
            <h3>Result</h3>
            <p className={classes.scorePara}> Total marks: <span className={classes.totalScore}>{noOfQuestions}</span> </p>
            <p className={classes.scorePara}>Obtained Marks: <span className={classes.obtainedScore}>{score}</span> </p>
            <Button onClick={refreshPage} variant="contained" color="primary" className={classes.newButton}>
              New Quiz
            </Button>
          </Paper>
        </div >
      </div >
    )

  }

  if (ShowQuiz && quiz.length && !keeploading) {
    return (
      <div className="App">
        <Header></Header>
        <QuestionCard
          options={quiz[currentStep].option}
          question={quiz[currentStep].question}
          callback={handleSubmit}
        />
      </div>)

  };
  if ((ShowQuiz && !quiz.length) || (keeploading && ShowQuiz)) {
    return (
      <div>
        <Header></Header>
        <div className="resultcardParent">
          <Grid item xs={12} sm={6} className={classes.resultCard}>
            <Paper className={classes.paper}>
              <CircularProgress className="circularProgress" />
            </Paper>
          </Grid>
        </div>
      </div>
    )

  }

  return (
    <div className="App">
      <Header></Header>
      <div className={classes.startNote}>Select options to start your quiz<br />
        Number of question should between 10-50
        </div>
      <div className={classes.container}>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <b>Number of Questions</b>
              <form className={classes.form} noValidate autoComplete="off">
                <TextField
                  id="standard-basic"
                  label="Number of Questions"
                  value={noOfQuestions}
                  onChange={handleNoOfQuestions}
                  required
                  placeholder="10-50"
                  type="number"
                />
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <b>Difficulty Level</b><br />
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Difficulty
                                  </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Difficulty}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value={'any'}>Any</MenuItem>
                  <MenuItem value={'easy'}>Easy</MenuItem>
                  <MenuItem value={'medium'}>Medium</MenuItem>
                  <MenuItem value={'hard'}>Hard</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <b>Questions Category</b><br />
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Category
                                  </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Category}
                  onChange={handleCategoryChange}
                  required
                >
                  <MenuItem value={'any'}>Any</MenuItem>
                  <MenuItem value={9}>General Knowledge</MenuItem>
                  <MenuItem value={10}>Entertainment: Books</MenuItem>
                  <MenuItem value={11}>Entertainment: Film</MenuItem>
                  <MenuItem value={12}>Entertainment: Music</MenuItem>
                  <MenuItem value={13}>Entertainment: Musicals & Theatres</MenuItem>
                  <MenuItem value={14}>Entertainment: Television</MenuItem>
                  <MenuItem value={15}>Entertainment: Video Games</MenuItem>
                  <MenuItem value={16}>Entertainment: Board Games</MenuItem>
                  <MenuItem value={17}>Science & Nature</MenuItem>
                  <MenuItem value={18}>Science: Computers</MenuItem>
                  <MenuItem value={19}>Science: Mathematics</MenuItem>
                  <MenuItem value={20}>Mythology</MenuItem>
                  <MenuItem value={21}>Sports</MenuItem>
                  <MenuItem value={22}>Geography</MenuItem>
                  <MenuItem value={23}>History</MenuItem>
                  <MenuItem value={24}>Politics</MenuItem>
                  <MenuItem value={25}>Art</MenuItem>
                  <MenuItem value={26}>Celebrities</MenuItem>
                  <MenuItem value={27}>Animals</MenuItem>
                  <MenuItem value={28}>Vehicles</MenuItem>
                  <MenuItem value={29}>Entertainment: Comics</MenuItem>
                  <MenuItem value={30}>Science: Gadgets</MenuItem>
                  <MenuItem value={31}>Entertainment: Japanese Anime & Manga</MenuItem>
                  <MenuItem value={32}>Entertainment: Cartoon & Animations</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>

        </Grid>
        <Grid item xs={12} className={classes.startQuizButtonGrid}>
          <Button
            variant="contained"
            color="primary"
            className={classes.startQuizButton}
            onClick={startQuiz}
          >
            Start Quiz
        </Button>
        </Grid >
      </div >
    </div >
  );
}

export default App;
