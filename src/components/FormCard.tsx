type FormCardProps = {
    title?: string;
    children: React.ReactNode;
}

export default function FormCard({ title, children }: FormCardProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-4">
        {title && (
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {title}
          </h2>
        )}

        <div className="space-y-5">{children}</div>
      </div>
    </div>
  );
}