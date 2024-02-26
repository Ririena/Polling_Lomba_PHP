<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Vote;

class Poll extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'deadline',
        'created_by',
        'division_id',
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $casts = [
        'deadline' => 'datetime',
    ];

    public function isDeadline()
    {
        return now() > $this->deadline;
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class);
    }

    public function choices(): HasMany
    {
        return $this->hasMany(Choice::class);
    }

    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }

    public function hasUserVoted($user_id)
    {
        $qVote = Vote::where('user_id', $user_id)->where('poll_id', $this->id);
        return $qVote->count()>0;
    }
}
