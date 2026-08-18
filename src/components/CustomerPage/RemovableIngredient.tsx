import { useFormContext } from "react-hook-form";
import { itemCustomizerStyles as styles } from "../../styles/CustomerPage/itemCustomizer";

type RemovableIngredientProps = {
    ingredients: string[],
    fieldName: string
}

const RemovableIngredient = ({ingredients, fieldName}:RemovableIngredientProps) => {

    const {register} = useFormContext();

    const ingredientsDiv = ingredients.map((ingredient) => (
    <label key={ingredient} className={styles.choiceRow}>
      <div className={styles.choiceInfo}>
        <input type="checkbox" value={ingredient} className={styles.checkbox} {...register(fieldName)}/>

        <span className={styles.choiceName}>{ingredient}</span>
      </div>
    </label>
  ));

  return (
    <section className={styles.section}>
              <p className={styles.sectionTitle}>Remove ingredients (Optional)</p>
              <div className={styles.choiceList}>{ingredientsDiv}</div>
    </section>
  )
}

export default RemovableIngredient;