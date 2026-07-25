import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/api";
import { useAuth, useCurrentUser } from "../../store/authStore";

const Stats = () => {

  const currentUser = useCurrentUser((state) => state.currentUser);
  const accessToken = useAuth((state) => state.accessToken);

  const restaurantId = currentUser?.restaurant;

  const {
    data,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["restaurant", restaurantId],

    queryFn: async () => {
      const response = await api.get(`/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Restaurant response:", response.data);

      return response.data;
    },

    enabled: Boolean(restaurantId && accessToken),
  });

  console.log({
    currentUser,
    restaurantId,
    accessToken,
    data,
    error,
  });

  if (!currentUser) {
    return <p>Current user is not available.</p>;
  }

  return (
    <div>
      <p>Welcome back, {currentUser.username}</p>

      {!restaurantId && <p>No restaurant ID found.</p>}

      {isFetching && <p>Fetching...</p>}

      {isError && <p>{error.message}</p>}

      {data && 
      <div>
        <p>Welcome to: {data.name}</p>
        <p>{data.description}</p>
      </div> }
    </div>
  );
};

export default Stats;