import { orderTimelineStyles } from "../../styles/CustomerPage/ordertimeline";
import receivedImage from "../../assets/order-status/received.png";
import preparingImage from "../../assets/order-status/preparing.png";
import readyImage from "../../assets/order-status/ready.png";

type OrderTimelineProps = {
  status: "received" | "preparing" | "ready" | "completed";
};

type StepState = "completed" | "current" | "upcoming";

const steps = [
  { status: "received", label: "Received", image: receivedImage },
  { status: "preparing", label: "Preparing", image: preparingImage },
  { status: "ready", label: "Ready", image: readyImage },
];

const statusOrder = ["received", "preparing", "ready", "completed"];

const statusMessages = {
  received: "Your order has been received and is waiting for the kitchen.",
  preparing: "Your order is being prepared by our kitchen team.",
  ready: "Your order is ready. Food will be out soon.",
  completed: "Your order has been completed. Enjoy your meal!",
};

const OrderTimeline = ({ status }: OrderTimelineProps) => {
  const getStepState = (stepStatus: string): StepState => {
    const currentIndex = statusOrder.indexOf(status);
    const stepIndex = statusOrder.indexOf(stepStatus);

    if (status === "completed") {
      return "completed";
    }

    if (stepIndex < currentIndex) {
      return "completed";
    }

    if (stepIndex === currentIndex) {
      return "current";
    }

    return "upcoming";
  };

  const getLineState = (nextStepStatus: string) => {
    const currentIndex = statusOrder.indexOf(status);
    const nextIndex = statusOrder.indexOf(nextStepStatus);

    if (nextIndex <= currentIndex) {
      return "completed";
    }

    if (nextIndex === currentIndex + 1) {
      return "current";
    }

    return "upcoming";
  };

  return (
    <div className={orderTimelineStyles.container}>
      <div className={orderTimelineStyles.timeline}>
        {steps.map((step) => {
          const stepState = getStepState(step.status);

          return (
            <div key={step.status} className={orderTimelineStyles.step}>
              <div
                className={`${orderTimelineStyles.imageWrapper} ${
                  stepState === "current"
                    ? orderTimelineStyles.currentImage
                    : ""
                }`}
              >
                <img
                  src={step.image}
                  alt={step.label}
                  className={orderTimelineStyles.image}
                />
              </div>

              <p
                className={`${orderTimelineStyles.label} ${
                  stepState === "completed"
                    ? orderTimelineStyles.completedText
                    : stepState === "current"
                      ? orderTimelineStyles.currentText
                      : orderTimelineStyles.upcomingText
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className={orderTimelineStyles.timelineRow}>
        <div className={orderTimelineStyles.timelineLine}>
          {steps.slice(0, -1).map((step, index) => {
            const nextStep = steps[index + 1];
            const lineState = getLineState(nextStep.status);

            return (
              <div
                key={`${step.status}-${nextStep.status}`}
                className={
                  lineState === "completed"
                    ? orderTimelineStyles.completedLine
                    : lineState === "current"
                      ? orderTimelineStyles.currentLine
                      : orderTimelineStyles.upcomingLine
                }
              />
            );
          })}
        </div>

        {steps.map((step) => {
          const stepState = getStepState(step.status);

          return (
            <div
              key={step.status}
              className={orderTimelineStyles.timelineItem}
            >
              <div
                className={`${orderTimelineStyles.statusCircle} ${
                  stepState === "completed"
                    ? orderTimelineStyles.completedCircle
                    : stepState === "current"
                      ? orderTimelineStyles.currentCircle
                      : orderTimelineStyles.upcomingCircle
                }`}
              />
            </div>
          );
        })}
      </div>

      <div className={orderTimelineStyles.statusMessage}>
        {statusMessages[status]}
      </div>
    </div>
  );
};

export default OrderTimeline;