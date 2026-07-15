/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFieldArray } from "react-hook-form";
import Label from "./Label";
import Button from "./Button";
import { MdAdd } from "react-icons/md";
import { RiDeleteBin4Fill } from "react-icons/ri";
import Input from "./Input";

const NestedOptions = ({
  control,
  register,
  groupIndex,
  name,
  formState,
}: {
  control: any;
  register: any;
  groupIndex: number;
  name: string;
  formState: any;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.${groupIndex}.choices`,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label label="Options" />
        <Button
          type="button"
          text="Add Option"
          variant="secondary"
          icon={<MdAdd />}
          onClick={() => append({ name: "", extraCost: 0 })}
        />
      </div>

      {fields.map((field, index) => (
        <div
          className="flex items-start gap-3 border border-slate-200 bg-white rounded-xl p-4 mb-3 shadow-sm"
          key={field.id}
        >
          <div className="flex-[2]">
            <Input
              id={`${name}.${groupIndex}.choices.${index}.name`}
              label=""
              placeholder="Choice"
              register={register}
              rules={{ required: "Choice is required" }}
              type="text"
              error={
                formState.errors?.[name]?.[groupIndex]?.choices?.[index]?.name
              }
            />
          </div>

          <div className="flex-[1]">
            <Input
              id={`${name}.${groupIndex}.choices.${index}.extraCost`}
              placeholder="Extra Cost"
              register={register}
              type="number"
            />
          </div>

          <div className="pt-1">
            <Button
              type="button"
              classes="flex-none"
              variant="transparent"
              icon={<RiDeleteBin4Fill />}
              onClick={() => remove(index)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NestedOptions;
