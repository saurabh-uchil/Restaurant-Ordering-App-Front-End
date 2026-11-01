import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ArrowRight, CircleHelp, Armchair, Utensils, AlertCircle } from "lucide-react";
import { customerLandingPageStyles as styles } from "../../styles/CustomerPage/customerLandingPage";
import { useParams, useSearchParams } from "react-router";
import ContentState from "../../components/ContentState";
import { useNavigate } from "react-router-dom";
import { useRestuarant } from "../../api/apihooks/useRestaurant";
import {
  useCheckActiveSession,
  useCreateSession,
  useJoinSession,
  useValidateSession,
} from "../../api/apihooks/useOrder";
import ActiveSessionDialog from "./ActiveSessionDialog";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === "string") return message;
  }
  return error instanceof Error ? error.message : fallback;
};

const CustomerLandingPage = () => {
  const { restaurant } = useParams<{ restaurant: string }>();
  const restaurantSlugName = restaurant ?? "";
  const [searchParams] = useSearchParams();
  const table = searchParams.get("table");
  const tableNumber = Number.parseInt(table ?? "", 10);
  const navigate = useNavigate();
  const [joinPromptDismissed, setJoinPromptDismissed] = useState(false);
  const [beginOrderError, setBeginOrderError] = useState("");

  const {
    mutateAsync: createSession,
    isPending: creatingSession,
  } = useCreateSession();
  const {
    mutateAsync: joinSession,
    isPending: joiningSession,
    error: joinError,
  } = useJoinSession();
  const {
    data: sessionValidation,
    isPending: validatingSession,
    isFetching: checkingCookieSession,
    isFetchedAfterMount: sessionFetchedAfterMount,
    isError: sessionValidationFailed,
    error: sessionValidationError,
    refetch: refetchSession,
  } = useValidateSession();

  const {
    data: restaurantData,
    isPending: restaurantPending,
    isError: restaurantFailed,
    error: restaurantError,
  } = useRestuarant(restaurantSlugName);

  const session = sessionValidation?.session;
  const sessionCheckComplete =
    sessionFetchedAfterMount && !validatingSession && !checkingCookieSession;
  const hasMatchingCookieSession = Boolean(
    sessionCheckComplete &&
    !sessionValidationFailed &&
    sessionValidation?.valid &&
    restaurantData?._id &&
    String(session?.restaurantId) === String(restaurantData._id) &&
    Number(session?.table) === tableNumber,
  );
  const missingOrInvalidCookie =
    axios.isAxiosError(sessionValidationError) &&
    sessionValidationError.response?.status === 401;
  const canCheckTableSession = Boolean(
    restaurantData?._id &&
    table &&
    sessionCheckComplete &&
    (missingOrInvalidCookie || (sessionValidation?.valid && !hasMatchingCookieSession)),
  );

  const {
    data: activeSessionResult,
    isPending: checkingActiveSession,
    isError: activeSessionCheckFailed,
    error: activeSessionCheckError,
    refetch: refetchActiveSession,
  } = useCheckActiveSession(
    restaurantData?._id ?? "",
    table ?? "",
    canCheckTableSession,
  );

  const hasActiveSession = canCheckTableSession && activeSessionResult?.hasActiveSession === true;
  const activeSessionDialogOpen = hasActiveSession && !joinPromptDismissed;
  const redirectedMenuPath = useRef<string | null>(null);

  useEffect(() => {
    const menuPath = `/restaurant/${restaurantSlugName}/menu?table=${table}`;
    if (hasMatchingCookieSession && table && redirectedMenuPath.current !== menuPath) {
      redirectedMenuPath.current = menuPath;
      navigate(menuPath, { replace: true });
    } else if (!hasMatchingCookieSession) {
      redirectedMenuPath.current = null;
    }
  }, [hasMatchingCookieSession, navigate, restaurantSlugName, table]);

  useEffect(() => {
    if (hasActiveSession) setJoinPromptDismissed(false);
  }, [hasActiveSession]);

  const handleBeginOrder = async () => {
    if (!restaurantData?._id || !table || creatingSession || hasActiveSession) return;
    setBeginOrderError("");

    try {
      await createSession({ restaurantId: restaurantData._id, table });
      navigate(`/restaurant/${restaurantSlugName}/menu?table=${table}`);
    } catch (error) {
      // Another device may have won the race to create this table session.
      const refreshed = await refetchActiveSession();
      if (refreshed.data?.hasActiveSession) {
        setJoinPromptDismissed(false);
        return;
      }
      setBeginOrderError(getErrorMessage(error, "We couldn't start your order. Please try again."));
    }
  };

  const handleJoinSession = async () => {
    if (!restaurantData?._id || !table || joiningSession) return;

    try {
      await joinSession({ restaurantId: restaurantData._id, table });
      navigate(`/restaurant/${restaurantSlugName}/menu?table=${table}`);
    } catch (error) {
      setBeginOrderError(getErrorMessage(error, "We couldn't join this table session."));
      await refetchActiveSession();
    }
  };

  if (!restaurantSlugName) {
    return (
      <ContentState
        type="error"
        title="Invalid restaurant"
        description="The restaurant link is invalid. Please scan the QR code again."
      />
    );
  }

  if (!table || !Number.isInteger(tableNumber) || tableNumber < 1) {
    return (
      <ContentState
        type="error"
        title="Invalid table"
        description="We couldn't identify your table. Please scan the QR code at your table again."
      />
    );
  }

  if (restaurantPending) {
    return <ContentState type="loading" title="Loading restaurant..." />;
  }

  if (restaurantFailed) {
    return (
      <ContentState
        type="error"
        title="Unable to load restaurant"
        description={restaurantError?.message || "Something went wrong while loading the restaurant."}
      />
    );
  }

  if (!restaurantData) {
    return (
      <ContentState
        type="empty"
        title="Restaurant not found"
        description="This restaurant may no longer be available."
      />
    );
  }

  if (validatingSession || checkingCookieSession || (canCheckTableSession && checkingActiveSession)) {
    return <ContentState type="loading" title="Checking your table session..." />;
  }

  if (sessionValidationFailed && !missingOrInvalidCookie) {
    return (
      <ContentState
        type="error"
        title="Unable to check your session"
        description={getErrorMessage(sessionValidationError, "Please check your connection and try again.")}
        actionText="Try again"
        onAction={() => void refetchSession()}
      />
    );
  }

  if (canCheckTableSession && activeSessionCheckFailed) {
    return (
      <ContentState
        type="error"
        title="Unable to check this table"
        description={getErrorMessage(activeSessionCheckError, "Please check your connection and try again.")}
        actionText="Try again"
        onAction={() => void refetchActiveSession()}
      />
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.topBar}>
          <div className={styles.brand}>
            <span className={styles.logoMark} />
            <span className={styles.logoText}>The Pass</span>
          </div>
          <span className={styles.dineInLabel}>Dine-in ordering</span>
        </header>

        <main className={styles.content}>
          <section className={styles.intro}>
            <p className={styles.welcomeTag}>Welcome to</p>
            <h1 className={styles.restaurantName}>{restaurantData.name}</h1>
            <div className={styles.accentLine} />
            <p className={styles.description}>{restaurantData.description}</p>
          </section>

          <section className={styles.tableCard}>
            <div className={styles.tableHeader}>
              <div>
                <p className={styles.tableLabel}>Your table</p>
                <p className={styles.tableNumber}>Table {table}</p>
              </div>
              <div className={styles.tableIcon}><Armchair size={20} /></div>
            </div>

            <div className={styles.divider} />

            <div className={styles.orderInfo}>
              <div className={styles.orderInfoIcon}><Utensils size={18} /></div>
              <div>
                <p className={styles.orderInfoTitle}>Dine-in ordering</p>
                <p className={styles.orderInfoText}>Your order will be sent directly to the kitchen.</p>
              </div>
            </div>

            {hasActiveSession ? (
              <button
                type="button"
                className={styles.beginButton}
                onClick={() => setJoinPromptDismissed(false)}
              >
                <span>Join existing table session</span>
                <ArrowRight size={17} />
              </button>
            ) : (
              <button
                type="button"
                className={styles.beginButton}
                onClick={handleBeginOrder}
                disabled={creatingSession || !activeSessionResult}
                aria-busy={creatingSession}
              >
                <span className={styles.beginButtonContent}>
                  {creatingSession && <span className={styles.loadingSpinner} aria-hidden="true" />}
                  <span>{creatingSession ? "Starting order..." : "Begin Order"}</span>
                </span>
                {!creatingSession && <ArrowRight size={17} />}
              </button>
            )}

            {(beginOrderError || (!canCheckTableSession && !activeSessionResult)) && (
              <div className={styles.sessionError} role="alert">
                <div className={styles.sessionErrorContent}>
                  <AlertCircle className={styles.sessionErrorIcon} aria-hidden="true" />
                  <span>{beginOrderError || "We couldn't confirm the table is available. Please try again."}</span>
                </div>
              </div>
            )}

            <div className={styles.helpBox}>
              <div className={styles.helpIcon}><CircleHelp size={16} /></div>
              <div>
                <p className={styles.helpTitle}>Need help?</p>
                <p className={styles.helpText}>Please ask one of our staff.</p>
              </div>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          Powered by <span className={styles.footerBrand}>The Pass</span>
        </footer>
      </div>

      <ActiveSessionDialog
        open={activeSessionDialogOpen}
        isJoining={joiningSession}
        errorMessage={joinError ? getErrorMessage(joinError, "We couldn't join this table session.") : undefined}
        onJoin={() => void handleJoinSession()}
        onCancel={() => setJoinPromptDismissed(true)}
      />
    </div>
  );
};

export default CustomerLandingPage;
