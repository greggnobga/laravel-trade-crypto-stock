<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class Verify extends Mailable
{
    use Queueable, SerializesModels;

    public $verifyData;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($verifyData)
    {
        $this->verifyData = $verifyData;
    }

    /**
     * Build the message.
     *
     */
    public function build()
    {
        return $this->subject('Mail From React Job Board')
            ->view('emails.verify');
    }
}
