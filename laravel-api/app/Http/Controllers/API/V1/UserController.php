<?php

namespace App\Http\Controllers\API\V1;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;

class UserController extends Controller
{
    public function index() {
        return User::with(['roles', 'permissions'])->paginate();
    }

    public function loggedUser(Request $request) {
        $user = $request->user();

        if($user){
            $user->load(['roles', 'permissions']);
            $user->allPerms = $request->user()->getAllPermissions();
            return $user;
        } else {
            return $user;
        }
    }

    public function showUserWithAuth($id) {
        $user = User::find($id);

        $user->load(['roles', 'permissions']);

        return $user;
    }

    public function allPermsRoles(){
        $roles = Role::all()->pluck('name');
        $perms = Permission::all()->pluck('name');

        $auth = [$roles, $perms];

        return $auth;
    }

    public function updatePerms(Request $request, $id) {
        $user = User::find($id);

        $roles = $request->authData[0];
        $perms = $request->authData[1];

        $user->syncRoles($roles);
        $user->syncPermissions($perms);

        return response()->json('User updated!');
    }

    public function deleteUser($id) {
        $user = User::find($id);

        $user->delete();

        return response()->json('User deleted!');
    }
}
