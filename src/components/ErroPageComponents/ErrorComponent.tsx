import { ArrowLeft } from "lucide-react";
import { errorPageStyle } from "../../styles/errorPage";
import ErrorPageTickets from "./ErrorPageTicket";
import Navbar from "../LandingPageComponents/Navbar";
import { useNavigate } from "react-router";

export type ErrorPageProps = {
  status: 401 | 404 | 500;
  error: string;
  label: string;
  code: string;
  heading: string;
  description : string
}

export default function ErrorComponent({status, error, label, code, heading, description}:ErrorPageProps) {

  const navigate = useNavigate();

  return (
    <div className={errorPageStyle.page}>

      <Navbar />
      <div className={errorPageStyle.container}>

      <ErrorPageTickets label={label} status={status} error={error}/>

      <p className={errorPageStyle.code}>
        {code}
      </p>

      <h1 className={errorPageStyle.heading}>
        {heading}
      </h1>

      <p className={errorPageStyle.description}>
       {description}
      </p>

      <div className={errorPageStyle.buttonContainer}>
        
        <button className={errorPageStyle.primaryButton} onClick={() => navigate("/")}>
          <ArrowLeft className={errorPageStyle.buttonLogo} />Back to Home
        </button>

      </div>
    </div>
    </div>
  );
}