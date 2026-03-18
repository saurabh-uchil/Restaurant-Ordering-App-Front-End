/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'

type CreatableInputProps = {
  label?: string;
  name: string;
  control: any;
  options: string[];
}

const CreatableInput = ({ label, name, control, options }: CreatableInputProps) => (
    <div className="mb-4">
        {label && <label className="block text-sm font-medium text-black-700 mb-1">{label}</label>}
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
            const value = (field.value || []).map((v: any) => ({ label: v, value: v }));

            const selectOptions = options.map(opt => ({ label: opt, value: opt }));

                return (
                    <CreatableSelect
                        isMulti
                        options={selectOptions}
                        value={value}
                        onChange={(newValue) => {
                            const values = (newValue || []).map(item => item.value);
                            field.onChange(values);
                        }}
                    />
                );
            }}
        />
    </div>
)

export default CreatableInput
