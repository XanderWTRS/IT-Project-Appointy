<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AppointmentConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $appointment;

    public function __construct($user, $appointment)
    {
        $this->user = $user;
        $this->appointment = $appointment;
    }

    public function build()
    {
        return $this->subject('Afspraak Bevestiging')
            ->view('emails.afspraak_confirmation')
            ->with([
                'user' => $this->user,
                'appointment' => $this->appointment,
            ]);
    }
}
