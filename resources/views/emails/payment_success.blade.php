<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Betaling Succesvol</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #007bff;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        ul li {
            margin: 10px 0;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h1>Betaling Succesvol!</h1>
        <p>Beste {{ $user->naam }},</p>
        <p>Bedankt voor uw betaling. Hieronder vindt u de details van uw betaling:</p>

        <ul>
            <li><strong>Behandeling:</strong> {{ $transaction->behandeling }}</li>
            <li><strong>Bedrag:</strong> €{{ number_format($transaction->amount / 100, 2) }}</li>
            <li><strong>Betaald op:</strong> {{ now()->format('d-m-Y') }}</li>
            <li><strong>U kan een afspraak maken op:</strong> {{ now()->addMonths(3)->format('d-m-Y') }}</li>
        </ul>

        <p>U bent succesvol toegevoegd aan de wachtlijst.</p>
        <p>Met vriendelijke groet,</p>
        <p><strong>Appointy</strong></p>
        <div class="footer">
            <p>Dit is een automatisch gegenereerde e-mail. Gelieve niet te antwoorden.</p>
        </div>
    </div>
</body>
</html>
