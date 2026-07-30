import { actions } from "../../data/quickActions";
import { quickActionsStyles } from "../../styles/stats";
import QuickActionLinks from "./QuickActionLinks";

const QuickActions = () => {

  const links = actions.map((action)=>{
    return(
      <QuickActionLinks key={action.title} icon={action.icon} path={action.path} title={action.title}/>
    )
  })


  return (
    <section className={quickActionsStyles.container}>
      <div className={quickActionsStyles.header}>
        <div>
          <h2 className={quickActionsStyles.heading}>Quick Actions</h2>

          <p className={quickActionsStyles.description}>
            Manage your restaurant faster.
          </p>
        </div>
      </div>

      <div className={quickActionsStyles.actions}>
        {links}
      </div>
    </section>
  )
}

export default QuickActions
