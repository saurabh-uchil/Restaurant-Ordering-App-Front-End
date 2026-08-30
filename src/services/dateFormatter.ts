 export const getDate = () =>{
    const date = new Date();
      const today = date.toLocaleDateString("en-AU", {
        day: "numeric",    
        month: "long",
        year: "numeric"
      });
      
      const day = date.toLocaleDateString("en-AU", {
        weekday: "long"
      });

      const dateString = day+", "+today;
      
      return dateString;
  }
