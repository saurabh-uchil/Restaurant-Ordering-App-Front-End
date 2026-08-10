import { useParams, useSearchParams } from "react-router";

const CustomerMenuPage = () => {

  const {restaurant} = useParams();
  const [searchParams] = useSearchParams();

  const table = searchParams.get('table');

  return (
    <div>
      <h4>Customer Menu Page</h4>
      <p>Restaurant: {restaurant}</p>
      <p>Table: {table}</p>
    </div>

  )
}

export default CustomerMenuPage