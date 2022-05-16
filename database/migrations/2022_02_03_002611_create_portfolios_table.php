<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePortfoliosTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('crypto_portfolios', function (Blueprint $table) {
            $table->id();
            $table->integer('userid');
            $table->string('order');
            $table->string('wallet');
            $table->string('name');
            $table->string('coin');
            $table->decimal('capital',24,2)->default(0.00);
            $table->decimal('quantity',24,2)->default(0.00);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('crypto_portfolios');
    }
}
