import { popularItemsStyles } from '../../styles/stats';

export type PopularItemType = {
  id: string;
  name: string;
  orders: number;
};

type PopularItemsProps = {
    item : PopularItemType,
    index: number
}


const PopularItem = ({item, index}: PopularItemsProps) => {
  return (
    <div key={item.id} className={popularItemsStyles.item}>

       <span className={popularItemsStyles.position}>{index + 1}</span>

        <div className={popularItemsStyles.itemDetails}>
            <h3 className={popularItemsStyles.itemName}>{item.name}</h3>
        </div>

        <div className={popularItemsStyles.orderDetails}>
            <p className={popularItemsStyles.orders}>{item.orders} orders</p>
        </div>

    </div>
  )
}

export default PopularItem