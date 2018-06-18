<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('parse','ImageController@parse');
Route::get('history/{user}','ImageController@history');

Route::post('login', 'UserController@Login');
Route::post('register', 'UserController@Register');
Route::get('user/{user}', 'UserController@getUser');
