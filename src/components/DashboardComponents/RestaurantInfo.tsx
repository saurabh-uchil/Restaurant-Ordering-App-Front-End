import restaurantInfoStyle from "../../styles/restaurantInfo";

type RestaurantInfoProp = {
  userName: string;
  restaurantName: string;
  description: string;
  img?: string;
};

const RestaurantInfo = ({
  userName,
  restaurantName,
  description,
  img,
}: RestaurantInfoProp) => {
  const imgSrc = img || "/restaurant-avatar.svg";

  return (
    <section className={restaurantInfoStyle.container}>
      <div className={restaurantInfoStyle.content}>
        <img
          src={imgSrc}
          alt={restaurantName}
          className={restaurantInfoStyle.image}
        />

        <div className={restaurantInfoStyle.details}>
          <span className={restaurantInfoStyle.welcome}>
            Welcome back, {userName} 👋
          </span>

          <h2 className={restaurantInfoStyle.title}>
            {restaurantName}
          </h2>

          <p className={restaurantInfoStyle.description}>
            {description}
          </p>
        </div>
      </div>

      <div className={restaurantInfoStyle.actions}>
        <button className={restaurantInfoStyle.primaryButton}>
          Edit Restaurant
        </button>

        <button className={restaurantInfoStyle.secondaryButton}>
          View Customer Page
        </button>
      </div>
    </section>
  );
};

export default RestaurantInfo;