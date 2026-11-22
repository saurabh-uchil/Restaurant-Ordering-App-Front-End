
import {
  ArrowRight,
  CircleHelp,
  Armchair,
  Utensils,
  AlertCircle,
} from "lucide-react";
import { customerLandingPageStyles as styles } from "../../styles/CustomerPage/customerLandingPage";
import { useParams, useSearchParams } from "react-router";
import { useRestuarant } from "../../api/apihooks/useRestaurant";
import ContentState from "../../components/ContentState";
import { useNavigate } from "react-router-dom";
import {
  useCheckActiveSession,
  useCreateSession,
  useJoinSession,
} from "../../api/apihooks/useOrder";
import { useState } from "react";
import ExistingOrderDialog from "./ExistingSessionDialog";

const CustomerLandingPage = () => {
  const [existingSessionId, setExistingSessionId] = useState<string | null>(
    null,
  );
  const [showExistingOrderDialog, setShowExistingOrderDialog] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);

  const { restaurant } = useParams<{ restaurant: string }>();
  const restaurantSlugName = restaurant ?? "";

  const [searchParams] = useSearchParams();
  const table = searchParams.get("table");

  const navigate = useNavigate();

  const {
    mutateAsync: createSession,
    isPending: creatingSession,
  } = useCreateSession();

  const {
    mutateAsync: checkActiveSession,
    isPending: checkingSession,
  } = useCheckActiveSession();

  const {
    mutateAsync: joinSession,
    isPending: joiningSession,
  } = useJoinSession();

  const { data, isPending, isError, error } = useRestuarant(restaurantSlugName);

  const handleBeginOrder = async () => {
    if (!data?._id || !table || creatingSession || checkingSession) {
      return;
    }

    setActionError(null);

    try {
      const activeSession = await checkActiveSession({
        restaurantId: data._id,
        table,
      });

      if (activeSession.hasActiveSession) {
        setExistingSessionId(activeSession.session.sessionId);
        setShowExistingOrderDialog(true);
        return;
      }

      await createSession({
        restaurantId: data._id,
        table,
      });

      navigate(`/restaurant/${restaurantSlugName}/menu?table=${table}`);
    } catch (error) {
      console.error("Failed to start order:", error);

      setActionError(
        error instanceof Error
          ? error.message
          : "We couldn't start your order. Please try again.",
      );
    }
  };

  const handleJoinOrder = async () => {
    if (!existingSessionId || joiningSession) {
      return;
    }

    setJoinError(null);

    try {
      await joinSession(existingSessionId);

      setShowExistingOrderDialog(false);

      navigate(`/restaurant/${restaurantSlugName}/menu?table=${table}`);
    } catch (error) {
      console.error("Failed to join session:", error);

      setJoinError(
        error instanceof Error
          ? error.message
          : "We couldn't join the existing order. Please try again.",
      );
    }
  };

  const handleCancelJoin = () => {
    if (joiningSession) return;

    setShowExistingOrderDialog(false);
    setExistingSessionId(null);
    setJoinError(null);
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

  if (!table) {
    return (
      <ContentState
        type="error"
        title="Invalid table"
        description="We couldn't identify your table. Please scan the QR code at your table again."
      />
    );
  }

  if (isPending) {
    return <ContentState type="loading" title="Loading restaurant..." />;
  }

  if (isError) {
    return (
      <ContentState
        type="error"
        title="Unable to load restaurant"
        description={
          error?.message || "Something went wrong while loading the restaurant."
        }
      />
    );
  }

  if (!data) {
    return (
      <ContentState
        type="empty"
        title="Restaurant not found"
        description="This restaurant may no longer be available."
      />
    );
  }

  const isProcessing = checkingSession || creatingSession;

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

            <h1 className={styles.restaurantName}>{data.name}</h1>

            <div className={styles.accentLine} />

            <p className={styles.description}>{data.description}</p>
          </section>

          <section className={styles.tableCard}>
            <div className={styles.tableHeader}>
              <div>
                <p className={styles.tableLabel}>Your table</p>
                <p className={styles.tableNumber}>Table {table}</p>
              </div>

              <div className={styles.tableIcon}>
                <Armchair size={20} />
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.orderInfo}>
              <div className={styles.orderInfoIcon}>
                <Utensils size={18} />
              </div>

              <div>
                <p className={styles.orderInfoTitle}>Dine-in ordering</p>
                <p className={styles.orderInfoText}>
                  Your order will be sent directly to the kitchen.
                </p>
              </div>
            </div>

            <button
              type="button"
              className={styles.beginButton}
              onClick={handleBeginOrder}
              disabled={isProcessing}
              aria-busy={isProcessing}
            >
              <span className={styles.beginButtonContent}>
                {isProcessing && (
                  <span className={styles.loadingSpinner} aria-hidden="true" />
                )}

                <span>
                  {checkingSession
                    ? "Checking table..."
                    : creatingSession
                      ? "Starting order..."
                      : "Begin Order"}
                </span>
              </span>

              {!isProcessing && <ArrowRight size={17} />}
            </button>

            {actionError && (
              <div className={styles.sessionError} role="alert">
                <div className={styles.sessionErrorContent}>
                  <AlertCircle
                    className={styles.sessionErrorIcon}
                    aria-hidden="true"
                  />

                  <span>{actionError}</span>
                </div>
              </div>
            )}

            <div className={styles.helpBox}>
              <div className={styles.helpIcon}>
                <CircleHelp size={16} />
              </div>

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

      <ExistingOrderDialog
        isOpen={showExistingOrderDialog}
        table={Number(table)}
        onCancel={handleCancelJoin}
        onJoin={handleJoinOrder}
        isJoining={joiningSession}
        joinError={joinError}
      />
    </div>
  );
};

export default CustomerLandingPage;
