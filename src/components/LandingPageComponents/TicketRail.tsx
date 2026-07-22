import { tickets } from "../../data/ticketsData";
import { landingPageStyles as style } from "../../styles/landingPage";
import Tickets from "./Tickets";

const TicketRail = () => {
  const ticketsCard = tickets.map((ticket) => (
          <Tickets
            key={ticket.id}
            {...ticket}
          />
        ))  
  return (
    <div className={style.ticketRail}>
      <div className={style.ticketContainer}>
        {ticketsCard}
      </div>
    </div>
  );
};

export default TicketRail;