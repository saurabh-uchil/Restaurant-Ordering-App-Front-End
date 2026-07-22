import { landingPageStyles as style } from "../../styles/landingPage";

type TicketProps = {
  id: string;
  table: string;
  status: string;
  color: string;
  rot: number;
  delay: string;
  dur: string;
};

const Tickets = ({id, table, status, color, rot, delay, dur}:TicketProps) => {

  const ticketAnimationStyle = {
    "--rot-a": `${rot}deg`,
    "--rot-b": `${rot * -1}deg`,
    animationDuration: dur,
    animationDelay: delay,
  } as React.CSSProperties; 
    
  return (
     <div className={style.ticket} style={ticketAnimationStyle}>
      
      <div className={style.ticketMeta}>
        Table {table}
      </div>

      <div className={style.ticketNumber}>
        #{id}
      </div>

      <div className={style.ticketStatus} style={{ backgroundColor: color }}>
        {status}
      </div>
      
    </div>
  )
}

export default Tickets
