import FormCard from "./components/FormCard";
import Menu from "./pages/Menu"; 

export default function App() {



  return (
    <div className="App">
     <FormCard title="Add Food Item">
      <Menu />
     </FormCard>
    </div>
  );
}