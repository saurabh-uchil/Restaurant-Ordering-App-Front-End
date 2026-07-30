import { MapPin } from "lucide-react";
import restaurantInfoStyle from "../../styles/restaurantInfo";

type RestaurantInfoProps = {
  restaurantName: string;
  description: string;
  address: string;
  isOpen: boolean;
  img?: string;
};

const RestaurantInfo = ({
  restaurantName,
  description,
  address,
  isOpen,
  img,
}: RestaurantInfoProps) => {
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
          <h2 className={restaurantInfoStyle.title}>
            {restaurantName}
          </h2>

          <p className={restaurantInfoStyle.description}>
            {description}
          </p>

          <div className={restaurantInfoStyle.metaContainer}>
            <div className={restaurantInfoStyle.address}>
              <MapPin className={restaurantInfoStyle.metaIcon} />
              <span>{address}</span>
            </div>

            <div className={restaurantInfoStyle.status}>
              <span
                className={
                  isOpen
                    ? restaurantInfoStyle.openDot
                    : restaurantInfoStyle.closedDot
                }
              />

              <span
                className={
                  isOpen
                    ? restaurantInfoStyle.openText
                    : restaurantInfoStyle.closedText
                }
              >
                {isOpen ? "Open today" : "Closed today"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={restaurantInfoStyle.actions}>
        <button
          type="button"
          className={restaurantInfoStyle.primaryButton}
        >
          Edit Restaurant
        </button>

        <button
          type="button"
          className={restaurantInfoStyle.secondaryButton}
        >
           Customer Page
        </button>
      </div>
    </section>
  );
};

export default RestaurantInfo;