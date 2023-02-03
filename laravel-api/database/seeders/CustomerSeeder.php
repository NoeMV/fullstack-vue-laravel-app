<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Customer::factory()->count(15)->hasInvoices(4)->create();

        Customer::factory()->count(50)->hasInvoices(2)->create();

        Customer::factory()->count(30)->hasInvoices(3)->create();

        Customer::factory()->count(3)->create();
    }
}
