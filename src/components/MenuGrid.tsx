import { viewMenuStyles } from "../styles/viewMenuStyles";
import Cards from "./Cards";

const MenuGrid = ({mode, data}) => {

    const card = data.map((item) => {
        return (
            <Cards key={item.id} item={item}/>
        )})

  return (
    <div className={viewMenuStyles.cardContainer}>
      <div className={viewMenuStyles.cardGridCols}>
        {card}
      </div>
    </div>
  )
}

export default MenuGrid
