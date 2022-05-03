@extends('layouts.dashboard')
@section('content')
    <div id="dashboard">
        <div class="crypto sidebar dm-crypto">
            @include('includes.modal.sidebar.crypto')
        </div>
        <div class="stock sidebar dm-stock">
            @include('includes.modal.sidebar.stock')
        </div>
        <div class="content">
            <div class="perform">
                @include('includes.template.crypto.overviews')
            </div>
        </div>
    </div>

    <template class="stage-crypto-overviews">
        @include('includes.template.crypto.overviews')
    </template>

    <template class="stage-crypto-screens">
        <h2>Template for screen data.</h2>
    </template>

    <template class="stage-crypto-games">
        @include('includes.template.crypto.games')
        @include('includes.modal.crypto.games')
    </template>

    <template class="stage-crypto-moons">
        @include('includes.template.crypto.moons')
        @include('includes.modal.crypto.moons')
    </template>

    <template class="stage-crypto-portfolios">
        @include('includes.template.crypto.portfolios')
        @include('includes.modal.crypto.portfolios')
    </template>
@stop
