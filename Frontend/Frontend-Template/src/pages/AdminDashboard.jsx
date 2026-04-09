import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Button } from 'react-bootstrap';
import apiClient from '../apiClient';
import LoadingSpinner from '../components/LoadingSpinner';
import OrderStatusBadge from '../components/OrderStatusBadge';
import toast from 'react-hot-toast';
import { menuService } from '../services/menuService';
import { StoreContext } from '../context/StoreContext';
import { useContext } from 'react';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categories } = useContext(StoreContext);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', imageUrl: '', categoryId: '', available: true });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get('/orders/admin/all');
      setOrders(response.data.sort((a, b) => b.id - a.id));
    } catch (err) {
      toast.error("Failed to load generic orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await apiClient.put(`/orders/admin/${orderId}/status?status=${newStatus}`);
      toast.success("Order status updated!");
      fetchOrders();
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.categoryId) {
      toast.error("Please select a category");
      return;
    }
    setIsAdding(true);
    try {
      await menuService.create({
        name: newItem.name,
        description: newItem.description,
        price: parseFloat(newItem.price),
        imageUrl: newItem.imageUrl,
        categoryId: parseInt(newItem.categoryId),
        available: newItem.available
      });
      toast.success("Food item added!");
      setNewItem({ name: '', description: '', price: '', imageUrl: '', categoryId: '', available: true });
    } catch (err) {
      toast.error("Failed to add food item");
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', padding: '40px 0', backgroundColor: 'var(--bg-main)' }}>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ fontWeight: '800' }}>Admin <span className="text-danger">Dashboard</span></h2>
          <Button variant="outline-primary" onClick={fetchOrders}>Refresh Orders</Button>
        </div>

        <div className="tomato-card p-4 mb-5">
          <h4 className="mb-4 text-muted">Add New Food Item</h4>
          <form onSubmit={handleAddItem}>
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <input type="text" className="form-control" placeholder="Item Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} required />
              </div>
              <div className="col-md-4">
                <input type="number" step="0.01" className="form-control" placeholder="Price ($)" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} required />
              </div>
              <div className="col-md-4">
                <select className="form-select" value={newItem.categoryId} onChange={e => setNewItem({ ...newItem, categoryId: e.target.value })} required>
                  <option value="">Select Category...</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Description" value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} required />
              </div>
              <div className="col-md-6">
                <input type="url" className="form-control" placeholder="Image URL (e.g. Unsplash link)" value={newItem.imageUrl} onChange={e => setNewItem({ ...newItem, imageUrl: e.target.value })} required />
              </div>
            </div>
            <Button variant="primary" type="submit" disabled={isAdding}>
              {isAdding ? 'Adding...' : 'Add Food Item'}
            </Button>
          </form>
        </div>

        <div className="tomato-card p-4">
          <h4 className="mb-4 text-muted">Manage Recent Orders</h4>
          <Table responsive hover className="align-middle">
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Items</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td><strong>#{order.id}</strong></td>
                  <td>{order.user.email}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td><OrderStatusBadge status={order.status} /></td>
                  <td>{order.items.length} items</td>
                  <td style={{ fontWeight: '700' }}>${order.totalAmount.toFixed(2)}</td>
                  <td>
                    <select
                      className="form-select form-select-sm w-auto"
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="PREPARING">Preparing</option>
                      <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default AdminDashboard;