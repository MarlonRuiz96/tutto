<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $table = 'users'; // ✅ Forzar a que use 'status' en lugar de 'status'



    protected $fillable = ['user', 'password'];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
