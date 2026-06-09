import React, { useState } from 'react';

const emptyWindow = () => ({
    date: '',
    startTime: '',
    endTime: '',
});

export const createDefaultScheduling = () => ({
    event: emptyWindow(),
    deliveryWindows: [emptyWindow()],
    pickupWindows: [emptyWindow()],
});

const getScheduling = (value) => ({
    event: value?.event || emptyWindow(),
    deliveryWindows: value?.deliveryWindows?.length ? value.deliveryWindows : [emptyWindow()],
    pickupWindows: value?.pickupWindows?.length ? value.pickupWindows : [emptyWindow()],
});

const formatWindow = (window) => {
    if (!window?.date && !window?.startTime && !window?.endTime) return 'Not provided';
    return `${window.date || 'No date'} | ${window.startTime || 'No start time'} - ${window.endTime || 'No end time'}`;
};

export const formatSchedulingForEmail = (schedule) => {
    const nextSchedule = getScheduling(schedule);
    return {
        eventWindow: formatWindow(nextSchedule.event),
        deliveryWindows: nextSchedule.deliveryWindows.map((window, index) => `Delivery window ${index + 1}: ${formatWindow(window)}`),
        pickupWindows: nextSchedule.pickupWindows.map((window, index) => `Pickup window ${index + 1}: ${formatWindow(window)}`),
        summary: [
            `Event: ${formatWindow(nextSchedule.event)}`,
            ...nextSchedule.deliveryWindows.map((window, index) => `Preferred delivery window ${index + 1}: ${formatWindow(window)}`),
            ...nextSchedule.pickupWindows.map((window, index) => `Preferred pickup window ${index + 1}: ${formatWindow(window)}`),
        ].join('\n'),
    };
};

export const validateScheduling = (schedule) => {
    const nextSchedule = getScheduling(schedule);
    const errors = {};

    // Event date/time is required.
    const event = nextSchedule.event;
    if (!event.date) errors.event_date = 'Event date is required';
    if (!event.startTime) errors.event_startTime = 'Event start time is required';
    if (!event.endTime) errors.event_endTime = 'Event end time is required';
    if (event.startTime && event.endTime && event.endTime < event.startTime) {
        errors.event_timeOrder = 'Event end time cannot be earlier than start time';
    }

    // Delivery & pickup windows are optional. Only sanity-check the time order
    // when a user has entered both a start and end time.
    const validateOptionalWindow = (window, prefix, label) => {
        if (window.startTime && window.endTime && window.endTime < window.startTime) {
            errors[`${prefix}_timeOrder`] = `${label} end time cannot be earlier than start time`;
        }
    };

    nextSchedule.deliveryWindows.forEach((window, index) => {
        validateOptionalWindow(window, `delivery_${index}`, `Delivery window ${index + 1}`);
    });
    nextSchedule.pickupWindows.forEach((window, index) => {
        validateOptionalWindow(window, `pickup_${index}`, `Pickup window ${index + 1}`);
    });

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
};

const hasWindowData = (window) => Boolean(window?.date || window?.startTime || window?.endTime);

