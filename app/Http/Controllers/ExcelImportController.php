<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\DataImport;

class ExcelImportController extends Controller
{
    public function uploadExcel(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv',
        ]);

        try {
            Excel::import(new DataImport, $request->file('file'));
            return response()->json(['message' => 'Data imported successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Import error: ' . $e->getMessage(), ['stack' => $e->getTraceAsString()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
