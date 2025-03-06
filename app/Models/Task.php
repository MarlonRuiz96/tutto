<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'status_id', 'user_id']; // ✅ Cambiamos 'status' por 'status_id'

    /**
     * Relación con el usuario (Una tarea pertenece a un usuario).
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id'); // ✅ Relación con User
    }

    /**
     * Relación con el status (Una tarea pertenece a un estado).
     */
    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id'); // ✅ Relación con Status
    }
}
