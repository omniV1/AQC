import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface RegisterClientProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const RegisterClient: React.FC<RegisterClientProps> = ({ onSuccess, onCancel }) => {
    const { registerClient, error, clearError, user } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dueDate: '',
        birthDate: '',
        birthType: '',
        feedingStyle: '',
        birthLocation: '',
        supportSystem: '',
        concerns: '',
        goals: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        if (!user?.id) {
            return;
        }

        try {
            // Format dates to YYYY-MM-DD
            const formattedData = {
                ...formData,
                dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString().split('T')[0] : undefined,
                birthDate: formData.birthDate ? new Date(formData.birthDate).toISOString().split('T')[0] : undefined,
                providerId: parseInt(user.id, 10)
            };

            await registerClient(formattedData);
            onSuccess?.();
        } catch (err) {
            // Error is handled by the auth context
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-serif text-brown-dark mb-4">Register New Client</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-brown mb-1">
                            First Name *
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-2 border border-sage rounded"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-brown mb-1">
                            Last Name *
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full p-2 border border-sage rounded"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-brown mb-1">
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-sage rounded"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-brown mb-1">
                            Password *
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border border-sage rounded"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-brown mb-1">
                            Due Date
                        </label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="w-full p-2 border border-sage rounded"
                        />
                    </div>

                    <div>
                        <label htmlFor="birthDate" className="block text-sm font-medium text-brown mb-1">
                            Birth Date
                        </label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            className="w-full p-2 border border-sage rounded"
                        />
                    </div>

                    <div>
                        <label htmlFor="birthType" className="block text-sm font-medium text-brown mb-1">
                            Birth Type
                        </label>
                        <select
                            id="birthType"
                            name="birthType"
                            value={formData.birthType}
                            onChange={handleChange}
                            className="w-full p-2 border border-sage rounded"
                        >
                            <option value="">Select birth type...</option>
                            <option value="VAGINAL">Vaginal</option>
                            <option value="C_SECTION">C-Section</option>
                            <option value="VBAC">VBAC</option>
                            <option value="UNMEDICATED">Unmedicated</option>
                            <option value="MEDICATED">Medicated</option>
                            <option value="HOME_BIRTH">Home Birth</option>
                            <option value="BIRTH_CENTER">Birth Center</option>
                            <option value="HOSPITAL">Hospital</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="feedingStyle" className="block text-sm font-medium text-brown mb-1">
                            Feeding Style
                        </label>
                        <select
                            id="feedingStyle"
                            name="feedingStyle"
                            value={formData.feedingStyle}
                            onChange={handleChange}
                            className="w-full p-2 border border-sage rounded"
                        >
                            <option value="">Select feeding style...</option>
                            <option value="BREASTFEEDING">Breastfeeding</option>
                            <option value="FORMULA">Formula</option>
                            <option value="MIXED">Mixed</option>
                            <option value="PUMPING">Pumping</option>
                            <option value="SNS">Supplemental Nursing System</option>
                            <option value="TUBE_FEEDING">Tube Feeding</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="birthLocation" className="block text-sm font-medium text-brown mb-1">
                        Birth Location
                    </label>
                    <input
                        type="text"
                        id="birthLocation"
                        name="birthLocation"
                        value={formData.birthLocation}
                        onChange={handleChange}
                        className="w-full p-2 border border-sage rounded"
                    />
                </div>

                <div>
                    <label htmlFor="supportSystem" className="block text-sm font-medium text-brown mb-1">
                        Support System
                    </label>
                    <textarea
                        id="supportSystem"
                        name="supportSystem"
                        value={formData.supportSystem}
                        onChange={handleChange}
                        className="w-full p-2 border border-sage rounded"
                        rows={3}
                    />
                </div>

                <div>
                    <label htmlFor="concerns" className="block text-sm font-medium text-brown mb-1">
                        Concerns
                    </label>
                    <textarea
                        id="concerns"
                        name="concerns"
                        value={formData.concerns}
                        onChange={handleChange}
                        className="w-full p-2 border border-sage rounded"
                        rows={3}
                    />
                </div>

                <div>
                    <label htmlFor="goals" className="block text-sm font-medium text-brown mb-1">
                        Goals
                    </label>
                    <textarea
                        id="goals"
                        name="goals"
                        value={formData.goals}
                        onChange={handleChange}
                        className="w-full p-2 border border-sage rounded"
                        rows={3}
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-forest-green border border-forest-green rounded hover:bg-forest-green/10"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-forest-green text-white rounded hover:bg-forest-green/90"
                    >
                        Register Client
                    </button>
                </div>
            </form>
        </div>
    );
}; 