import { useQuery } from "@tanstack/react-query";
import MenuGrid from "../MenuGrid";
import { api } from "../../api/api";
import { menuCardStyles } from "../../styles/viewMenuStyles";
import { CircularProgress } from "@mui/material";
import { useCurrentUser } from "../../store/authStore";
 
const Menu = () => {

  const currentUser = useCurrentUser(state => state.currentUser);


  const {data, isFetching, error} = useQuery({
    queryKey:['menu'],
    queryFn: async()=>{
      const {data} = await api.get(`/restaurant/${currentUser?.restaurant}/menu`);
      return data;  
    }
  });

  const view = isFetching ? <div className={menuCardStyles.loadingContainer}><CircularProgress size={40} aria-label="Loading…" /></div>:
               error ? <div className={menuCardStyles.loadingContainer}><p className={menuCardStyles.errorLoadingMessage}>{error.message}</p></div> 
               : <MenuGrid mode="menu" data={data}/>

  return (
    <div>
      {view}
    </div>
  )
}

export default Menu
