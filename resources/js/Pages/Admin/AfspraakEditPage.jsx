import React, { useState, useRef } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import ConfirmationModal from "../../Components/ConfirmationModal";
import ConfirmationAnimation from "../../Components/ConfirmationAnimation";
import axios from "axios";
import "/resources/css/bevstig.css";

const slots = {
    tuesday: ["10:00-10:30", "10:30-11:00", "15:00-15:30", "15:30-16:00"],
    thursday: ["10:00-10:30", "10:30-11:00", "15:00-15:30", "15:30-16:00"],
};

const generateCalendar = (month, year) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const dates = [];
    const blanksBefore = (firstDay.getDay() + 6) % 7; // Shift so Monday is the first day

    for (let i = 0; i < blanksBefore; i++) {
        dates.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
        dates.push(new Date(year, month, i));
    }

    return dates;
};

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export default function AfspraakEditPage({ afspraak, csrf_token, appointments }) {
    const [selectedDate, setSelectedDate] = useState(new Date(afspraak.datum));
    const [selectedSlot, setSelectedSlot] = useState(afspraak.tijd);
    const [treatment, setTreatment] = useState(afspraak.behandeling);
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [appointmentData, setAppointmentData] = useState(null);
    const formRef = useRef(null);

    const calendarDates = generateCalendar(month, year);

    const isPastDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const isSelectableDate = (date) => {
        if (!treatment || !date) return false;
        const day = date.getDay();
        return (
            (treatment === "tandheelkunde" || treatment === "orthodontie") && day === 2 ||
            (treatment === "endodontie" || treatment === "paradontologie") && day === 4
        );
    };

    const getAvailableSlots = (date) => {
        if (!treatment || !date) return [];
        const day = date.getDay();
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

    const changeMonth = (offset) => {
        setMonth((prev) => (prev + offset + 12) % 12);
        setYear((prev) => prev + Math.floor((month + offset) / 12));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedDate || !selectedSlot || !treatment) {
            alert("Selecteer een datum, tijdslot en behandeling.");
            return;
        }

        const appointment = {
            date: formatDate(selectedDate),
            time: selectedSlot,
            treatment: treatment.charAt(0).toUpperCase() + treatment.slice(1),
        };

        setAppointmentData(appointment);
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        setIsModalOpen(false);
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    return (
        <AdminLayout>
            <Head title="Afspraak Bewerken" />
            <h1 className="text-3xl font-bold mb-6">Afspraak Bewerken</h1>
            <form
                action={`/admin/afspraken/${afspraak.afspraak_id}/update`}
                method="post"
                ref={formRef}
                onSubmit={handleSubmit}
            >
                <input type="hidden" name="_token" value={csrf_token} />
                <input type="hidden" name="treatment" value={treatment} />
                <input type="hidden" name="date" value={selectedDate ? formatDate(selectedDate) : ""} />
                <input type="hidden" name="time" value={selectedSlot} />

                <div className="mb-6">
                    <label className="block text-lg font-semibold mb-2">Behandeling</label>
                    <select
                        className="w-full border rounded-lg p-3"
                        value={treatment}
                        onChange={(e) => {
                            setTreatment(e.target.value);
                            setSelectedDate(null);
                            setSelectedSlot("");
                        }}
                        required
                    >
                        <option value="">-- Selecteer een behandeling --</option>
                        <option value="tandheelkunde">Tandheelkunde</option>
                        <option value="orthodontie">Orthodontie</option>
                        <option value="endodontie">Endodontie</option>
                        <option value="paradontologie">Paradontologie</option>
                    </select>
                </div>

                {treatment && (
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <button
                                type="button"
                                onClick={() => changeMonth(-1)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
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
                                onClick={() => changeMonth(1)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Volgende
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                            {["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"].map((day, index) => (
                                <div key={index} className="text-center font-semibold">
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                            {calendarDates.map((date, index) =>
                                date ? (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() =>
                                            isSelectableDate(date) && setSelectedDate(date)
                                        }
                                        className={`p-2 rounded-lg ${
                                            selectedDate?.toDateString() === date.toDateString()
                                                ? "bg-blue-700 text-white"
                                                : isSelectableDate(date)
                                                ? "bg-blue-200 text-black hover:bg-blue-300"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        }`}
                                        disabled={!isSelectableDate(date)}
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

                {selectedDate && (
                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-2">Tijdslot</label>
                        <div className="grid grid-cols-2 gap-4">
                            {getAvailableSlots(selectedDate).map((slot) => (
                                <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setSelectedSlot(slot)}
                                    disabled={isSlotTaken(selectedDate, slot)}
                                    className={`p-3 rounded-lg ${
                                        isSlotTaken(selectedDate, slot)
                                            ? "bg-red-500 text-white"
                                            : selectedSlot === slot
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Bewerk Afspraak
                </button>
            </form>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
                appointment={appointmentData}
            />
        </AdminLayout>
    );
}
