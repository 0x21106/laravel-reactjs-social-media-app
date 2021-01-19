<?php

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Model\PostModel;
use App\Models\Model\UserModel;

class Post extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = PostModel::get();
        $newPosts = [];

        foreach ($posts as $post) {
            $post["user"] = UserModel::find($post['userId']);
            array_push($newPosts, $post);
        };

        return response()->json($newPosts, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $rules = [
        //     "post_id" => "required",
        //     "text" => "required|max:500",
        //     "uid" => "required"
        // ];
        // $validator = Validator::make($request->all(), $rules);
        // if ($validator->fails()) {
        // return response()->json($validator->errors(), 400);
        // }
        $post = PostModel::create($request->all());
        return response()->json($post, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = PostModel::find($id);
        if (is_null($post)) {
            return response()->json(["message" => "Post not found!"], 404);
        }
        return response()->json($post, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        $post = PostModel::find($id);
        if (is_null($post)) {
            return response()->json(["message" => "Post not found!"], 404);
        }
        $post->update($request->all());
        return response()->json($post, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = PostModel::find($id);
        if (is_null($post)) {
            return response()->json(["message" => "Post not found!"], 404);
        }
        $post->delete();
        return response()->json(null, 204);
    }
}
