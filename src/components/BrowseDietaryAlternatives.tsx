import { browseDrawerStyles } from "../styles/browseDrawer";
import Button from "./Button";

const BrowseDietaryAlternatives = ({data, dietaryAlternatives, setDietaryAlternatives}) => {


  const handleDAChange = (e, item) => {
    const isChecked = e.target.checked;
    if(isChecked){
      setDietaryAlternatives(prev => [...prev, item]);
    }else{
      setDietaryAlternatives(prev => prev.filter(selectedItem => selectedItem._id !== item._id));
    }
  }

  const isChecked = (item) => {
      return dietaryAlternatives.some(da => da._id === item._id);
    }

  const dietaries = (
  <div className={browseDrawerStyles.container}>
    {data.map((item) => (
      <label key={item.id} className={browseDrawerStyles.label} >
        
        <input type="checkbox" value={item._id} className={browseDrawerStyles.input} onChange={(e) => handleDAChange(e, item)} checked={isChecked(item)} />

        <div className={browseDrawerStyles.card} >
          <div>
            <div className={browseDrawerStyles.cardItem}>
              
              <h3 className={browseDrawerStyles.cardTitle}>
                {item.name}
              </h3>

              <span className={browseDrawerStyles.cardBadge}>{item.shortCode}</span>
            
            </div>
          </div>

          <div className={browseDrawerStyles.cardInfo}>
            +${item.additionalPrice}
          </div>

        </div>
      </label>
    ))}
  </div>
);

  return (
    <div>
       <h2 className={browseDrawerStyles.drawerHeader}>Dietary Alternatives</h2>
        {dietaries}
    </div>
  )
}

export default BrowseDietaryAlternatives;
