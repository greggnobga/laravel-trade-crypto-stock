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
        @include('includes.template.crypto.screens')
        @include('includes.modal.crypto.screens')
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

    <template class="stage-stock-overviews">
        @include('includes.template.stock.overviews')
    </template>

    <template class="stage-stock-watchlists">
        @include('includes.template.stock.watchlists')
        @include('includes.modal.stock.watchlists')
    </template>

    <template class="stage-stock-portfolios">
        @include('includes.template.stock.portfolios')
        @include('includes.modal.stock.portfolios')
    </template>

    <template class="stage-stock-trades">
        @include('includes.template.stock.trades')
        @include('includes.modal.stock.trades')
    </template>

    <template class="stage-stock-notes">
        @include('includes.template.stock.notes')
        @include('includes.modal.stock.notes')
    </template>
@stop
