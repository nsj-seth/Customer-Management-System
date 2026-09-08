import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomerList from "./pages/CustomerList";
import AddCustomer from "./pages/AddCustomer";
import EditCustomer from "./pages/EditCustomer";
import CustomerDetails from "./pages/CustomerDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/customers/new" element={<AddCustomer />} />
        <Route path="/customers/:id" element={<CustomerDetails />} />
        <Route path="/customers/:id/edit" element={<EditCustomer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;