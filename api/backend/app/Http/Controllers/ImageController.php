<?php

namespace App\Http\Controllers;

use App\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function parse(Request $request)
    {
        $this->validate($request, [
            "image" => "required"
        ]);
        $path = "images/" . uniqid() . ".png";
        $image = \Image::make($request->image);
        \Storage::disk('public')->put($path, $image->encode('png', 100));
        $table = json_decode(exec('python3 "' . base_path('../test.py').'" '.$path));
        if (\Auth::check())
        {
            $this->storeImage($path,$table,$request->title);
        }
        return $table;
    }

    private function storeImage($image,$table,$title)
    {
        $imageModel = new Image();
        $imageModel->path = $image;
        $imageModel->table = $table;
        $imageModel->title = $title;
        $imageModel->user()->associate(auth()->user());
        $imageModel->save();
    }

    public function history()
    {
        return \Auth::user()->images()->paginate();
    }
}
