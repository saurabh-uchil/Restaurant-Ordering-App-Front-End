import { statsHeader } from "../../styles/stats";

type propsType = {
    username:string
} 

const StatsHeader = ({username}:propsType) => {
  return(
    <div className={statsHeader.container}>
        <p className={statsHeader.heading}>
            Welcome back, {username} 👋
        </p>

        <p className={statsHeader.description}>
           Manage your restaurant at a glance.
        </p>
    </div>
  )
}

export default StatsHeader