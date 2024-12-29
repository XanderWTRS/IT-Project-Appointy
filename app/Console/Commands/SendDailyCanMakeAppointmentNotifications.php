<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Wachtlijst;
use Carbon\Carbon;
use App\Jobs\SendCanMakeAppointmentNotification;

class SendDailyCanMakeAppointmentNotifications extends Command
{

    protected $signature = 'CanMakeAppointment:notify';
    protected $description = 'Send notifications for can make appointment for today.';

    public function handle()
    {
        $today = Carbon::today()->toDateString();
        $appointments = Wachtlijst::where('can_make_appointment_at', $today)->get();

        foreach ($appointments as $appointment) {
            SendCanMakeAppointmentNotification::dispatch($appointment);
        }

        $this->info('Notifications have been dispatched for today\'s can make appointment.');
    }
}
