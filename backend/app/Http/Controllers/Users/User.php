<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Model\UserModel;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class User extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = UserModel::get(["id", "username", "email", "profile"]);
        return response()->json($user, 200);
    }

    public function login(Request $request)
    {
        $credentials = $request->all();
        $user = UserModel::select("*")->where("email", $credentials["email"])->get();

        if (is_null($user[0])) {
            return response()->json(["error" => "User not found!"], 404);
        }

        if (Hash::check($credentials["password"], $user[0]->password)) {
            $cu = $user[0];
            $data = ["id" => $cu->id, "username" => $cu->username, "email" => $cu->email, "createdAt" => $cu->created_at, "profile" => $cu->profile];

            return response()->json(["data" => $data], 200);
        }
        return response()->json(["error" => "User not found!"], 404);
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
        $rules = [
            "username" => "required|unique:users",
            "email" => "required|unique:users",
            "password" => "required"
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 404);
        }
        $request["password"] = Hash::make($request["password"]);
        $user = UserModel::create($request->all());
        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = UserModel::find($id);
        if (is_null($user)) {
            return response()->json(["message" => "User not found!"], 404);
        }
        return response()->json($user, 200);
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
        $user = UserModel::find($id);
        if (is_null($user)) {
            return response()->json(["message" => "User not found!"], 404);
        }
        $user->update($request->all());
        return response()->json($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = UserModel::find($id);
        if (is_null($user)) {
            return response()->json(["message" => "User not found!"], 404);
        }
        $user->delete();
        return response()->json(null, 204);
    }
}
