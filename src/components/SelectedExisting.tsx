import { selectedItemsStyles } from "../styles/selectedExisitng";

const SelectedExisting = ({selectedItems, setSelectedItems, label}) => {

const handleRemove  = (id) => {
    setSelectedItems(prev => prev.filter(item => item._id !== id));
}
const selectedDiv = 
  selectedItems.length > 0 ? (
  <div className={selectedItemsStyles.container}>
    {selectedItems.map((item) => (
      <div
        key={item._id}
        className={selectedItemsStyles.tag}
      >
        <span>{item.name}</span>

        <button
          type="button"
          onClick={() => handleRemove(item._id)}
          className={selectedItemsStyles.removeButton}
        >
          ✕
        </button>
      </div>
    ))}
  </div>
) : (
  <div className={selectedItemsStyles.emptyState}>
    No {label} Selected
  </div>
)
    

  return (
    <div>
        {selectedDiv}
    </div>
   
  )
}

export default SelectedExisting;
