type RestaurantInfoProp = {
    userName: string,
    restaurantName: string,
    description: string,
    img?:string
}

const RestaurantInfo = ({userName, restaurantName, description, img}: RestaurantInfoProp) => {

  const imgSrc = img ? img  :  "";
  
  return (
    <div>
      <h5>Welcome back: {userName}</h5>
      <h6>Here is what's happening at: {restaurantName}</h6>
      <p>{description}</p>
      <img src={imgSrc} />
    </div>
  )
}

export default RestaurantInfo
