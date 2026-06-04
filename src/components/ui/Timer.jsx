import ProgressRing from "./ProgressRing";

export default function Timer({ time, total = 50 }) {
  const danger = time <= 10;
  const warn = time <= 20;
  const color = danger ? "#ff4f6d" : warn ? "#f5a623" : "#7c6bfa";
  return (
    <div className="relative w-14 h-14">
      <ProgressRing value={time} max={total} size={56} stroke={4} color={color} />
      <div
        className="absolute inset-0 flex items-center justify-center font-display font-black text-base"
        style={{ color, animation: danger ? "pulse-ring 1s ease infinite" : "none" }}
      >
        {time}
      </div>
    </div>
  );
}
