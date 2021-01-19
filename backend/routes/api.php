<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('comments', 'App\Http\Controllers\Comments\Comment');
Route::apiResource('posts', 'App\Http\Controllers\Posts\Post');
Route::apiResource("users", 'App\Http\Controllers\Users\User');
Route::post("users/login/", 'App\Http\Controllers\Users\User@login');

Route::get("comments&post_id={id}", "App\Http\Controllers\Comments\Comment@getWithPostId");