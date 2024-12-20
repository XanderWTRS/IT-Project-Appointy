<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\wachtlijst;
use App\Services\TwilioService;

use Illuminate\Support\Facades\Mail;


use App\Mail\CanMakeAppointmentMail;




class SendCanMakeAppointmentNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $Waitlist;

    public function __construct(Wachtlijst $Waitlist)
    {
        $this->Waitlist = $Waitlist;
    }

    /**
     * Execute the job.
     */
    public function handle(TwilioService $twilio)
    {
        $user = $this->Waitlist->user;

        if ($user->keuze_gsm) {
            $twilio->sendSms(
                $user->gsm_nummer,
                "Herinnering: U kan een afspraak maken bij appointy."
            );
        }
        if($user->keuze_email){
            Mail::to($user->email)->send(new CanMakeAppointmentMail($user, $this->Waitlist));
        }
    }
}
