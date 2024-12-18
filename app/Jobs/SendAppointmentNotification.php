<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Afspraak;
use App\Services\TwilioService;

class SendAppointmentNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $appointment;

    /**
     * Create a new job instance.
     *
     * @param \App\Models\Afspraak $appointment
     */
    public function __construct(Afspraak $appointment)
    {
        $this->appointment = $appointment;
    }

    /**
     * Execute the job.
     */
    public function handle(TwilioService $twilio)
    {
        $user = $this->appointment->user;

        // Send SMS
        $twilio->sendSms(
            $user->gsm_nummer,
            "Herinnering: Uw afspraak is op {$this->appointment->datum} om {$this->appointment->tijd} voor de behandeling: {$this->appointment->behandeling}."
        );

        // You can also send an email if required.
        // Mail::to($user->email)->send(new AppointmentReminderMail($user, $this->appointment));
    }
}
