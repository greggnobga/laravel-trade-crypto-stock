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
        Schema::create('stock_portfolios', function (Blueprint $table) {
          $table->id();
          $table->integer('userid');
          $table->string('order');
          $table->string('symbol');
          $table->decimal('fee', 24, 2)->signed()->default(0.00);
          $table->decimal('share', 24, 2)->signed()->default(0.00);
          $table->decimal('capital', 24, 2)->signed()->default(0.00);
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
        Schema::dropIfExists('stock_portfolios');
    }
};
