@extends('layouts/master')

@section('content')

@javascript(compact('pusherKey', 'clientConnectionPath', 'environment', 'openWeatherMapKey'))

<div class="glue-banner w-full px-6 py-2 text-white">
    
    <div class="float-left w-1/2 pt-4 z-10">
        <img class="w-5 float-left" src="{{URL::to('/')}}/images/glue-logo.png"><p class="text-3xl pl-2 float-left">glue</p>
    </div>
    <div class="float-right w-1/2 text-right pt-4 z-10">
        <p class="text-3xl font-bold">dashboard</p>
    </div>

    <div class="drops"></div>

</div>

<div id="dashboard">

    <div class="hidden">

        {{$cloudid = json_encode(env('GOOGLE_CLOUD_ID'))}}
        {{$cloudsecret = json_encode(env('GOOGLE_CLOUD_SECRET'))}}
        {{$appurl = json_encode(env('APP_URL'))}}
        {{$apikey = json_encode(env('GOOGLE_API_KEY'))}}
        {{$sheetskey = json_encode(env('GOOGLE_SHEETS_KEY'))}}
        {{$harvest_account_id = json_encode(env('HARVEST_ACCOUNT_ID'))}}
        {{$harvest_auth = json_encode(env('HARVEST_AUTH'))}}
        {{$freshdesk_auth = json_encode(env('FRESHDESK_AUTH'))}}
        {{$calendarid = json_encode(env('GOOGLE_CALENDAR_ID'))}}


</div>

    <dashboard :appurl={{$appurl}} :cloudid={{$cloudid}} :cloudsecret={{$cloudsecret}} class="font-sans">
        
        <tasks :cloudid={{$cloudid}} :cloudsecret={{$cloudsecret}} :appurl={{$appurl}} :sheetskey={{$sheetskey}} class="rounded-glue" position="a1:b14"></tasks>
        <timetrack :harvest_auth={{$harvest_auth}} :harvest_account_id={{$harvest_account_id}}  position="a15:a24"></timetrack>
        <wiezijnweek class="wzwTile" position="b15:b20"></wiezijnweek>
        <analytics :cloudid={{$cloudid}} :cloudsecret={{$cloudsecret}} :appurl={{$appurl}} position="b21:b24"></analytics>
        <freshdesk :freshdesk_auth={{$freshdesk_auth}} class="rounded-glue" position="c1:d14"></freshdesk>
        <projects :harvest_auth={{$harvest_auth}} :harvest_account_id={{$harvest_account_id}} position="c15:d24"></projects>
        <time-weather class="rounded-glue" position="e1:e8" date-format="ddd DD/MM" time-zone="Europe/Brussels" weather-city="Ghent"></time-weather>
        <calendar :apikey={{$apikey}} :cloudid={{$cloudid}} :calendarid={{$calendarid}}  :cloudsecret={{$cloudsecret}} :appurl={{$appurl}} position="e9:e24"></calendar>

    </dashboard>
</div>

@endsection
