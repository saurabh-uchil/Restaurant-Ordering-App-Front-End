import { browseDrawerStyles } from "../styles/browseDrawer";

function BrowseAddons({data, addons, setAddons}) {

    const handleAddonChange = (e, item) => {

        const isChecked = e.target.checked;
        if(isChecked){
          setAddons(prev => [...prev, item]);
        }else{
          setAddons(prev => prev.filter(addons => addons._id !== item._id));
        }
    }

    const isChecked = (item) => {
      return addons.some(addon => addon._id === item._id);
    }
    
    const addon = <div className={browseDrawerStyles.container}>
      {data.map((item) => (
        <label key={item.id} className={browseDrawerStyles.label} >
          <input type="checkbox" value={item._id} className={browseDrawerStyles.input} onChange={(e) => handleAddonChange(e, item)} checked={isChecked(item)}/>

          <div className={browseDrawerStyles.card} >
            <div>
              <div className={browseDrawerStyles.cardItem}>
                
                <h3 className={browseDrawerStyles.cardTitle}>
                  {item.name}
                </h3>
              </div>
            </div>

            <div className={browseDrawerStyles.cardInfo}>
              +${item.price}
            </div>

          </div>

        </label>
      ))}
    </div>

  return (
    <div>
      <h2 className={browseDrawerStyles.drawerHeader}>Add-ons</h2>
        {addon}
    </div>
  )
}

export default BrowseAddons
