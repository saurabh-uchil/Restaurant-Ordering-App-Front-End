import { Link } from "react-router-dom";

const QuickAcions = () => {
  return (
    <div>
      <div>
        <Link to={"/dashboard/menu"}> Menu </Link>   
      </div>  
      
      <div>
        <Link to={"/addToMenu"}> AddToMenu </Link> 
      </div>
    </div>
  )
}

export default QuickAcions
