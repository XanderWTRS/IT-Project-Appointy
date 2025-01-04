<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Afspraak;
use App\Models\Wachtlijst;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        // Totaal afspraken
        $totalAppointments = Afspraak::count();

        // Wachtlijstgegevens
        $totalInWaitlist = Wachtlijst::count();
        $waitlistByMonth = Wachtlijst::selectRaw('MONTH(added_at) as month, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->toArray();
        $waitlistAvailableByMonth = Wachtlijst::selectRaw('MONTH(can_make_appointment_at) as month, COUNT(*) as count')
            ->whereNotNull('can_make_appointment_at')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->toArray();
        $totalAvailableToSchedule = Wachtlijst::whereNotNull('can_make_appointment_at')->count();

        // Afspraken per maand
        $appointmentsByMonth = Afspraak::selectRaw('MONTH(datum) as month, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->toArray();

        // Voorschotten
        $advancePayments = Transaction::where('status', 'completed')
            ->where('behandeling', '!=', null)
            ->sum('amount') / 100;

        // Betaalde boetes (Stripe)
        $paidFinesAmount = Transaction::where('status', 'completed')
            ->where('behandeling', '=', null)
            ->sum('amount') / 100;
        $paidFinesCount = Transaction::where('status', 'completed')
            ->where('behandeling', '=', null)
            ->count();

        // Onbetaalde boetes (actieve gebruikers met boete)
        $unpaidFinesCount = User::where('boete', true)->count();

        // Totale boetes (betaald + onbetaald)
        $totalFinesCount = $paidFinesCount + $unpaidFinesCount;

        // Boetes per maand (Stripe-transacties)
        $finesByMonth = Transaction::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->where('behandeling', '=', null)
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->toArray();

        // Donut data voor boetes
        $fineDonutData = [
            'paid' => $paidFinesCount,
            'unpaid' => $unpaidFinesCount,
        ];

        // Donut data voor betalingen
        $paymentDonutData = [
            'advancePayments' => $advancePayments,
            'fines' => $paidFinesAmount,
        ];

        return inertia('Admin/Dashboard', [
            'charts' => [
                'totalAppointments' => $totalAppointments,
                'appointmentsByMonth' => $appointmentsByMonth,
                'totalInWaitlist' => $totalInWaitlist,
                'waitlistByMonth' => $waitlistByMonth,
                'totalAvailableToSchedule' => $totalAvailableToSchedule,
                'waitlistAvailableByMonth' => $waitlistAvailableByMonth,
                'finesByMonth' => $finesByMonth,
                'advancePayments' => number_format($advancePayments, 2),
                'fines' => number_format($paidFinesAmount, 2),
                'totalFinesCount' => $totalFinesCount,
                'fineDonutData' => $fineDonutData,
                'donutData' => $paymentDonutData,
            ],
        ]);
    }
}
