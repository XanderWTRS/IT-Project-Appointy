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
        Schema::create('personeel', function (Blueprint $table) {
            $table->id();
            $table->string('voornaam', 255); 
            $table->string('naam', 255); 
            $table->string('functie', 255); 
            $table->text('bio')->nullable(); 
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personeel');
    }
};
