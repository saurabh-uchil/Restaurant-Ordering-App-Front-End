import { useNavigate } from "react-router-dom";
import { menuCardStyles } from "../styles/viewMenuStyles";
import { MdEdit } from "react-icons/md";

const Cards = ({item}) => {
  console.log(item)
  const navigate = useNavigate();
  return (
    <article key={item._id} className={menuCardStyles.card}>
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
            onClick={() => navigate(`/dashboard/editItem/${item._id}`)}
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
            <div key={diet?._id}>
                 <span  className={menuCardStyles.dietaryBadge}>{diet?.shortCode}</span>
           </div>
          ))}
        </div>

      </div>
    </article>
  )
}

export default Cards
