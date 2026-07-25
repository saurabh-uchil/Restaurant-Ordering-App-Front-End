/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const Test = () => {
  const [text, setText] = useState('');
  const [hideSuggestions, setHideSuggestions] = useState(true);

  //const data = ['India', 'Australia', 'Indonesia', 'America'];
  
  const {data: usersData, isFetching, error} = useQuery({
    queryKey:['users'],
    queryFn: async()=>{
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      return response.data;
    }
  });
  
  console.log(usersData);
  //const suggestions = text ? data.filter((country)=> country.toLowerCase().includes(text.trim().toLowerCase())) : [];
  
  const suggestions = text && usersData ? usersData?.filter((user)=> user.name.toLowerCase().includes(text.trim().toLowerCase())) : [];
  

  const inputClass = "block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200";
  const suggestionsClass = "w-100bg-gray-200 border border-black-200 text-slate-600 rounded mt-2 mb-2 p-2 bg-gray";
 
  const suggestionsDiv = suggestions?.map((s)=>{
    return (
      <div className={suggestionsClass} onClick={()=>{setText(s.name); setHideSuggestions(true)}}key={s.id}>{s.name}</div>
    )
  })
    console.log(text);
    console.log(suggestions);
  
  return (
    <div className="w-100 m-4">
      <input className={inputClass} onChange={(e)=>{setText(e.target.value); setHideSuggestions(false)}} value={text}/>
      {suggestions?.length > 0 && !hideSuggestions && suggestionsDiv}
    </div>
  )
}

export default Test
