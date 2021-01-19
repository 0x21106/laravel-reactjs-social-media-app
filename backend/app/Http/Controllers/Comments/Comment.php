<?php

namespace App\Http\Controllers\Comments;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Model\CommentModel;
use App\Models\Model\UserModel;
use Illuminate\Support\Facades\Validator;

class Comment extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $comments = CommentModel::get();
        $newComments = [];

        foreach ($comments as $comment) {
            $comment["user"] = UserModel::find($comment['uid']);
            array_push($newComments, $comment);
        };

        return response()->json($newComments, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            "post_id" => "required",
            "text" => "required|max:500",
            "uid" => "required"
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $comment = CommentModel::create($request->all(), $rules);
        return response()->json($comment, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $comment = CommentModel::find($id);
        if (is_null($comment)) {
            return response()->json(["message" => "Comment not found!"], 404);
        }
        return response()->json($comment, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $comment = CommentModel::find($id);
        if (is_null($comment)) {
            return response()->json(["message" => "Comment not found!"], 404);
        }
        $comment->update($request->all());
        CommentModel::where('id', $comment->id)->update(array('edited' => 1));
        return response()->json($comment, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $comment = CommentModel::find($id);
        if (is_null($comment)) {
            return response()->json(["message" => "Comment not found!"], 404);
        }
        $comment->delete();
        return response()->json(null, 204);
    }

    /**
     * Get Comments from Specific Post
     * 
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getWithPostId($id)
    {
        $comments = CommentModel::get()->where("post_id", $id);

        $newComments = [];

        foreach ($comments as $comment) {
            $comment["user"] = UserModel::find($comment['uid']);
            array_push($newComments, $comment);
        };

        if (is_null($comments)) {
            return response()->json(["message" => "Comments not found!"], 404);
        }
        return response()->json($newComments, 200);
    }
}
