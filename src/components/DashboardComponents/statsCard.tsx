import type { LucideIcon } from "lucide-react";

type statsCardProp = {
    name: string,
    stats: number,
    icon:LucideIcon
}
const statsCard = ({name,stats,icon: Icon}: statsCardProp) => {
  return (
    <div className="flex border border-slate-200 rounded p-2 m-2">
      <Icon className="m-2" />
      <p className="m-2">{name}</p>
      <p className="m-2">{stats}</p>
    </div>
  )
}

export default statsCard
