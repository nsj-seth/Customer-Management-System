import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCustomers } from "../services/customerService";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const searchTerm = search.toLowerCase();

    const fullName =
      `${customer.first_name} ${customer.last_name}`.toLowerCase();

    return (
      fullName.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm) ||
      customer.phone_number.includes(searchTerm)
    );
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Customers</h1>
          <p>Manage your customer information</p>
        </div>

        <Link to="/customers/new" className="primary-button">
          + Add Customer
        </Link>
      </div>

      <div className="content-card">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {loading ? (
          <p className="status-message">Loading customers...</p>
        ) : filteredCustomers.length === 0 ? (
          <p className="status-message">
            {search
              ? "No customers match your search."
              : "No customers found."}
          </p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <strong>
                        {customer.first_name} {customer.last_name}
                      </strong>
                    </td>

                    <td>{customer.email}</td>

                    <td>{customer.phone_number}</td>

                    <td>{customer.address}</td>

                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/customers/${customer.id}`}
                          className="view-button"
                        >
                          View
                        </Link>

                        <Link
                          to={`/customers/${customer.id}/edit`}
                          className="edit-button"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerList;