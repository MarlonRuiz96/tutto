<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Status;

class StatusController extends Controller
{
    /**
     * ✅ Obtener todos los estados
     */
    public function getAllStatus()
    {
        $statuses = Status::all();
        return response()->json($statuses);
    }

    /**
     * ✅ Obtener un estado por su ID
     */
    public function getStatusById($id)
    {
        $status = Status::find($id);

        if (!$status) {
            return response()->json(['message' => 'Estado no encontrado'], 404);
        }

        return response()->json($status);
    }

    /**
     * ✅ Crear un nuevo estado
     */
    public function createStatus(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:status,name|max:255', // ✅ Validar el nombre único
        ]);

        $status = Status::create([
            'name' => $request->name,
        ]);

        return response()->json(['message' => 'Estado creado correctamente', 'status' => $status], 201);
    }

    /**
     * ✅ Actualizar un estado por su ID
     */
    public function updateStatus(Request $request, $id)
    {
        $status = Status::find($id);

        if (!$status) {
            return response()->json(['message' => 'Estado no encontrado'], 404);
        }

        $request->validate([
            'name' => 'required|string|unique:status,name|max:255',
        ]);

        $status->update([
            'name' => $request->name,
        ]);

        return response()->json(['message' => 'Estado actualizado correctamente', 'status' => $status]);
    }

    /**
     * ✅ Eliminar un estado por su ID
     */
    public function deleteStatus($id)
    {
        $status = Status::find($id);

        if (!$status) {
            return response()->json(['message' => 'Estado no encontrado'], 404);
        }

        $status->delete();

        return response()->json(['message' => 'Estado eliminado correctamente']);
    }
}
