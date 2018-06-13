<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Image
 *
 * @property int $id
 * @property int $user_id
 * @property string $path
 * @property string|null $title
 * @property mixed $table
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Image whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Image whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Image wherePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Image whereTable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Image whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Image whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Image whereUserId($value)
 * @mixin \Eloquent
 */
class Image extends Model
{
    protected $casts =['table'=>"array"];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
