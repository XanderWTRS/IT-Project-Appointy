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
            return response()->json(['error' => 'No data found'], 404);
        }

        $addedAt = Carbon::parse($wachtlijst->added_at);
        $now = Carbon::now();

        // Get the total difference in months
        $totalMonths = $addedAt->diffInMonths($now);

        // Calculate exact months and remaining days
        $monthsPassed = $addedAt->diff($now)->m; // Whole months
        $daysPassed = $addedAt->diff($now)->d;   // Remaining days

        return inertia('AfspraakPage', [
            'wachtlijst' => $wachtlijst,
            'monthsPassed' => $monthsPassed,
            'daysPassed' => $daysPassed,
        ]);
    }
}
