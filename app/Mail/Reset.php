<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Reset extends Mailable
{
    use Queueable, SerializesModels;

    public $resetData;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($resetData)
    {
        $this->resetData = $resetData;
    }

    /**
     * Build the message.
     *
     */
    public function build()
    {
        return $this->subject('Mail From React Job Board')
            ->view('emails.reset');
    }
}
