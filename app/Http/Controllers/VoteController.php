<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vote;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'choice_id',
            'user_id',
            'poll_id',
            'division_id',
            'created_at',
            'updated_at',
        ]);
    }
    public function getData()
    {
        echo "Hello Vote";
    }
}
