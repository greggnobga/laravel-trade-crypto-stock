<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('stock_trades', function (Blueprint $table) {
            $table->id();
            $table->integer('edge')->default(0);
            $table->integer('security')->default(0);
            $table->string('symbol')->default('TBA');
            $table->string('name')->default('TBA');
            $table->string('sector')->default('unknown');
            $table->decimal('price', 24, 2)->signed()->default(0.00);
            $table->decimal('change', 24, 2)->signed()->default(0.00);
            $table->decimal('volume', 24, 2)->signed()->default(0.00);
            $table->decimal('value', 24, 2)->signed()->default(0.00);
            $table->decimal('pricerange', 24, 2)->signed()->default(0.00);
            $table->decimal('workingcapital', 24, 2)->signed()->default(0.00);
            $table->decimal('netincomeaftertax', 24, 2)->signed()->default(0.00);
            $table->decimal('debtassetratio', 24, 2)->signed()->default(0.00);
            $table->decimal('priceearningratio', 24, 2)->signed()->default(0.00);
            $table->decimal('netprofitmargin', 24, 2)->signed()->default(0.00);
            $table->decimal('returnonequity', 24, 2)->signed()->default(0.00);
            $table->decimal('dividendyield', 24, 2)->signed()->default(0.00);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('stock_trades');
    }
};
