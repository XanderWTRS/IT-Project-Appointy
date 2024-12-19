// src/components/AppointmentCalendar.jsx

import React, { useState, useRef } from "react";
import { usePage ,Head} from "@inertiajs/react";
import ConfirmationModal from "/resources/js/Components/ConfirmationModal"; // Ensure this path is correct
import Header from '/resources/js/Components/Header';
import Footer from '/resources/js/Components/Footer';
const slots = {
    tuesday: ["10:00-10:30", "10:30-11:00", "15:00-15:30", "15:30-16:00"],
    thursday: ["10:00-10:30", "10:30-11:00", "15:00-15:30", "15:30-16:00"],
};

const generateCalendar = (month, year) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const dates = [];
    const blanksBefore = firstDay.getDay();

    for (let i = 0; i < blanksBefore; i++) {
        dates.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
        dates.push(new Date(year, month, i));
    }

    return dates;
};

// Helper function to format date as 'YYYY-MM-DD' without timezone shifts
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function AppointmentCalendar({ csrf_token, appointments }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState("");
    const [treatment, setTreatment] = useState("");
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [appointmentData, setAppointmentData] = useState(null); // Appointment details for modal

    const formRef = useRef(null); // Reference to the form

    const currentDate = new Date();
    const calendarDates = generateCalendar(month, year);

    // Define the first day of the current month
    const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Define the first day of the maximum allowed month (6 months ahead)
    const maxMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() + 6, 1);

    // Helper function to check if a date is in the past
    const isPastDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
        return date < today;
    };

    const canNavigateTo = (newMonth, newYear) => {
        const newMonthStart = new Date(newYear, newMonth, 1);
        return newMonthStart >= currentMonthStart && newMonthStart <= maxMonthStart;
    };

    const handleTreatmentChange = (event) => {
        setTreatment(event.target.value);
        setSelectedDate(null);
        setSelectedSlot("");
    };

    const getAvailableSlots = (date) => {
        if (!treatment || !date) return [];

        const day = date.getDay();
        // Determine slots based on treatment and day
        if ((treatment === "tandheelkunde" || treatment === "orthodontie") && day === 2) {
            return slots.tuesday;
        }
        if ((treatment === "endodontie" || treatment === "paradontologie") && day === 4) {
            return slots.thursday;
        }
        return [];
    };

    const isSlotTaken = (date, slot) => {
        if (!appointments) return false;
        const dateStr = formatDate(date);
        return appointments[dateStr]?.includes(slot);
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setSelectedSlot("");
    };

    const changeMonth = (offset) => {
        let newMonth = month + offset;
        let newYear = year;

        if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }

        if (canNavigateTo(newMonth, newYear)) {
            setMonth(newMonth);
            setYear(newYear);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        if (!selectedDate || !selectedSlot || !treatment) {
            alert("Please select a date, time slot, and treatment.");
            return;
        }

        // Prepare appointment data
        const appointment = {
            date: formatDate(selectedDate),
            time: selectedSlot,
            treatment: treatment.charAt(0).toUpperCase() + treatment.slice(1), // Capitalize first letter
        };

        // Set the appointment data and open the modal
        setAppointmentData(appointment);
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        setIsModalOpen(false);
        // Submit the form programmatically
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-white text-gray-900">
            <Head title="afspraak"/>
            <Header />
            <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg my-40">
                <h1 className="text-3xl font-bold mb-6">Afspraak vastleggen</h1>
                <form
                    action={route("afspraak.store")}
                    method="post"
                    ref={formRef}
                    onSubmit={handleSubmit} // Attach the submit handler
                >
                    <input type="hidden" name="_token" value={csrf_token} />
                    <input type="hidden" name="treatment" value={treatment} />
                    <input
                        type="hidden"
                        name="date"
                        value={selectedDate ? formatDate(selectedDate) : ""}
                    />
                    <input type="hidden" name="time" value={selectedSlot} />

                    {/* Treatment Selection */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-2">Kies behandeling</label>
                        <select
                            className="w-full border border-gray-300 rounded-lg p-3"
                            value={treatment}
                            onChange={handleTreatmentChange}
                            required
                        >
                            <option value="">-- Selecteer een behandeling --</option>
                            <option value="tandheelkunde">Tandheelkunde</option>
                            <option value="orthodontie">Orthodontie</option>
                            <option value="endodontie">Endodontie</option>
                            <option value="paradontologie">Paradontologie</option>
                        </select>
                    </div>

                    {/* Calendar */}
                    {treatment && (
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                                    onClick={() => changeMonth(-1)}
                                    disabled={!canNavigateTo(month - 1, year)}
                                >
                                    Vorige
                                </button>
                                <h2 className="text-lg font-semibold">
                                    {new Date(year, month).toLocaleString("nl-NL", {
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </h2>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                                    onClick={() => changeMonth(1)}
                                    disabled={!canNavigateTo(month + 1, year)}
                                >
                                    Volgende
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-2 mb-2">
                                {["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"].map((day, index) => (
                                    <div key={index} className="text-center font-semibold text-gray-700">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                {calendarDates.map((date, index) =>
                                    date ? (
                                        <button
                                            type="button"
                                            key={index}
                                            className={`p-2 rounded-lg text-center ${
                                                selectedDate?.toDateString() === date.toDateString()
                                                    ? "bg-blue-500 text-white"
                                                    : isPastDate(date)
                                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                        : "bg-gray-100 hover:bg-gray-200"
                                            } ${getAvailableSlots(date).length > 0 ? "" : "cursor-not-allowed opacity-50"}`}
                                            onClick={() =>
                                                !isPastDate(date) && getAvailableSlots(date).length > 0 && handleDateClick(date)
                                            }
                                            disabled={isPastDate(date) || getAvailableSlots(date).length === 0}
                                        >
                                            {date.getDate()}
                                        </button>
                                    ) : (
                                        <div key={index} className="p-2"></div>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    {/* Time Slot Selection */}
                    {selectedDate && (
                        <div className="mb-6">
                            <label className="block text-lg font-semibold mb-2">Tijdslot</label>
                            <div className="grid grid-cols-2 gap-4">
                                {getAvailableSlots(selectedDate).map((slot) => {
                                    const taken = isSlotTaken(selectedDate, slot);
                                    return (
                                        <button
                                            type="button"
                                            key={slot}
                                            onClick={() => !taken && setSelectedSlot(slot)}
                                            disabled={taken}
                                            className={`p-3 rounded-lg ${
                                                taken
                                                    ? "bg-red-500 text-white cursor-not-allowed"
                                                    : selectedSlot === slot
                                                        ? "bg-green-500 text-white"
                                                        : "bg-gray-200 hover:bg-gray-300"
                                            }`}
                                        >
                                            {slot}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className={`w-full py-3 rounded-lg transition ${
                                !selectedDate || !selectedSlot || !treatment
                                    ? "bg-blue-500 opacity-50 text-white cursor-not-allowed"
                                    : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                            disabled={!selectedDate || !selectedSlot || !treatment}
                        >
                            Leg afspraak vast
                        </button>
                    </div>
                </form>

                {/* Confirmation Modal */}
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={handleCancel}
                    onConfirm={handleConfirm}
                    appointment={appointmentData}
                />

            </div>
            <Footer />
        </div>
    );
}
