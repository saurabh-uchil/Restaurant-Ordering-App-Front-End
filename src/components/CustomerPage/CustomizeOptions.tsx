import { useFormContext } from "react-hook-form";
import { itemCustomizerStyles as styles } from "../../styles/CustomerPage/itemCustomizer";

type Choices = {
    name: string,
    cost?: number | undefined
}

type CustomOptionsProps = {
    option: Choices[],
    title? :string,
    type: "radio" | "checkbox",
    fieldName: string
}

const CustomizeOptions = ({option, title, type, fieldName}:CustomOptionsProps) => {

const {register} = useFormContext();
  
 const choicesDiv = option.map((choice) => (
    <label key={choice.name} className={styles.choiceRow}>
      <div className={styles.choiceInfo}>
        <input
          type={type}
          value={choice.name}
          className={styles.checkbox}
          {...register(fieldName)}
        />

        <span className={styles.choiceName}>{choice.name}</span>
      </div>

      {choice.cost !== undefined && choice.cost > 0 && (
        <span className={styles.cost}>+${choice.cost}</span>
      )}
    </label>
  ));


  return (
    <section className={styles.section}>
        {title && <p className={styles.sectionTitle}>{title}</p>}
        <div className={styles.choiceList}>{choicesDiv}</div>
    </section>
  )
};

export default CustomizeOptions;
