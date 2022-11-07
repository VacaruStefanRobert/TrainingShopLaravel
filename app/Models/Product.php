<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Class Product
 * @package App\Models
 */
class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'price',
        'image'
    ];

    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'order_products');
    }
}
