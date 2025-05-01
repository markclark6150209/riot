interface CountdownTimerProps {
  timeLeft: number;
}

const CountdownTimer = ({ timeLeft }: CountdownTimerProps) => {
  return (
    <div className="bg-[#0F1923] inline-block px-4 py-2 rounded-md">
      <span className="text-[#FF4655] font-mono text-xl">{timeLeft}</span>
    </div>
  );
};

export default CountdownTimer;
