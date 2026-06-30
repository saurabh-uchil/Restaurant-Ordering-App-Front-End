import { IoAddOutline } from "react-icons/io5";
import { menuCardStyles } from "../styles/viewMenuStyles";
import { MdEdit } from "react-icons/md";

const Cards = ({item}) => {
  return (
    <article className={menuCardStyles.card}>
      <div className={menuCardStyles.imageContainer}>
        <img
          src={item.imageUrl}
          alt={item.name}
          loading="lazy"
          className={menuCardStyles.image}
        />

         <button
           /*  onClick={onButtonClick} */
            className={menuCardStyles.imageAction}
            /* aria-label={buttonLabel} */
        >
            {/* <IoAddOutline /> */}
            <MdEdit />
        </button>
      </div>

      <div className={menuCardStyles.content}>
        <div className={menuCardStyles.header}>
          <h3 className={menuCardStyles.title}>
            {item.name}
          </h3>

          <span className={menuCardStyles.price}>
            ${item.price}
          </span>
        </div>

         <p className={menuCardStyles.description}>
          {item.description}
        </p>

        <div className={menuCardStyles.dietaryContainer}>
          {item.dietaryAlternatives.length > 0 && (
            <p className={menuCardStyles.dietaryText}>Also available as</p>
          )}
          {item.dietaryAlternatives.map((diet) => (
            <div>
                 <span key={diet._id} className={menuCardStyles.dietaryBadge}>{diet.shortCode}</span>
           </div>
          ))}
        </div>

      </div>
    </article>
  )
}

export default Cards
