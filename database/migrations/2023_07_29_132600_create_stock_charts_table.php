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
            $table->decimal('averageone', 24, 2)->signed()->default(0.00);
            $table->decimal('averagetwo', 24, 2)->signed()->default(0.00);
            $table->decimal('averagethree', 24, 2)->signed()->default(0.00);
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
