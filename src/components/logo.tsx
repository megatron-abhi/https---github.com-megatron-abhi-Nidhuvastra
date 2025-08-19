
export function Logo() {
  return (
    <div className="flex items-center justify-center" aria-label="NidhuVastra Logo">
      <svg
        width="40"
        height="40"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-auto"
        data-ai-hint="logo"
      >
        <g clipPath="url(#clip0_101_2)">
          {/* Left Elephant */}
          <path d="M70 125C70 110 60 100 50 100C40 100 30 110 30 125C30 135 35 145 45 150L50 170L55 150C65 145 70 135 70 125Z" fill="hsl(var(--primary))" />
          <path d="M30 125C30 120 25 115 20 115C10 115 5 125 5 135C5 150 20 160 30 150" fill="hsl(var(--primary))" />

          {/* Right Elephant */}
          <path d="M130 125C130 110 140 100 150 100C160 100 170 110 170 125C170 135 165 145 155 150L150 170L145 150C135 145 130 135 130 125Z" fill="hsl(var(--primary))" />
          <path d="M170 125C170 120 175 115 180 115C190 115 195 125 195 135C195 150 180 160 170 150" fill="hsl(var(--primary))" />
        </g>
        <defs>
          <clipPath id="clip0_101_2">
            <rect width="200" height="200" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      <span className="sr-only">NidhuVastra</span>
    </div>
  );
}
