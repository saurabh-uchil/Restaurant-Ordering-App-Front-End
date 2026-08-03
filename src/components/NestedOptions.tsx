/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFieldArray } from "react-hook-form";
import Button from "./Button";
import { MdAdd } from "react-icons/md";
import { RiDeleteBin4Fill } from "react-icons/ri";
import Input from "./Input";
import { nestedOptionsStyles } from "../styles/addToMenu";


const NestedOptions = ({ control, register, groupIndex, name, formState }: { control: any; register: any; groupIndex: number; name: string; formState: any; }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.${groupIndex}.choices`,
  });

  return (
    <div className={nestedOptionsStyles.container}>
      <div className={nestedOptionsStyles.header}>
        <p className={nestedOptionsStyles.title}>Options</p>

        <Button type="button" text="New Option" variant="form" icon={<MdAdd size={14} />} onClick={() => append({ name: "", extraCost: 0 })} />
      </div>

      <div className={nestedOptionsStyles.choicesContainer}>
        {fields.map((field, index) => (
          <div className={nestedOptionsStyles.choiceRow} key={field.id}>
            <div className={nestedOptionsStyles.choiceInput}>
              <Input id={`${name}.${groupIndex}.choices.${index}.name`} label="" placeholder="Choice" register={register} rules={{ required: "Choice is required" }} type="text" error={formState.errors?.[name]?.[groupIndex]?.choices?.[index]?.name} />
            </div>

            <div className={nestedOptionsStyles.costInput}>
              <Input id={`${name}.${groupIndex}.choices.${index}.extraCost`} label="" placeholder="Extra Cost" register={register} type="number" />
            </div>

            <button type="button" className={nestedOptionsStyles.deleteButton} onClick={() => remove(index)} aria-label="Delete option">
              <RiDeleteBin4Fill size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NestedOptions;