import { landingPageStyles as style } from "../../styles/landingPage";

type FeatureCardProps = {
  icon: React.ElementType;
  title: string;
  body: string;
};

const FeatureCard = ({ icon: Icon, title, body }: FeatureCardProps) => {
  return (
    <div className={style.featureCard}>
      <Icon className={style.featureIcon} />

      <h3 className={style.featureTitle}>
        {title}
      </h3>

      <p className={style.featureBody}>
        {body}
      </p>
    </div>
  );
};

export default FeatureCard;