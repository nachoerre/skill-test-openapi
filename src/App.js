import "./App.css";
import { useContext, useState } from "react";
import LeadsList from "./components/LeadsList";
import Login from "./components/Login";
import { AuthContext } from "./store/AuthContext";
import BusinessList from "./components/BusinessList";
import Header from "./components/Header";

function App() {
  const { token } = useContext(AuthContext);
  const [activeComponent, setActiveComponent] = useState("leads");

  const handleSelectLeads = () => {
    setActiveComponent("leads");
  };

  const handleSelectBusiness = () => {
    setActiveComponent("business");
  };
  return (
    <div className="App">
      {!token ? (
        <Login />
      ) : (
        <>
          <Header
            onSelectLeads={handleSelectLeads}
            onSelectBusiness={handleSelectBusiness}
          />
          {activeComponent === "leads" ? <LeadsList /> : <BusinessList />}
        </>
      )}
    </div>
  );
}

export default App;
