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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('voornaam', 255); 
            $table->string('naam', 255); 
            $table->date('geboortedatum');
            $table->string('mutualiteit', 255)->nullable();
            $table->string('rijksregister_nr', 11)->unique();
            $table->string('tandarts', 255)->nullable(); 
            $table->string('gsm_nummer', 15);
            $table->string('email')->unique(); 
            $table->string('password'); 
            $table->timestamp('datum_registratie')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->boolean('keuze_sms')->default(false); 
            $table->boolean('keuze_email')->default(false); 
            $table->boolean('betaald')->default(false);
            $table->rememberToken(); 
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
