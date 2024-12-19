<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Afspraak;
use Carbon\Carbon;
use App\Jobs\SendAppointmentNotification;

class SendDailyAppointmentNotifications extends Command
{
    protected $signature = 'appointments:notify';

    protected $description = 'Send notifications for appointments scheduled for today.';

    public function handle()
    {
        $today = Carbon::today()->toDateString();
        $appointments = Afspraak::where('datum', $today)->get();

        foreach ($appointments as $appointment) {
            SendAppointmentNotification::dispatch($appointment);
        }

        $this->info('Notifications have been dispatched for today\'s appointments.');
    }
}
