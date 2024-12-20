<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CanMakeAppointmentMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    public function __construct($user, $waitlist)
    {
        $this->user = $user;
    }

    public function build()
    {
        return $this->subject('Afspraak Bevestiging')
            ->view('emails.Can_Make_Appointment')
            ->with([
                'user' => $this->user,
            ]);
    }
}
