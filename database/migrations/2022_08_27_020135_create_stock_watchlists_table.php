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
        Schema::create('stock_watchlists', function (Blueprint $table) {
            $table->id();
            $table->string('symbol');
            $table->integer('edge')->default(0);
            $table->decimal('totalliabilities', 24, 2)->signed()->default(0.00);
            $table->decimal('shareholdersequity', 24, 2)->signed()->default(0.00);
            $table->decimal('lastradedprice', 24, 2)->signed()->default(0.00);
            $table->decimal('earningspershare', 24, 2)->signed()->default(0.00);
            $table->decimal('netincomebeforetax', 24, 2)->signed()->default(0.00);
            $table->decimal('grossrevenue', 24, 2)->signed()->default(0.00);
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
        Schema::dropIfExists('stock_watchlists');
    }
};
