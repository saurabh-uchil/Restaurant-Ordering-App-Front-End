import { browseDrawerStyles } from "../styles/browseDrawer";
import { optionStyles } from "../styles/optionsBrowser";

function AddOptions({data, optionGroups, setOptionGroups}) {

  const handleOptionChange = (e, item) => {
    const isChecked = e.target.checked;
        if(isChecked){
          setOptionGroups(prev => [...prev, item]);
        }else{
          setOptionGroups(prev => prev.filter(optionGroups => optionGroups._id !== item._id));
        }
  }

  const isChecked = (item) => {
      return optionGroups.some(og => og._id === item._id);
    }

  const options = (
  <div className={optionStyles.container}>
    {data.map((item) => (
      <label
        key={item.id}
        className={optionStyles.label}
      >
        <input
          type="checkbox"
          value={item.id}
          className={optionStyles.input}
          onChange={(e) => handleOptionChange(e, item)}
          checked={isChecked(item)}
        />

        <div className={optionStyles.card}>
          <div className={optionStyles.header}>
            <h3 className={optionStyles.title}>
              {item.name}
            </h3>

            <span className={optionStyles.badge}>
              {item.choices?.length || 0} Choices
            </span>
          </div>

          <div className={optionStyles.choicesContainer}>
            {item.choices?.map((choice, index) => (
              <div
                key={index}
                className={optionStyles.choice}
              >
                <span>{choice.name}</span>

                {choice.extraCost > 0 && (
                  <span className={optionStyles.extraCost}>
                    +${choice.extraCost}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </label>
    ))}
  </div>
);

  return (
    <div>
      <p className={browseDrawerStyles.drawerHeader}>Add Options Component</p>
      {options}
    </div>
  )
}

export default AddOptions
