import { Loader2 } from "lucide-react";
import { authStyles as style } from "../../styles/auth";

type ButtonWithLoaderProp = {
    text:string,
    loadingText: string,
    isLoading: boolean 
}

const ButtonWithLoader = ({text, loadingText, isLoading}:ButtonWithLoaderProp) => {
  
  const message = isLoading ? loadingText : text;

  return (
    <button
  type="submit"
  disabled={isLoading}
  className={style.submitButton}
>
 {isLoading && (
    <Loader2 className={style.loader} />
  )}

  {message}
</button>
  )
}

export default ButtonWithLoader
