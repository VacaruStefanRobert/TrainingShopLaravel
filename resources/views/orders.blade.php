@extends('layout')
@section('content')
    @foreach ($orders as $order):
    <div class="container-fluid">

        <div class="container">
            <!-- Title -->
            <div class="d-flex justify-content-between align-items-center py-3">
                <h2 class="h5 mb-0"><a href="#" class="text-muted"></a> {{__('Order')}} #{{$order->id}}
                </h2>
            </div>

            <!-- Main content -->
            <div class="row">
                <div class="col-lg-8">
                    <!-- Details -->
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="mb-3 d-flex justify-content-between">
                                <div>
                                    <span class="h6">Date: {{ $order->created_at}}</span>
                                </div>
                                <div class="d-flex">
                                    <a href="{{route('order',$order->id)}}" type="button"
                                       class="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text">
                                        {{__('Go to Order')}}</a>
                                    <div class="dropdown">
                                        <button class="btn btn-link p-0 text-muted" type="button"
                                                data-bs-toggle="dropdown">
                                            <i class="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-end">
                                            <li><a class="dropdown-item" href="#"><i class="bi bi-pencil"></i> Edit</a>
                                            </li>
                                            <li><a class="dropdown-item" href="#"><i class="bi bi-printer"></i>
                                                    Print</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Payment -->
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h3 class="h6">{{__('Payment')}}</h3>
                                    <p>Total: $ {{{$order->price}}}</p>
                                </div>
                                <div class="col-lg-6">
                                    <h3 class="h6">{{__('Comments and details')}}</h3>
                                    <address>
                                        <strong>{{__('Name')}}: {{$order->name}}</strong><br>
                                        {{__('Comments and details')}}: {{$order->comments}}
                                    </address>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    @endforeach
@endsection
