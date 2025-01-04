import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";
import AdminLayout from "../../Layouts/AdminLayout";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Dashboard({ charts }) {
    const [activeTab, setActiveTab] = useState("overview");

    // Donut data for fines in Overview
    const fineDonutData = {
        labels: ["Betaalde Boetes", "Onbetaalde Boetes"],
        datasets: [
            {
                data: [charts.fineDonutData.paid, charts.fineDonutData.unpaid],
                backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
                borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
            },
        ],
    };

    // Donut data for revenue
    const revenueDonutData = {
        labels: ["Voorschotten", "Boetes"],
        datasets: [
            {
                data: [charts.donutData.advancePayments, charts.donutData.fines],
                backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
                borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
            },
        ],
    };

    // Bar chart data for Appointments and Fines
    const barChartAppointmentsData = {
        labels: charts.appointmentsByMonth.map((item) => `Maand ${item.month}`),
        datasets: [
            {
                label: "Afspraken",
                data: charts.appointmentsByMonth.map((item) => item.count),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const barChartFinesData = {
        labels: charts.finesByMonth.map((item) => `Maand ${item.month}`),
        datasets: [
            {
                label: "Boetes",
                data: charts.finesByMonth.map((item) => item.count),
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
        ],
    };

    // Waitlist charts
    const waitlistChartData = {
        labels: charts.waitlistByMonth.map((item) => `Maand ${item.month}`),
        datasets: [
            {
                label: "Gebruikers in Wachtlijst",
                data: charts.waitlistByMonth.map((item) => item.count),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    const waitlistAvailableChartData = {
        labels: charts.waitlistAvailableByMonth.map((item) => `Maand ${item.month}`),
        datasets: [
            {
                label: "Mensen die afspraak kunnen maken",
                data: charts.waitlistAvailableByMonth.map((item) => item.count),
                backgroundColor: "rgba(153, 102, 255, 0.6)",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
            },
        ],
    };

    return (
        <AdminLayout>
            <Head title="Dashboard" />
            <div className="p-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-8 -mt-4">
                    Admin Dashboard
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
                </h1>

                {/* Tabs */}
                <div className="flex space-x-4 mt-4">
                    <button
                        className={`px-4 py-2 rounded ${
                            activeTab === "overview" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                        onClick={() => setActiveTab("overview")}
                    >
                        Overzicht
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${
                            activeTab === "waitlist" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                        onClick={() => setActiveTab("waitlist")}
                    >
                        Wachtlijst
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${
                            activeTab === "revenue" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                        onClick={() => setActiveTab("revenue")}
                    >
                        Inkomsten
                    </button>
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                    {activeTab === "overview" && (
                        <div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white shadow rounded p-6">
                                    <h2 className="text-lg font-semibold">Totaal Afspraken</h2>
                                    <p className="text-3xl mb-4">{charts.totalAppointments}</p>
                                    <div className="w-full h-96">
                                        <Bar data={barChartAppointmentsData} />
                                    </div>
                                </div>

                                <div className="bg-white shadow rounded p-6">
                                    <h2 className="text-lg font-semibold">Totaal Boetes</h2>
                                    <p className="text-3xl mb-4">{charts.totalFinesCount}</p>
                                    <div className="w-64 h-64 mx-auto mt-6">
                                        <Doughnut data={fineDonutData} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "waitlist" && (
                        <div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white shadow rounded p-6">
                                    <h2 className="text-lg font-semibold">Gebruikers in Wachtlijst</h2>
                                    <p className="text-3xl mb-4">{charts.totalInWaitlist}</p>
                                    <div className="w-full h-96">
                                        <Bar data={waitlistChartData} />
                                    </div>
                                </div>

                                <div className="bg-white shadow rounded p-6">
                                    <h2 className="text-lg font-semibold">Mensen die afspraak kunnen maken</h2>
                                    <p className="text-3xl mb-4">{charts.totalAvailableToSchedule}</p>
                                    <div className="w-full h-96">
                                        <Bar data={waitlistAvailableChartData} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "revenue" && (
                        <div>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Inkomsten Voorschotten */}
                                <div className="bg-white shadow rounded p-4">
                                    <h2 className="text-lg font-semibold">Inkomsten Voorschotten</h2>
                                    <p className="text-3xl">€ {charts.advancePayments}</p>
                                </div>

                                {/* Inkomsten Boetes */}
                                <div className="bg-white shadow rounded p-4">
                                    <h2 className="text-lg font-semibold">Inkomsten Boetes</h2>
                                    <p className="text-3xl">€ {charts.fines}</p>
                                </div>
                            </div>

                            {/* Donut Chart */}
                            <div className="mt-6 bg-white shadow rounded p-6">
                                <h2 className="text-lg font-semibold">Betalingen vs Boetes</h2>
                                <div className="w-64 h-64 mx-auto">
                                    <Doughnut data={revenueDonutData} />
                                </div>
                            </div>

                            {/* Totale Inkomsten */}
                            <div className="mt-4 bg-white shadow rounded p-4">
                                <h2 className="text-lg font-semibold">Totale Inkomsten</h2>
                                <p className="text-3xl">
                                    € {parseFloat(charts.advancePayments) + parseFloat(charts.fines)}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
