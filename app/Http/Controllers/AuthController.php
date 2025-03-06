<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validar los datos
        $request->validate([
            'user' => 'required', // ✅ Ahora validamos "name" en lugar de "email"
            'password' => 'required'
        ]);

        // Buscar el usuario en la base de datos por "name"
        $user = User::where('user', $request->user)->first();

        // Si el usuario no existe o la contraseña no coincide
        if (!$user || $user->password !== $request->password) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        // Si el usuario existe y la contraseña es correcta
        return response()->json([
            'message' => 'Inicio de sesión exitoso',
            'user' => $user
        ], 200);
    }

    public function getAllUsers()
    {
        return response()->json(User::all());
    }

    public function deleteUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'Usuario eliminado correctamente']);
    }

    public function createUser(Request $request)
    {
        // Validar los datos
        $request->validate([
            'user' => 'required|unique:users', // ✅ Ahora validamos "name" en lugar de "email"
            'password' => 'required'
        ]);

        // Crear el usuario
        $user = User::create([
            'user' => $request->user,
            'password' => $request->password
        ]);

        return response()->json(['message' => 'Usuario creado correctamente', 'user' => $user], 201);
    }

    public function getUserById($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        return response()->json($user);
    }

    public function updateUser(Request $request, $id)
    {
        // Buscar el usuario por ID
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Validar los datos
        $request->validate([
            'user' => 'required|unique:users,user,' . $id, // ✅ Ahora validamos "name" en lugar de "email"
            'password' => 'required'
        ]);

        // Actualizar el usuario
        $user->user = $request->user;
        $user->password = $request->password;
        $user->save();

        return response()->json(['message' => 'Usuario actualizado correctamente', 'user' => $user]);
    }

}
