import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCustomerById,
  updateCustomer
} from "../services/customerService";

function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await getCustomerById(id);

        setFormData({
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          phoneNumber: data.phone_number,
          address: data.address
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCustomer(id, formData);

      navigate(`/customers/${id}`);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Error updating customer"
      );
    }
  };

  if (loading) {
    return <p>Loading customer...</p>;
  }

  return (
  <div className="page-container form-page">
    <div className="form-header">
      <h1>Edit Customer</h1>
      <p>Update the customer's information below.</p>
    </div>

    <div className="form-card">
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>First Name</label>

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Address</label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate(`/customers/${id}`)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
);
}
export default EditCustomer;