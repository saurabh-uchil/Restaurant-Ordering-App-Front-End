import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/api";
import { useAuth, useCurrentUser } from "../../store/authStore";
import RestaurantInfo from "./RestaurantInfo";
import StatsHeader from "./statsHeader";
import StatsCard from "./statsCard";
import { quickActionsStyles, statsCardStyles } from "../../styles/stats";
import { popularItems } from "../../data/popularItemsMock";
import QuickActions from "./QuickAcitons";
import Popular from "./Popular";
import { statsMock } from "../../data/quickActions";


const Stats = () => {

  const currentUser = useCurrentUser((state) => state.currentUser);
  const accessToken = useAuth((state) => state.accessToken);

  const restaurantId = currentUser?.restaurant;

  const {data} = useQuery({
    queryKey: ["restaurant", restaurantId],

    queryFn: async () => {
      const response = await api.get(`/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    },
    enabled: Boolean(restaurantId && accessToken),
  });

  if (!currentUser) {
    return <p>Current user is not available.</p>;
  }

  const statsCards = statsMock.map((stat) => <StatsCard key={stat.name} {...stat} />);

  return (
    <div>
      
      {data && (
        <>
          <StatsHeader username={currentUser?.username ?? ""} />

          <RestaurantInfo isOpen address="1 William St, Melbourne, VIC 3000" restaurantName={data.name} description={data.description} />

          <div className={statsCardStyles.parentDiv}>
            {statsCards}
          </div>

          <div className={quickActionsStyles.parentDiv}>
            <Popular items={popularItems} />
            <QuickActions />
          </div>
        </>
      )}
    </div>
  );
};

export default Stats;