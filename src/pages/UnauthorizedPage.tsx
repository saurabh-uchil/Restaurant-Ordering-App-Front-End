import ErrorComponent from "../components/ErroPageComponents/ErrorComponent";
import { UnauthorizedErrorMessage } from "../data/errorMessages";


const UnauthorizedPage = () => {
  
  return (
    <ErrorComponent status={UnauthorizedErrorMessage.status} error={UnauthorizedErrorMessage.error} label={UnauthorizedErrorMessage.label} code={UnauthorizedErrorMessage.code} heading={UnauthorizedErrorMessage.heading} description={UnauthorizedErrorMessage.description}/>
  )
}

export default UnauthorizedPage
;
