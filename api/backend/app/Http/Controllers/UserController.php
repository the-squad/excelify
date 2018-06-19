<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\User;
use Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUser(User $user)
    {
        return response(new UserResource($user), 200);
    }

    public function Login(Request $request)
    {
        $this->validate($request, [
            "email" => "required|email|exists:users,email",
            "password" => "required|min:5|max:50"
        ]);
        $user = User::where('email', '=', $request->email)->get()->first();
        if (!Hash::check($request->password, $user->password)) {
            return response('', 500);
        }
        return response(new UserResource($user), 200);
    }
    public function Register(Request $request)
    {
        $this->validate($request, [
            "name" => "required|min:3|max:15",
            "email" => "required|email|unique:users,email",
            "password" => "required|min:6|max:50",
        ]);
        $user = new User();
        $user->fill($request->all());
        $user->password=Hash::make($request->password);
        if ($user->save()) {
            \DB::commit();
            return response(new UserResource($user), 200);
        }
        \DB::rollBack();
        return response('Something went wrong', 504);
    }
}
