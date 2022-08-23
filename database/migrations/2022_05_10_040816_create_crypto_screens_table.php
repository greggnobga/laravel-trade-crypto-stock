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
        Schema::create('crypto_screens', function (Blueprint $table) {
            $table->id();
            $table->integer('userid');
            $table->string('api');
            $table->string('coin');
            $table->decimal('price',24,2)->signed()->default(0.00);
            $table->decimal('market',24,2)->signed()->default(0.00);
            $table->decimal('volume',24,2)->signed()->default(0.00);
            $table->decimal('change',24,2)->signed()->default(0.00);
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
        Schema::dropIfExists('crypto_screens');
    }
};
