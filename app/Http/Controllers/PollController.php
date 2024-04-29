<?php

namespace App\Http\Controllers;


use App\Models\Division;
use Illuminate\Http\Request;
use App\Models\Poll;
use App\Models\Choice;
use App\Models\Vote;
use Illuminate\Support\Facades\Auth;

class PollController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'deadline' => 'required|date',
            'choices' => 'required|array|min:2',
            'choices.*' => 'distinct|string',
        ]);

        $user = Auth::user();

        if (!$user->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $poll = new Poll([
            'title' => $request->title,
            'description' => $request->description,
            'deadline' => $request->deadline,
            'created_by' => $user->id,
        ]);
        $poll->save();

        foreach ($request->choices as $choice) {
            $poll->choices()->create([
                'choice' => $choice,
            ]);
        }

        return response()->json($poll, 200);
    }

    public function getAll(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $polls = Poll::with('choices')->get();

        return response()->json($polls, 200);
    }


    public function getOne($poll_id)
{
    $user = Auth::user();

    try {
        $poll = Poll::findOrFail($poll_id);
        $poll->choices;
        return response()->json($poll, 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Poll not found'], 404);
    }
}

public function stats(Request $request, $poll_id)
{
    $user = Auth::user();

    $poll = Poll::findOrFail($poll_id);
    $poll->choices;

    $q = Division::all();

    $divMap = array();

    $totalVotes = 0;
    $pollResults = [];

    foreach($q as $div) {
        $cMap = array();

        $qTotalVote = Vote::where("division_id", $div->id)->where("poll_id", $poll_id);
        foreach($poll->choices as $choice) {
            $qVote = Vote::where("division_id", $div->id)->where("choice_id", $choice->id)->where("poll_id", $poll_id);
            $cMap[$choice->choice] = $qVote->count();

            if (!isset($pollResults[$choice->choice])) {
                $pollResults[$choice->choice] = 0;
            }
            $pollResults[$choice->choice] += $cMap[$choice->choice];

            $totalVotes += $cMap[$choice->choice];
        }

        $divMap[$div->name] = $cMap;
    }

    $finalStats = [];
    foreach ($pollResults as $choice => $votes) {
        $percentage = ($votes / $totalVotes) * 100;
        $finalStats[$choice] = round($percentage, 2) . '%';
    }

    return response()->json([
        'poll_stats' => $divMap,
        'final_stats' => $finalStats
    ], 200);
}




    public function vote(Request $request, $poll_id, $choice_id)
    {
        $user = Auth::user();

        $poll = Poll::findOrFail($poll_id);


        if ($user->isAdmin()) {
            return response()->json(['status' => false,'message' => 'YOUR ADMIN'],);
        }

        if ($poll->isDeadline()) {
            return response()->json(['message' => 'Voting deadline'], 422);
        }

        if ($poll->hasUserVoted($user->id)) {
            return response()->json(['message' => 'Already voted'], 422);
        }

        $choice = Choice::findOrFail($choice_id);

        $vote = new Vote([
            'user_id' => $user->id,
            'poll_id' => $poll_id,
            'choice_id' => $choice_id,
            'division_id' => $user->division_id,
        ]);
        $vote->save();

        return response()->json(['message' => 'Voting success'], 200);
    }



    public function delete($poll_id)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        try {
            $poll = Poll::findOrFail($poll_id);
            $poll->choices()->delete();
            $poll->delete();
            return response()->json(null, 200);
        } catch (\Exception $e) {
            echo"$e";
            return response()->json(['message' => 'Poll not found'], 404);
        }
    }
}
