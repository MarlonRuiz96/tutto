<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class TaskController extends Controller
{
    /**
     * Obtener todas las tareas con su usuario y estado
     */
    public function getAllTasks()
    {
        $tasks = Task::with(['user', 'status'])->get(); // ✅ Cargar relaciones con User y Status

        return response()->json($tasks);
    }

    /**
     * Obtener una tarea por ID
     */
    public function getTaskById($id)
    {
        $task = Task::with(['user', 'status'])->find($id);

        if (!$task) {
            return response()->json(['message' => 'Tarea no encontrada'], 404);
        }

        return response()->json([
            'id' => $task->id,
            'title' => $task->title,
            'description' => $task->description,
            'status' => $task->status ? $task->status->name : 'Estado no asignado',
            'status_id' => $task->status_id,
            'user_id' => $task->user_id,
            'user_name' => $task->user ? $task->user->user : 'Usuario no encontrado'
        ]);
    }

    /**
     * Crear una nueva tarea
     */
    public function createTask(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status_id' => 'required|exists:status,id',
            'user_id' => 'required|exists:users,id'
        ]);

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'status_id' => $request->status_id,
            'user_id' => $request->user_id
        ]);

        return response()->json($task, 201);
    }

    /**
     * Actualizar una tarea por ID
     */
    public function updateTask(Request $request, $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Tarea no encontrada'], 404);
        }

        $validatedData = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string|nullable',
            'status_id' => 'sometimes|exists:status,id',
            'user_id' => 'sometimes|exists:users,id'
        ]);

        $task->update($validatedData);

        return response()->json($task, 200);
    }

    /**
     * Eliminar una tarea por ID
     */
    public function deleteTask($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Tarea no encontrada'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Tarea eliminada'], 200);
    }

    /**
     * Obtener el nombre de usuario a partir del ID
     */
    public function getUserName($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        return response()->json(['name' => $user->user]);
    }

    /**
     * Contar el total de tareas
     */
    public function countTasks()
    {
        $count = Task::count();

        return response()->json(['total_tasks' => $count]);
    }

    /**
     * Contar las tareas pendientes o en progreso
     */
    public function getPendingTasksCount()
    {
        // Obtenemos el ID del estado "Completed"
        $completedStatusIds = Status::where('name', 'Completed')->pluck('id');
    
        // Contamos todas las tareas que no tengan el estado "Completed"
        $count = Task::whereNotIn('status_id', $completedStatusIds)->count();
    
        return response()->json(['pending_tasks' => $count]);
    }
    

    /**
     * Contar las tareas completadas
     */
    public function getCompletedTasksCount()
    {
        $completedStatusId = Status::where('name', 'Completed')->value('id');

        $count = Task::where('status_id', $completedStatusId)->count();

        return response()->json(['completed_tasks' => $count]);
    }
}
