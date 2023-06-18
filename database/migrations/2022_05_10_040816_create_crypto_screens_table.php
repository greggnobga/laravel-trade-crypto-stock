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
        Schema::create('crypto_screens', function (Blueprint $table) {
            $table->id();
            $table->integer('userid');
            $table->string('address');
            $table->string('symbol');
            $table->string('name');
            $table->decimal('price', 24, 2)->signed()->default(0.00);
            $table->decimal('capital', 24, 2)->signed()->default(0.00);
            $table->decimal('volume', 24, 2)->signed()->default(0.00);
            $table->decimal('fee', 24, 2)->signed()->default(0.00);
            $table->decimal('locked', 24, 2)->signed()->default(0.00);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('crypto_screens');
    }
};
