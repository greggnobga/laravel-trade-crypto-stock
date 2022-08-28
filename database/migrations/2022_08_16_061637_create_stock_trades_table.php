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
            $table->integer('edge')->default(0);
            $table->decimal('price', 24, 2)->signed()->default(0.00);
            $table->decimal('change', 24, 2)->signed()->default(0.00);
            $table->decimal('volume', 24, 2)->signed()->default(0.00);
            $table->decimal('average', 24, 2)->signed()->default(0.00);
            $table->decimal('incomeaftertax', 24, 2)->signed()->default(0.00);
            $table->decimal('earningpershare', 24, 2)->signed()->default(0.00);
            $table->decimal('yearhighprice', 24, 2)->signed()->default(0.00);
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
