<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsDemoSeeder extends Seeder
{
    /**
     * Create the initial roles and permissions.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'edit customers']);
        Permission::create(['name' => 'delete customers']);
        Permission::create(['name' => 'add customers']);
        Permission::create(['name' => 'view customers']);

        Permission::create(['name' => 'edit invoices']);
        Permission::create(['name' => 'delete invoices']);
        Permission::create(['name' => 'add invoices']);
        Permission::create(['name' => 'view invoices']);

        Permission::create(['name' => 'manage users']);

        // create roles and assign existing permissions
        $role1 = Role::create(['name' => 'viewer']);
        $role1->givePermissionTo('view customers');
        $role1->givePermissionTo('view invoices');

        $role2 = Role::create(['name' => 'editor']);
        $role2->givePermissionTo('add customers');
        $role2->givePermissionTo('add invoices');
        $role2->givePermissionTo('edit customers');
        $role2->givePermissionTo('edit invoices');
        $role2->givePermissionTo('delete customers');
        $role2->givePermissionTo('delete invoices');        

        $role3 = Role::create(['name' => 'admin']);
        $role3->givePermissionTo('manage users');


        // create demo users
        $user = \App\Models\User::factory()->create([
            'name' => 'Example Common User',
            'email' => 'test@example.com',
        ]);
        $user->assignRole($role1);

        $user = \App\Models\User::factory()->create([
            'name' => 'Example Editor User',
            'email' => 'editor@example.com',
        ]);
        $user->assignRole($role1);
        $user->assignRole($role2);

        $user = \App\Models\User::factory()->create([
            'name' => 'Example Admin User',
            'email' => 'admin@example.com',
        ]);
        $user->assignRole($role1);
        $user->assignRole($role2);
        $user->assignRole($role3);
    }
}
