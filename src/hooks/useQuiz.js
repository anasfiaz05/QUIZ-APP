import { useState, useEffect, useCallback, useRef } from "react";
import { pick10 } from "../assets/mockData";

export default function useQuiz(categoryData) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(50);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef(null);

  const stopTimer = useCallback(() => clearInterval(timerRef.current), []);

  const startTimer = useCallback(() => {
    stopTimer();
    setTimer(50);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [stopTimer]);

  // Init questions
  useEffect(() => {
    if (categoryData) {
      setQuestions(pick10(categoryData.questions));
      setCurrent(0);
      setSelected(null);
      setRevealed(false);
      setAnswers([]);
      setScore(0);
      setFinished(false);
    }
  }, [categoryData]);

  // Auto-timeout
  useEffect(() => {
    if (timer === 0 && !revealed && questions.length > 0) {
      handleTimeout();
    }
  }, [timer]);

  const handleTimeout = useCallback(() => {
    setRevealed(true);
    stopTimer();
    setAnswers((prev) => [...prev, { qi: current, selected: -1, correct: false, timeLeft: 0 }]);
    setTimeout(() => goNext(), 1500);
  }, [current, revealed, questions]);

  const selectAnswer = useCallback((i) => {
    if (revealed) return;
    stopTimer();
    setSelected(i);
    setRevealed(true);
    const correct = i === questions[current].a;
    if (correct) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, { qi: current, selected: i, correct, timeLeft: timer }]);
    setTimeout(() => goNext(), 1500);
  }, [revealed, questions, current, timer, stopTimer]);

  const goNext = useCallback(() => {
    setCurrent((c) => {
      if (c >= questions.length - 1) { setFinished(true); return c; }
      setSelected(null);
      setRevealed(false);
      return c + 1;
    });
  }, [questions.length]);

  const goPrev = useCallback(() => {
    if (current === 0) return;
    stopTimer();
    setCurrent((c) => c - 1);
    setSelected(null);
    setRevealed(false);
    setAnswers((prev) => { const a = [...prev]; a.pop(); return a; });
    setScore((s) => Math.max(0, s - 1));
  }, [current, stopTimer]);

  // Start timer on question change
  useEffect(() => {
    if (questions.length > 0 && !finished) startTimer();
    return stopTimer;
  }, [current, questions, finished]);

  return { questions, current, selected, revealed, answers, score, timer, finished, selectAnswer, goPrev, goNext: () => goNext() };
}
