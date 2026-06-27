/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFieldArray} from 'react-hook-form';
import Label from './Label';
import Button from './Button';
import { MdAdd } from 'react-icons/md';
import { RiDeleteBin4Fill } from 'react-icons/ri';

const NestedOptions = ({control, register, groupIndex, name}: {control: any; register: any; groupIndex: number; name: string}) => {

    const {fields, append, remove} = useFieldArray({control, name: `${name}.${groupIndex}.choices`});
  
    return (
    <div>
      
      <div className='flex items-center justify-between mb-2'>
        <Label label="Options"/>  
        <Button type="button" text="Add Option" variant="secondary" icon={<MdAdd />} onClick={() => append({name: "", extraCost: 0})} />
      </div>

      {fields.map((field, index) => (
        <div className="flex border border-gray-300 p-1 m-1 rounded items-center gap-2 bg-gray-100" key={field.id}> 
            <input className="flex-[2] border border-gray-300 p-1 bg-white rounded" {...register(`${name}.${groupIndex}.choices.${index}.name`)} placeholder="Choice" type="text" />
            <input className="flex-[1] border border-gray-300 p-1 bg-white rounded" {...register(`${name}.${groupIndex}.choices.${index}.extraCost`)} placeholder="Extra Cost" type="number" />
            <Button type="button" classes="flex-none" variant="transparent" icon={<RiDeleteBin4Fill />} onClick={() => remove(index)} />
        </div>
      ))}

    </div>
  )
}

export default NestedOptions;
