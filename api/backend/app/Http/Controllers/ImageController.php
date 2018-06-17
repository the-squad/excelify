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
        $imagePath = storage_path('app/public/'.$path);
        $execPath = base_path('../Code/Mainn.py');
        $python_path = config('app.python_path');
        $this->my_shell_exec("$python_path \"$execPath\" \"$imagePath\"" ,$out,$error);
        $table = json_decode($out);
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

    function my_shell_exec($cmd, &$stdout=null, &$stderr=null) {
        $proc = proc_open($cmd,[
            1 => ['pipe','w'],
            2 => ['pipe','w'],
        ],$pipes);
        $stdout = stream_get_contents($pipes[1]);
        fclose($pipes[1]);
        $stderr = stream_get_contents($pipes[2]);
        fclose($pipes[2]);
        return proc_close($proc);
    }
}
