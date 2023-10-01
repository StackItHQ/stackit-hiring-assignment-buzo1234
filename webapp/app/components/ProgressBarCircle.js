'use client';

function ProgressBarCircle({ completed, active, disabled }) {
  return (
    <div
      className={
        (active
          ? 'w-6 h-6 rounded-full  border-[2px] border-blue-500 transition-all transform duration-150 ease-in scale-[1.15] shadow-md '
          : 'w-6 h-6 rounded-full  border-[2px] border-blue-500 transition-all transform duration-150 ease-in scale-75 shadow-md ') +
        (completed ? ' bg-blue-500  ' : ' bg-transparent  ') +
        (disabled
          ? ' cursor-default border-blue-500/40 hover:scale-75 scale-75 '
          : active
          ? ' hover:scale-[1.25] cursor-pointer '
          : ' hover:scale-90 cursor-pointer ')
      }
    ></div>
  );
}

export default ProgressBarCircle;
