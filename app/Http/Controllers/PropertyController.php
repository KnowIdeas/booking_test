<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return response()->json(Property::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): Response
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'address' => 'required|string',
            'is_available' => 'boolean',
        ]);

        $property = Property::create($validated);

        return response()->json($property, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Property $property): Response
    {
        return response()->json($property);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Property $property): Response
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric',
            'address' => 'sometimes|required|string',
            'is_available' => 'sometimes|boolean',
        ]);

        $property->update($validated);

        return response()->json($property);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property): Response
    {
        $property->delete();

        return response()->json(null, 204);
    }
}