const RentalDateRange = ({ value, onChange, errors = {}, idPrefix = 'rental-date-range' }) => {
    const schedule = getScheduling(value);

    const hasOptionalData = [...schedule.deliveryWindows, ...schedule.pickupWindows].some(hasWindowData);
    const hasOptionalErrors = Object.keys(errors).some((key) => key.startsWith('delivery_') || key.startsWith('pickup_'));
    const [showOptional, setShowOptional] = useState(hasOptionalData || hasOptionalErrors);

    const updateEvent = (field, nextValue) => {
        onChange({
            ...schedule,
            event: {
                ...schedule.event,
                [field]: nextValue,
            },
        });
    };

    const updateWindow = (type, index, field, nextValue) => {
        const key = type === 'delivery' ? 'deliveryWindows' : 'pickupWindows';
        const nextWindows = schedule[key].map((window, windowIndex) => (
            windowIndex === index ? { ...window, [field]: nextValue } : window
        ));

        onChange({
            ...schedule,
            [key]: nextWindows,
        });
    };

    const addWindow = (type) => {
        const key = type === 'delivery' ? 'deliveryWindows' : 'pickupWindows';
        onChange({
            ...schedule,
            [key]: [...schedule[key], emptyWindow()],
        });
    };

    const removeWindow = (type, index) => {
        const key = type === 'delivery' ? 'deliveryWindows' : 'pickupWindows';
        if (schedule[key].length === 1) return;
        onChange({
            ...schedule,
            [key]: schedule[key].filter((_, windowIndex) => windowIndex !== index),
        });
    };

    const renderField = ({ id, label, type, value: fieldValue, onFieldChange, error, required = true }) => (
        <label className="rental-schedule__field" htmlFor={id}>
            <span>{label}</span>
            <input
                id={id}
                type={type}
                value={fieldValue}
                onChange={(event) => onFieldChange(event.target.value)}
                required={required}
            />
            {error && <em>{error}</em>}
        </label>
    );

    const renderWindow = (type, window, index) => {
        const label = type === 'delivery' ? 'Delivery' : 'Pickup';
        const prefix = `${type}_${index}`;

        return (
            <div className="rental-schedule__window-card" key={`${type}-${index}`}>
                <div className="rental-schedule__window-title">
                    <strong>Preferred {label.toLowerCase()} window {index + 1}</strong>
                    {schedule[type === 'delivery' ? 'deliveryWindows' : 'pickupWindows'].length > 1 && (
                        <button type="button" onClick={() => removeWindow(type, index)}>
                            Remove
                        </button>
                    )}
                </div>
                <div className="rental-schedule__field-grid">
                    {renderField({
                        id: `${idPrefix}-${type}-${index}-date`,
                        label: `${label} Date`,
                        type: 'date',
                        value: window.date,
                        onFieldChange: (nextValue) => updateWindow(type, index, 'date', nextValue),
                        error: errors[`${prefix}_date`],
                        required: false,
                    })}
                    {renderField({
                        id: `${idPrefix}-${type}-${index}-start`,
                        label: `${label} Start Time`,
                        type: 'time',
                        value: window.startTime,
                        onFieldChange: (nextValue) => updateWindow(type, index, 'startTime', nextValue),
                        error: errors[`${prefix}_startTime`],
                        required: false,
                    })}
                    {renderField({
                        id: `${idPrefix}-${type}-${index}-end`,
                        label: `${label} End Time`,
                        type: 'time',
                        value: window.endTime,
                        onFieldChange: (nextValue) => updateWindow(type, index, 'endTime', nextValue),
                        error: errors[`${prefix}_endTime`],
                        required: false,
                    })}
                </div>
                {errors[`${prefix}_timeOrder`] && (
                    <p className="error-text rental-schedule__window-error">{errors[`${prefix}_timeOrder`]}</p>
                )}
            </div>
        );
    };

    return (
        <div className="rental-schedule">
            <div className="rental-schedule__header">
                <span className="rental-schedule__eyebrow">Event date *</span>
                <h4>When is your event?</h4>
                <p>This helps us check availability and plan logistics. Times can be approximate and confirmed with our team.</p>
            </div>

            <div className="rental-schedule__section rental-schedule__section--event">
                <div className="rental-schedule__section-title">
                    <h5>Event Date</h5>
                </div>
                <div className="rental-schedule__window-card">
                    <div className="rental-schedule__field-grid">
                        {renderField({
                            id: `${idPrefix}-event-date`,
                            label: 'Event Date',
                            type: 'date',
                            value: schedule.event.date,
                            onFieldChange: (nextValue) => updateEvent('date', nextValue),
                            error: errors.event_date,
                        })}
                        {renderField({
                            id: `${idPrefix}-event-start`,
                            label: 'Event Start Time',
                            type: 'time',
                            value: schedule.event.startTime,
                            onFieldChange: (nextValue) => updateEvent('startTime', nextValue),
                            error: errors.event_startTime,
                        })}
                        {renderField({
                            id: `${idPrefix}-event-end`,
                            label: 'Event End Time',
                            type: 'time',
                            value: schedule.event.endTime,
                            onFieldChange: (nextValue) => updateEvent('endTime', nextValue),
                            error: errors.event_endTime,
                        })}
                    </div>
                    {errors.event_timeOrder && (
                        <p className="error-text rental-schedule__window-error">{errors.event_timeOrder}</p>
                    )}
                </div>
            </div>

            <div className="rental-schedule__optional">
                <button
                    type="button"
                    className={`rental-schedule__toggle${showOptional ? ' is-open' : ''}`}
                    onClick={() => setShowOptional((prev) => !prev)}
                    aria-expanded={showOptional}
                    aria-controls={`${idPrefix}-optional-panel`}
                >
                    <span className="rental-schedule__toggle-text">Select Preferred Delivery/Pickup Time (Optional)</span>
                    <span className="rental-schedule__toggle-arrow" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </span>
                </button>
                <p className="rental-schedule__toggle-note">
                    <em>Need delivery or pickup at a specific time? Let us know here. Exact delivery and pickup windows require dedicated scheduling and are subject to an additional fee.</em>
                </p>

                {showOptional && (
                    <div className="rental-schedule__collapsible" id={`${idPrefix}-optional-panel`}>
                        <div className="rental-schedule__section">
                            <div className="rental-schedule__section-title">
                                <h5>Delivery</h5>
                                <button type="button" onClick={() => addWindow('delivery')}>Add another delivery window</button>
                            </div>
                            {schedule.deliveryWindows.map((window, index) => renderWindow('delivery', window, index))}
                        </div>

                        <div className="rental-schedule__section">
                            <div className="rental-schedule__section-title">
                                <h5>Pickup</h5>
                                <button type="button" onClick={() => addWindow('pickup')}>Add another pickup window</button>
                            </div>
                            {schedule.pickupWindows.map((window, index) => renderWindow('pickup', window, index))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RentalDateRange;
