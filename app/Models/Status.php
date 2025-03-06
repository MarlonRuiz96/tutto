<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    protected $table = 'status'; 


    protected $fillable = ['name'];

    /**
     * Relación con las tareas (Un estado puede tener muchas tareas).
     */
    public function tasks()
    {
        return $this->hasMany(Task::class, 'status_id'); 
    }
}
