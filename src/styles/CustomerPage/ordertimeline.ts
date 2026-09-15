export const orderTimelineStyles = {
  container:
    "w-full",

  timeline:
    "flex w-full items-start",

  step:
    "flex min-w-0 flex-1 flex-col items-center",

  imageWrapper:
    "flex h-24 w-24 items-center justify-center transition-transform duration-300 sm:h-28 sm:w-28",

  currentImage:
    "scale-110",

  image:
    "h-full w-full object-contain",

  label:
    "mt-2 text-sm font-semibold sm:text-base",

  timelineRow:
    "relative mt-3 grid w-full grid-cols-3 items-center",

  timelineLine:
    "pointer-events-none absolute left-[16.666%] right-[16.666%] top-1/2 z-0 flex -translate-y-1/2",

  timelineItem:
    "relative z-10 flex items-center justify-center",

  statusCircle:
    "relative z-10 h-4 w-4 shrink-0 rounded-full",

  completedCircle:
    "bg-[#477052]",

  currentCircle:
    "h-5 w-5 border-[3px] border-[#E2793D] bg-white",

  upcomingCircle:
    "border-2 border-[#D8D3CC] bg-white",

  completedLine:
    "h-1 flex-1 bg-[#477052]",

  currentLine:
    "h-1 flex-1 bg-[#E2793D]",

  upcomingLine:
    "h-1 flex-1 bg-[#D8D3CC]",

  completedText:
    "text-[#2F2A25]",

  currentText:
    "text-[#E2793D]",

  upcomingText:
    "text-[#9A938A]",

  statusMessage:
    "mt-5 rounded-xl border border-[#F1E4D7] bg-[#FFF8F3] px-4 py-3 text-center text-sm font-medium leading-5 text-[#6F6258]",
};