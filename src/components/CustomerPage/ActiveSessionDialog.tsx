import { LoaderCircle } from 'lucide-react';

type ActiveSessionDialogProps = {
  open: boolean;
  isJoining: boolean;
  errorMessage?: string;
  onJoin: () => void;
  onCancel: () => void;
};

const ActiveSessionDialog = ({
  open,
  isJoining,
  errorMessage,
  onJoin,
  onCancel,
}: ActiveSessionDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <section
        aria-labelledby="active-session-title"
        aria-describedby="active-session-description"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl border border-[#383936] bg-[#202220] p-6 text-[#FBF8F2] shadow-2xl sm:p-7"
        role="dialog"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E2793D]">
          Shared table
        </p>
        <h2 id="active-session-title" className="mt-3 text-xl font-semibold">
          Active Dining Session
        </h2>
        <p id="active-session-description" className="mt-3 text-sm leading-6 text-[#B5B0A6]">
          There is already an active dining session at this table. Would you like to join the existing session and view the table&apos;s orders?
        </p>

        {errorMessage && (
          <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200" role="alert">
            {errorMessage}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            className="rounded-full border border-[#4A4B46] px-5 py-3 text-sm font-semibold text-[#D1CCC1] transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isJoining}
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E2793D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#C9662F] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isJoining}
            onClick={onJoin}
            type="button"
          >
            {isJoining && <LoaderCircle aria-hidden="true" className="animate-spin" size={16} />}
            {isJoining ? 'Joining table...' : 'Join Table Session'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default ActiveSessionDialog;
