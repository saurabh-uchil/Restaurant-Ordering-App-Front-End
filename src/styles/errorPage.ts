export const errorPageLogo = {
  container: "flex items-center justify-center gap-2",

  dot: "h-2 w-2 rounded-full bg-[#E2793D]",

  text: "text-sm font-semibold tracking-wide text-[#FBF8F2]",
}

export const errorTickets = {
  container: `
    mx-auto
    w-[150px]
    rounded-sm
    bg-[#F5F0E6]
    px-5
    py-4
    -rotate-2
    opacity-50
    shadow-[0_8px_20px_rgba(0,0,0,0.35)]
    [clip-path:polygon(0_0,100%_0,100%_92%,92%_100%,85%_90%,78%_100%,71%_90%,64%_100%,57%_90%,50%_100%,43%_90%,36%_100%,29%_90%,22%_100%,15%_90%,8%_100%,0_92%)]
  `,

  label: "mb-1 font-mono text-[9px] uppercase tracking-wider text-[#7A746B]",

  status: "mb-2 font-mono text-base font-medium leading-none text-[#2B2B2B]",

  error: "inline-block rounded-sm bg-red-400 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-white",
};

export const errorPageStyle = {
  page: "min-h-screen bg-[#17181A] font-sans",

  container: "flex min-h-[calc(100vh-72px)] -translate-y-6 flex-col items-center justify-center px-6 pb-10 text-center",

  logo: "mb-8",

  code: "mb-3 mt-7 font-mono text-xs uppercase tracking-[0.25em] text-[#E2793D]",

  heading: "mb-4 max-w-xl font-serif text-3xl font-semibold leading-tight text-[#FBF8F2] sm:text-4xl",

  description: "mx-auto mb-8 max-w-xl text-sm leading-6 text-[#9A958C] sm:text-base",

  buttonContainer: "mt-2 flex justify-center",

  primaryButton: "inline-flex items-center justify-center gap-2 rounded-full bg-[#E2793D] px-6 py-2.5 text-sm font-semibold text-[#FBF8F2] transition-colors duration-200 hover:bg-[#CC6932] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2793D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17181A]",

  secondaryButton: "inline-flex items-center justify-center gap-2 rounded-full border border-[#2C2E2C] px-6 py-2.5 text-sm font-semibold text-[#FBF8F2] transition-colors duration-200 hover:bg-[#1F2120] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBF8F2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17181A]",

  buttonLogo: "h-4 w-4",
};

