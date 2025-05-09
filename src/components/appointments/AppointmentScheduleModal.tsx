import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Provider, CreateAppointmentRequest, SessionType, AppointmentStatus } from '../../types/api';
import { format, addHours, isBefore, isAfter, parseISO, setHours, setMinutes } from 'date-fns';
import { z } from 'zod';

interface AppointmentScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSchedule: (appointmentData: CreateAppointmentRequest) => Promise<void>;
    providers: Provider[];
    initialStartTime?: Date;
    initialEndTime?: Date;
}

const BUSINESS_HOURS = {
    start: 9, // 9 AM
    end: 17, // 5 PM
};

// Zod schema for form validation
const appointmentFormSchema = z.object({
    providerId: z.number().positive('Please select a provider'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
    location: z.string().min(1, 'Location is required'),
    notes: z.string().optional(),
    sessionType: z.nativeEnum(SessionType)
}).refine(
    (data) => {
        const start = new Date(data.startTime);
        const end = new Date(data.endTime);
        return isAfter(end, start);
    },
    { message: 'End time must be after start time' }
).refine(
    (data) => {
        const start = new Date(data.startTime);
        const end = new Date(data.endTime);
        const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // hours
        return duration >= 0.5 && duration <= 2;
    },
    { message: 'Session duration must be between 30 minutes and 2 hours' }
);

export const AppointmentScheduleModal: React.FC<AppointmentScheduleModalProps> = ({
    isOpen,
    onClose,
    onSchedule,
    providers,
    initialStartTime,
    initialEndTime
}) => {
    const [formData, setFormData] = useState<CreateAppointmentRequest>({
        providerId: providers[0]?.id || 0,
        startTime: initialStartTime ? format(initialStartTime, "yyyy-MM-dd'T'HH:mm") : '',
        endTime: initialEndTime ? format(initialEndTime, "yyyy-MM-dd'T'HH:mm") : '',
        location: 'Virtual Meeting Room',
        notes: '',
        sessionType: SessionType.INITIAL_CONSULTATION
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAfterHours, setIsAfterHours] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (isOpen && providers.length > 0) {
            setFormData(prev => ({
                ...prev,
                providerId: providers[0].id,
                startTime: initialStartTime ? format(initialStartTime, "yyyy-MM-dd'T'HH:mm") : prev.startTime,
                endTime: initialEndTime ? format(initialEndTime, "yyyy-MM-dd'T'HH:mm") : prev.endTime
            }));
        }
    }, [isOpen, providers, initialStartTime, initialEndTime]);

    useEffect(() => {
        // Check if selected time is outside business hours
        if (formData.startTime) {
            const startHour = new Date(formData.startTime).getHours();
            setIsAfterHours(startHour < BUSINESS_HOURS.start || startHour >= BUSINESS_HOURS.end);
        }
    }, [formData.startTime]);

    const validateForm = async (): Promise<boolean> => {
        try {
            await appointmentFormSchema.parseAsync(formData);
            setErrors({});
            return true;
        } catch (err) {
            if (err instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};
                err.errors.forEach((error) => {
                    if (error.path[0]) {
                        newErrors[error.path[0].toString()] = error.message;
                    }
                });
                setErrors(newErrors);
            }
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const isValid = await validateForm();
            if (!isValid) {
                setIsSubmitting(false);
                return;
            }

            if (isAfterHours) {
                const confirmAfterHours = window.confirm(
                    "You're scheduling an after-hours appointment.\n\n" +
                    "Please note:\n" +
                    "• Limited provider availability outside 9 AM - 5 PM\n" +
                    "• Emergency cases should contact emergency services\n" +
                    "• Response times may be longer during after-hours\n\n" +
                    "Would you like to proceed?"
                );
                if (!confirmAfterHours) {
                    setIsSubmitting(false);
                    return;
                }
            }

            await onSchedule(formData);
            onClose();
        } catch (err) {
            setErrors(prev => ({
                ...prev,
                submit: 'Failed to schedule appointment. Please try again.'
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'providerId' ? parseInt(value, 10) : value
        }));
        // Clear error when field is modified
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-cream rounded-lg p-6 max-w-md w-full mx-4">
                <h2 className="text-2xl font-serif text-forest-green mb-6">Schedule Appointment</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {errors.submit && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded text-red-700 text-sm">
                            {errors.submit}
                        </div>
                    )}

                    <div>
                        <label htmlFor="providerId" className="block text-sm font-medium text-brown mb-1">
                            Provider
                        </label>
                        <select
                            id="providerId"
                            name="providerId"
                            value={formData.providerId}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple ${
                                errors.providerId ? 'border-red-300' : 'border-brown/20'
                            }`}
                        >
                            {providers.map(provider => (
                                <option key={provider.id} value={provider.id}>
                                    {provider.firstName} {provider.lastName}
                                </option>
                            ))}
                        </select>
                        {errors.providerId && (
                            <p className="mt-1 text-sm text-red-600">{errors.providerId}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="sessionType" className="block text-sm font-medium text-brown mb-1">
                            Session Type
                        </label>
                        <select
                            id="sessionType"
                            name="sessionType"
                            value={formData.sessionType}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple ${
                                errors.sessionType ? 'border-red-300' : 'border-brown/20'
                            }`}
                        >
                            {Object.values(SessionType).map(type => (
                                <option key={type} value={type}>
                                    {type.replace(/_/g, ' ')}
                                </option>
                            ))}
                        </select>
                        {errors.sessionType && (
                            <p className="mt-1 text-sm text-red-600">{errors.sessionType}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-brown mb-1">
                            Start Time
                        </label>
                        <input
                            type="datetime-local"
                            id="startTime"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple ${
                                errors.startTime ? 'border-red-300' : 'border-brown/20'
                            }`}
                        />
                        {errors.startTime && (
                            <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>
                        )}
                        {isAfterHours && !errors.startTime && (
                            <p className="mt-1 text-sm text-amber-600">
                                Note: This is outside regular business hours (9 AM - 5 PM)
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-brown mb-1">
                            End Time
                        </label>
                        <input
                            type="datetime-local"
                            id="endTime"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple ${
                                errors.endTime ? 'border-red-300' : 'border-brown/20'
                            }`}
                        />
                        {errors.endTime && (
                            <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-brown mb-1">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter location or 'Virtual Meeting Room'"
                            className={`w-full px-3 py-2 border rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple ${
                                errors.location ? 'border-red-300' : 'border-brown/20'
                            }`}
                        />
                        {errors.location && (
                            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-brown mb-1">
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Any additional notes or requirements"
                            rows={3}
                            className={`w-full px-3 py-2 border rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple resize-none ${
                                errors.notes ? 'border-red-300' : 'border-brown/20'
                            }`}
                        />
                        {errors.notes && (
                            <p className="mt-1 text-sm text-red-600">{errors.notes}</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-brown-dark hover:text-brown-dark/80 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-purple hover:bg-purple/80 text-white rounded transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}; 