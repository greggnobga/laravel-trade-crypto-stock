<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stock_trades', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('symbol');
            $table->decimal('price', 24, 2)->default(0.00);
            $table->decimal('change', 24, 2)->default(0.00);
            $table->decimal('volume', 24, 2)->default(0.00);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stock_trades');
    }
};
