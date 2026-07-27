import { errorTickets } from "../../styles/errorPage";

type ErrorPageTicketsProps = {
    status: 401 | 404 ;
    error: string;
    label: string
}

const ErrorPageTicket = ({label, status, error}:ErrorPageTicketsProps) => {

  return (
    <div className={errorTickets.container}>
        <div className={errorTickets.label}>
          {label}
        </div>

        <div className={errorTickets.status}>
          #{status}
        </div>

        <div className={errorTickets.error}>
          {error}
        </div>
    </div>
 
  )
}

export default ErrorPageTicket;