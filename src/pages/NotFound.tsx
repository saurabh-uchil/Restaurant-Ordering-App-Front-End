import ErrorComponent from "../components/ErroPageComponents/ErrorComponent";
import { NotFoundErrorMessage } from "../data/validationMessages";

const NotFound = () => {
  return (
    <ErrorComponent status={NotFoundErrorMessage.status} error={NotFoundErrorMessage.error} label={NotFoundErrorMessage.label} code={NotFoundErrorMessage.code} heading={NotFoundErrorMessage.heading} description={NotFoundErrorMessage.description}/>
  )
}

export default NotFound