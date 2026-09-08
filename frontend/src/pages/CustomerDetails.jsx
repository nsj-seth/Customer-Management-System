import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getCustomerById,
  deleteCustomer
} from "../services/customerService";

function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await getCustomerById(id);
        setCustomer(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCustomer(id);
      navigate("/");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Error deleting customer"
      );
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <p className="status-message">
          Loading customer...
        </p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="page-container">
        <div className="content-card">
          <h2>Customer not found</h2>

          <Link to="/" className="back-link">
            Back to Customers
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="page-container details-page">
      <Link to="/" className="back-link">
        ← Back to Customers
      </Link>

      <div className="details-header">
        <div>
          <h1>
            {customer.first_name} {customer.last_name}
          </h1>

          <p>Customer #{customer.id}</p>
        </div>

        <div className="details-actions">
          <Link
            to={`/customers/${customer.id}/edit`}
            className="primary-button"
          >
            Edit Customer
          </Link>

          <button
            onClick={handleDelete}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="details-card">
        <h2>Customer Information</h2>

        <div className="details-grid">
          <div className="detail-item">
            <span>First Name</span>
            <strong>{customer.first_name}</strong>
          </div>

          <div className="detail-item">
            <span>Last Name</span>
            <strong>{customer.last_name}</strong>
          </div>

          <div className="detail-item">
            <span>Email</span>
            <strong>{customer.email}</strong>
          </div>

          <div className="detail-item">
            <span>Phone Number</span>
            <strong>{customer.phone_number}</strong>
          </div>

          <div className="detail-item full-width">
            <span>Address</span>
            <strong>{customer.address}</strong>
          </div>
        </div>
      </div>

      <div className="details-card">
        <h2>Record Information</h2>

        <div className="details-grid">
          <div className="detail-item">
            <span>Date Created</span>
            <strong>
              {formatDate(customer.created_at)}
            </strong>
          </div>

          <div className="detail-item">
            <span>Last Updated</span>
            <strong>
              {formatDate(customer.updated_at)}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;