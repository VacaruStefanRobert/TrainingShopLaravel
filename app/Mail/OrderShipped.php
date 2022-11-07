<?php

namespace App\Mail;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Session;
use JetBrains\PhpStorm\Pure;

class OrderShipped extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @var Builder[]|Collection
     */
    public array|Collection $products;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
        $this->products = Product::query()->whereIn('id', Session::get('cart'))->get();
    }

    /**
     * Get the message envelope.
     *
     * @return Envelope
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('trainingShop@example.com', 'Robert'),
            subject: 'Order Shipped',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return Content
     */
    #[Pure] public function content(): Content
    {
        return new Content(
            html: 'orderMail',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
