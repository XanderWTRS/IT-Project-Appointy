<?php

function encryptCompact($value)
{
    $key = substr(config('app.key'), 0, 32);
    $iv = substr(config('app.key'), 0, 16);
    return base64_encode(openssl_encrypt($value, 'aes-256-cbc', $key, 0, $iv));
}

function decryptCompact($value)
{
    $key = substr(config('app.key'), 0, 32);
    $iv = substr(config('app.key'), 0, 16);
    return openssl_decrypt(base64_decode($value), 'aes-256-cbc', $key, 0, $iv);
}
