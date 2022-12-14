@extends('layout')
@section('content')
    <section class="vh-100">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-primary text-white">
                        <div class="card-body p-5 text-center">

                            <div class="mb-md-5 mt-md-4 pb-5">
                                <form action="{{ route('users.store') }}" method="POST">
                                    @csrf
                                    <h2 class="fw-bold mb-2 text-uppercase">{{ __('Login') }}</h2>
                                    <p class="text-white-50 mb-5">{{ __('Please enter your username and password!') }}</p>
                                    @error('errors')
                                    <p class="text-50 mb-5" style="color: red">{{ __($message) }}</p>
                                    @enderror
                                    <div class="form-outline form-white mb-4">
                                        <label class="form-label" for="typeNameX">{{ __('Username') }}</label>
                                        <input type="text" id="typeNameX" class="form-control form-control-lg"
                                               name="name" value="{{ old('name') }}"/>
                                        @error('name')
                                        <p class="text-50 mb-5" style="color: red">{{ __($message) }}</p>
                                        @enderror

                                    </div>
                                    <div class="form-outline form-white mb-4">
                                        <label class="form-label" for="typePasswordX">{{ __('Password') }}</label>
                                        <input type="password" id="typePasswordX" class="form-control form-control-lg"
                                               name="password"/>
                                        @error('name')
                                        <p class="text-50 mb-5" style="color: red">{{ __($message) }}</p>
                                        @enderror
                                    </div>
                                    <button class="btn btn-outline-light btn-lg px-5"
                                            type="submit">{{ __('Login') }}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
