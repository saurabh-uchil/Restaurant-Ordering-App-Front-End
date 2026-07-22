import FeatureCard from "./FeatureCard";
import { landingPageStyles as style } from "../../styles/landingPage";
import { features } from "../../data/featuresData";

const Features = () => {

   const featureCard =  features.map((feature) => (
        <FeatureCard
          key={feature.title}
          {...feature}
        />
    ));

    return (
        <section className={style.featuresSection}>
        {featureCard}
        </section>
    );
};

export default Features;