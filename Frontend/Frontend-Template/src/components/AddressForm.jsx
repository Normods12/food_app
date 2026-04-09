import React, { useState } from 'react';

const AddressForm = ({ onSubmit, defaultValues = null, onCancel }) => {
    const [formData, setFormData] = useState({
        street: defaultValues?.street || '',
        city: defaultValues?.city || '',
        state: defaultValues?.state || '',
        zipCode: defaultValues?.zipCode || '',
        isDefault: defaultValues?.isDefault || false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-3 border rounded mb-3 bg-white">
            <div className="mb-3">
                <label className="input-label">Street Address</label>
                <input
                    type="text"
                    name="street"
                    className="form-control"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    placeholder="123 Main St, Apt 4B"
                />
            </div>

            <div className="row mb-3">
                <div className="col-md-5">
                    <label className="input-label">City</label>
                    <input
                        type="text"
                        name="city"
                        className="form-control"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-4">
                    <label className="input-label">State</label>
                    <input
                        type="text"
                        name="state"
                        className="form-control"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-3">
                    <label className="input-label">ZIP Code</label>
                    <input
                        type="text"
                        name="zipCode"
                        className="form-control"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="mb-4 form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="isDefault"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="isDefault">Set as default address</label>
            </div>

            <div className="d-flex justify-content-end gap-2">
                {onCancel && (
                    <button type="button" className="btn btn-outline" onClick={onCancel}>
                        Cancel
                    </button>
                )}
                <button type="submit" className="btn btn-primary">
                    Save Address
                </button>
            </div>
        </form>
    );
};

export default AddressForm;
