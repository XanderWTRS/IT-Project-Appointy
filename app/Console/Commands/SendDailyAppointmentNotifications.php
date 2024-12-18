<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Afspraak;
use Carbon\Carbon;
use App\Jobs\SendAppointmentNotification;

class SendDailyAppointmentNotifications extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'appointments:notify';

    /**
     * The console command description.
     */
    protected $description = 'Send notifications for appointments scheduled for today.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $today = Carbon::today()->toDateString();

        // Fetch all appointments for today
        $appointments = Afspraak::where('datum', $today)->get();

        foreach ($appointments as $appointment) {
            // Dispatch a job to send notifications
            SendAppointmentNotification::dispatch($appointment);
        }

        $this->info('Notifications have been dispatched for today\'s appointments.');
    }
}
