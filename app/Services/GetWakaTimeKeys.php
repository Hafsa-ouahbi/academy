<?php

namespace App\Services;

use App\Models\User;
use App\Models\WakaTime;
use Illuminate\Support\Facades\Http;

class GetWakaTimeKeys 
{
    public function getWakaTimeKeys()
    {
        try {
            $wakaKeys = Http::withHeaders([
                "x-api-key" => env("CLIENT_SECRET"),
            ])->get(env("CENTRAL_HOST_URL") . "api/academy/wakatime");
            $wakaKeys->throw();
        } catch (\Throwable $th) {
            log($th->getCode() . " : " . $th->getMessage());
            return redirect()->intended();
        }

        foreach ($wakaKeys->json() ?? [] as $key => $wakaKey) {

            $tmpwakaKey = WakaTime::where("wakatime_key", $wakaKey["wakatime_key"])->first();
            $user_id = User::where("central_id", $wakaKey["central_user_id"])->value("id");
            
            // check if the user of the account exist in our database
            if ($user_id) {
                // check if this wakaKey account already exist
                if (!$tmpwakaKey) {
                    WakaTime::create([
                        "user_id" => $user_id,
                        "wakatime_key" => $wakaKey["wakatime_key"],
                    ]);
                } else {
                    $tmpwakaKey->update([
                        "wakatime_key" => $wakaKey["wakatime_key"],
                    ]);
                }
            }
        }
        return ;
    }
}