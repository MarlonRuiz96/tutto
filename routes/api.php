<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController; // ✅ Importación correcta
use App\Http\Controllers\StatusController; // ✅ Importación correcta


// como no requiere autenticación, no es necesario agregar el middleware
Route::get('/tasks/count', [TaskController::class, 'countTasks']);// ✅ Ruta GET para obtener el total de tareas
Route::get('/tasks/pending/count', [TaskController::class, 'getPendingTasksCount']);
Route::get('/tasks/completed/count', [TaskController::class, 'getCompletedTasksCount']);
Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
Route::get('/status', [StatusController::class, 'getAllStatus']); // ✅ Nueva ruta para obtener los estados


// Rutas para el controlador TaskController PARA LAS TAREAS!
Route::get('/tasks', [TaskController::class, 'getAllTasks']); // ✅ Ruta GET para obtener todas las tareas
Route::get('/tasks/{id}', [TaskController::class, 'getTaskById']); // ✅ Ruta GET para obtener una tarea por ID
Route::post('/tasks', [TaskController::class, 'createTask']); // ✅ Ruta POST para crear una tarea
Route::put('/tasks/{id}', [TaskController::class, 'updateTask']); // ✅ Ruta PUT para actualizar una tarea
Route::delete('/tasks/{id}', [TaskController::class, 'deleteTask']); // ✅ Ruta DELETE para eliminar una tarea


// Rutas para el controlador AuthController MANEJAR LOS USUARIOS!
Route::get('/users', [App\Http\Controllers\AuthController::class, 'getAllUsers']); // ✅ Definir la ruta correctamente
Route::delete('/users/{id}', [App\Http\Controllers\AuthController::class, 'deleteUser']); // ✅ Definir la ruta correctamente
Route::post('/users', [App\Http\Controllers\AuthController::class, 'createUser']); // ✅ Definir la ruta correctamente
Route::get('/users/{id}', [App\Http\Controllers\AuthController::class, 'getUserById']); // ✅ Definir la ruta correctamente
Route::put('/users/{id}', [App\Http\Controllers\AuthController::class, 'updateUser']); // ✅ Definir la ruta correctamente


// Rutas para el controlador StatusController PARA LOS ESTADOS!
Route::get('/status', [StatusController::class, 'getAllStatus']); // ✅ Definir la ruta correctamente
Route::get('/status/{id}', [StatusController::class, 'getStatusById']); // ✅ Definir la ruta correctamente
Route::post('/status', [StatusController::class, 'createStatus']); // ✅ Definir la ruta correctamente
Route::put('/status/{id}', [StatusController::class, 'updateStatus']); // ✅ Definir la ruta correctamente
Route::delete('/status/{id}', [StatusController::class, 'deleteStatus']); // ✅ Definir la ruta correctamente
