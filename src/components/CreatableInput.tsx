/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LucideIcon } from 'lucide-react';
import { Controller } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'

type CreatableInputProps = {
  icon?: LucideIcon;  
  label?: string;
  name: string;
  control: any;
  options: string[];
}

const CreatableInput = ({ icon: Icon, label, name, control, options }: CreatableInputProps) => (
    <div className="mb-6">
        {label && (
        <div className="flex items-center gap-2">
            {Icon && (
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#FCE8D8] text-[#C4632E]">
                <Icon size={14} />
            </div>
            )}

            <p className="text-[13px] font-semibold text-[#2F2A25]">
            {label}
            </p>
        </div>
    )}

        <Controller
            name={name}
            control={control}
            render={({ field }) => {
            const value = (field.value || []).map((v: any) => ({ label: v, value: v }));
            const selectOptions = options.map(opt => ({ label: opt, value: opt }));

                return (
                    <div className="mt-2">
                        <CreatableSelect
                        isMulti
                        options={selectOptions}
                        value={value}
                        onChange={(newValue) => {
                            const values = (newValue || []).map(item => item.value);
                            field.onChange(values);
                        }}
                    />
                    </div>
                );
            }}
        />
    </div>
)

export default CreatableInput
