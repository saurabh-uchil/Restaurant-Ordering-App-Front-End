type LabelProps = {
  label: string;
}

const Label = ({ label }: LabelProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-black-700 mb-1">{label}</label>
    </div>
  )
}

export default Label
