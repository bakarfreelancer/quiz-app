import React, { useState } from 'react';
import { questionPropsType } from './../Types/quiz_types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        minHeight: 370,

    },
    grid: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 20,

    },
    question: {
        color: '#000',
    },
    options: {
        color: '#000',
        textAlign: 'left',
    },
    optionsParent: {
        textAlign: 'left',
    }
}));
let counter = 1;
export const QuestionCard: React.FC<questionPropsType> = ({ question, options, callback }) => {
    const classes = useStyles();
    function inccounter() {
        ++counter;
    }

    let newquestion = `<b>Q.no: ${counter}</b> ${question}`;

    let [selectedAns, setSelectedAns] = useState('');
    const handleSelection = (ev: any) => {
        setSelectedAns(ev.target.value);

    }
    return (
        <div className="questionCardParent">
            <Grid item xs={12} sm={6} className={classes.grid}>
                <Paper className={classes.paper}>
                    <h1>Quiz</h1>
                    <div className="question">
                        <p className={classes.question} dangerouslySetInnerHTML={{ __html: newquestion }} />
                    </div>
                    <div className="options">
                        <form onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selectedAns)}>
                            {
                                options.map((opt: string, ind: number) => {
                                    return (
                                        <div key={ind} className={classes.optionsParent}>
                                            <label htmlFor="">
                                                <input
                                                    type="radio"
                                                    name="opt"
                                                    value={opt}
                                                    onChange={handleSelection}
                                                    required
                                                    checked={selectedAns === opt}
                                                />
                                                {<span className={classes.options} dangerouslySetInnerHTML={{ __html: options[ind] }} />}
                                            </label>
                                        </div>

                                    )
                                })
                            }
                            <input type="submit" className="questionSubmit" onClick={inccounter}></input>
                        </form>
                        <div>

                        </div>
                    </div>
                </Paper>
            </Grid>

        </div>
    )
}
