import { ChevronRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { quickActionsStyles } from "../../styles/stats";

type QuickActionLinksProps = {
    title: string,
    path: string,
    icon: LucideIcon
}

const QuickActionLinks = ({ title, path, icon: Icon }: QuickActionLinksProps) => {
  return (
    <Link to={path} className={quickActionsStyles.action}>
      
      <span className={quickActionsStyles.iconWrapper}>
        <Icon className={quickActionsStyles.icon} />
      </span>

      <span className={quickActionsStyles.title}>
        {title}
      </span>

      <ChevronRight className={quickActionsStyles.arrow} />
      
    </Link>
  )
}

export default QuickActionLinks