import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { CATEGORIES } from "../assets/mockData";
import useQuiz from "../hooks/useQuiz";
import QuestionCard from "../components/quiz/QuestionCard";
import GradientButton from "../components/ui/GradientButton";
import Loader from "../components/ui/Loader";

export default function Quiz() {
  const { category, user, addScore } = useContext(AppContext);
  const nav = useNavigate();
  const cat = CATEGORIES[category];
  const quiz = useQuiz(cat);

  useEffect(() => { if (!category) nav("/categories"); }, [category]);

  useEffect(() => {
    if (quiz.finished) {
      const pct = Math.round((quiz.score / quiz.questions.length) * 100);
      if (user) addScore({ name: user.name, email: user.email, cat: category, score: quiz.score, pct });
      nav("/results", { state: { score: quiz.score, total: quiz.questions.length, answers: quiz.answers, questions: quiz.questions, cat: category } });
    }
  }, [quiz.finished]);

  if (!cat || quiz.questions.length === 0) return <Loader text="Loading questions…" />;

  const q = quiz.questions[quiz.current];

  return (
    <div className="py-6 max-w-2xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 anim-fade-up">
        <button onClick={() => nav("/categories")} className="text-white/40 hover:text-white text-sm transition-colors flex items-center gap-1.5">
          ← Exit Quiz
        </button>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 glass border border-white/[0.08] rounded-xl px-3 py-1.5">
            <span className="text-emerald-400 text-sm font-bold">{quiz.score}</span>
            <span className="text-white/30 text-xs">pts</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1.5 w-full rounded-full bg-white/[0.06] mb-6 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${((quiz.current + 1) / quiz.questions.length) * 100}%`, background: cat.color }}
        />
      </div>

      <QuestionCard
        question={q}
        index={quiz.current}
        total={quiz.questions.length}
        selected={quiz.selected}
        revealed={quiz.revealed}
        timer={quiz.timer}
        cat={cat}
        onSelect={quiz.selectAnswer}
      />

      {/* Nav */}
      <div className="flex justify-between mt-4">
        <button
          onClick={quiz.goPrev} disabled={quiz.current === 0}
          className="px-4 py-2 rounded-xl glass border border-white/10 text-white/50 hover:text-white text-sm font-semibold disabled:opacity-30 transition-all"
        >
          ← Previous
        </button>
        <span className="text-white/20 text-xs self-center">
          {quiz.revealed ? "Moving to next…" : "Select an answer"}
        </span>
        <button
          onClick={quiz.goNext} disabled={!quiz.revealed}
          className="px-4 py-2 rounded-xl glass border border-white/10 text-white/50 hover:text-white text-sm font-semibold disabled:opacity-30 transition-all"
        >
          {quiz.current === quiz.questions.length - 1 ? "Finish 🏁" : "Next →"}
        </button>
      </div>
    </div>
  );
}
