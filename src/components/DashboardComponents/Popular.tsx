import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { popularItemsStyles } from "../../styles/stats";
import type { PopularItemType } from "./PopularItem";
import PopularItem from "./PopularItem";


type PopularProps = {
  items: PopularItemType[];
};

const Popular = ({ items }: PopularProps) => {

  const popularItems = items.slice(0, 4).map((item, index) => {
    return(
      <PopularItem  item={item} index={index}/>
    );
  });

  const noItems = <div className={popularItemsStyles.emptyState}>
                    <p className={popularItemsStyles.emptyTitle}>
                      No orders yet today
                    </p>

                    <p className={popularItemsStyles.emptyDescription}>
                      Popular menu items will appear here once orders start coming in.
                    </p>
                  </div>

  const itemsView = items.length > 0 ? popularItems : noItems;

  return (
    <section className={popularItemsStyles.container}>
      
      <div className={popularItemsStyles.header}>
        
        <div>
          
          <h2 className={popularItemsStyles.heading}>
            Popular Items Today
          </h2>

          <p className={popularItemsStyles.description}>
            Your most ordered menu items today.
          </p>

        </div>

        <Link to="/dashboard/menu" className={popularItemsStyles.viewAll}>
           View menu
          <ArrowUpRight className={popularItemsStyles.viewAllIcon} />
        </Link>
        
      </div>

      <div className={popularItemsStyles.list}>
        {itemsView}
      </div>
      
    </section>
  );
};

export default Popular;