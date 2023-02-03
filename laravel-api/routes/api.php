<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('users-info', [UserController::class, 'loggedUser']);

Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\API\V1', 'middleware' => 'auth:sanctum'], function() {

    Route::controller(UserController::class)->group(function() {
        Route::get('users', 'index');
        Route::get('users-show/{id}', 'showUserWithAuth')->middleware('permission:manage users');
        Route::get('users-list-perms', 'allPermsRoles');
        Route::patch('users-perms/{id}', 'updatePerms')->middleware('permission:manage users');
        Route::delete('users/{id}', 'deleteUser')->middleware('permission:manage users');
    });

    Route::get('invoices/for-customer/{id}', ['uses' => 'InvoiceController@indexForCustomer']);

    Route::apiResource('customers', CustomerController::class);
    Route::apiResource('invoices', InvoiceController::class);
    
});
