import { useNavigate } from "react-router-dom";
import { menuCardStyles } from "../styles/viewMenuStyles";
import { MdEdit } from "react-icons/md";
import { ShoppingCart } from "lucide-react";

type CardProps = {
  item: any,
  mode: 'customer' | 'admin',
  onAddToCart?: (item: any)=>void
}

const Cards = ({item, mode, onAddToCart}:CardProps) => {
  console.log(item)
  const navigate = useNavigate();

  const actionButton = mode == 'admin'? 
          <button className={menuCardStyles.imageAction} onClick={() => navigate(`/dashboard/editItem/${item._id}`)}>
            <MdEdit />
         </button> : mode == 'customer' ? 
         <button className={menuCardStyles.imageAction} onClick={() => onAddToCart?.(item)}>
             <ShoppingCart />
         </button> : '';
  return (
    <article key={item._id} className={menuCardStyles.card}>
      <div className={menuCardStyles.imageContainer}>
        <img
          src={item.imageUrl}
          alt={item.name}
          loading="lazy"
          className={menuCardStyles.image}
        />

         {actionButton}
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
