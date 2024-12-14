<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use App\Models\Wachtlijst;

use Illuminate\Http\Request;

class WachtlijstController extends Controller
{
    public function wachtlijst()
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $wachtlijst = Wachtlijst::where('user_id', $user->id)->first();

        if (!$wachtlijst) {
            // User is not in the waiting list
            return inertia('AfspraakPage', [
                'inWachtlijst' => false,
                'csrf_token' => csrf_token(),
            ]);
        }
        Carbon::setLocale('nl');
        $addedAt = Carbon::parse($wachtlijst->added_at);
        $now = Carbon::now();

        // Target date: 3 months after the user was added to the waiting list
        $targetDate = $addedAt->copy()->addMonths(3);

        // Calculate the difference between now and the target date
        $diff = $now->diff($targetDate);

        // Remaining months and days
        $remainingMonths = $diff->m; // Remaining months
        $remainingDays = $diff->d;   // Remaining days

        return inertia('AfspraakPage', [
            'inWachtlijst' => true,
            'wachtlijst' => $wachtlijst,
            'monthsLeft' => $remainingMonths,
            'daysLeft' => $remainingDays,
            'addedAt' => $addedAt->translatedFormat('d F Y'),
            'targetDate' => $targetDate->translatedFormat('d F Y'),
            'csrf_token' => csrf_token(),
        ]);
    }
    public function cancel()
    {
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('afspraken')->with('error', 'Unauthorized access.');
        }

        Wachtlijst::where('user_id', $user->id)->delete();


        $user->update(['betaald' => false]);

        return redirect()->route('afspraken')->with('success', 'Uw afspraak is succesvol geannuleerd.');
    }

    public function make()
    {
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('afspraken')->with('error', 'Unauthorized access.');
        }

        return redirect()->route('afspraken')->with('success', 'Uw afspraak is succesvol vastgelegd.');
    }
}
