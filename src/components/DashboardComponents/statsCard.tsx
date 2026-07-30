import type { LucideIcon } from "lucide-react";
import { statsCardStyles } from "../../styles/stats";


type StatsCardProps = {
  name: string;
  stats: number;
  icon: LucideIcon;
  trend?: string;
  trendType?: "positive" | "warning" | "neutral";
};

const StatsCard = ({ name, stats, icon: Icon, trend, trendType = "positive"}: StatsCardProps) => {
  
  const trendClass = {
    positive: statsCardStyles.positiveTrend,
    warning: statsCardStyles.warningTrend,
    neutral: statsCardStyles.neutralTrend,
  }[trendType];

  return (
    <article className={statsCardStyles.container}>
      <div className={statsCardStyles.iconWrapper}>
        <Icon className={statsCardStyles.icon} strokeWidth={1.8} />
      </div>

      <div className={statsCardStyles.content}>
        <p className={statsCardStyles.label}>{name}</p>

        <p className={statsCardStyles.value}>{stats}</p>

        {trend && (
          <p className={`${statsCardStyles.trend} ${trendClass}`}>
            {trendType === "positive" && "↑ "}
            {trend}
          </p>
        )}
      </div>
    </article>
  );
};

export default StatsCard;