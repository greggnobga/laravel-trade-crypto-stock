<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stock_charts', function (Blueprint $table) {
            $table->id();
            $table->integer('userid');
            $table->string('symbol');
            $table->decimal('supportlevel', 24, 2)->signed()->default(0.00);
            $table->decimal('resistancelevel', 24, 2)->signed()->default(0.00);
            $table->decimal('movingaverage', 24, 2)->signed()->default(0.00);
            $table->string('movingsignal');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_charts');
    }
};
