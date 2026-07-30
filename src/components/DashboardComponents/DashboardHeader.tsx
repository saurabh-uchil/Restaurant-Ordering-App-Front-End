import type { LucideIcon } from "lucide-react";
import { dashboardHeaderStyles } from "../../styles/dashboardHeader";

type DashboardHeaderProps = {
    title: string;
    description?: string;
    icon: LucideIcon;
    buttonText?: string;
    buttonIcon?: LucideIcon;
    onButtonClick?: () => void;
    children?: React.ReactNode;
};

const DashboardHeader = ({title, description, icon: Icon, buttonText, buttonIcon: ButtonIcon, onButtonClick, children}: DashboardHeaderProps) => {
    return (
        <div className={dashboardHeaderStyles.parentDiv}>
            
            <div className={dashboardHeaderStyles.leftSection}>
                
                <div className={dashboardHeaderStyles.iconWrapper}>
                    <Icon size={24} />
                </div>

                <div className={dashboardHeaderStyles.textWrapper}>
                    <h1 className={dashboardHeaderStyles.title}>
                        {title}
                    </h1>

                    {description && (
                        <p className={dashboardHeaderStyles.description}>
                            {description}
                        </p>
                    )}

                    {children && (
                        <div className={dashboardHeaderStyles.children}>
                            {children}
                        </div>
                    )}
                </div>
            </div>

            {buttonText && onButtonClick && (
                <button type="button" onClick={onButtonClick} className={dashboardHeaderStyles.button} >
                    {ButtonIcon && (
                        <ButtonIcon className={dashboardHeaderStyles.buttonIcon} />
                    )}
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default DashboardHeader;