<?php

namespace App\Actions\Fortify;

use Laravel\Fortify\Contracts\CreatesNewUsers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use App\Models\Users;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     */
    public function create(array $input) {
        /** validate input. */
        Validator::make($input, [
            'username' => ['required', 'string', 'max:255', Rule::unique(Users::class)],
            'firstname' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'email' => [ 'required', 'string', 'email', 'max:255', Rule::unique(Users::class)],
            'password' => $this->passwordRules(),
        ])->validate();

        /** assign role to user. */
        $role = '';

        if ($input['username'] === 'reijo') {
            $role = 'admin';
        } else {
            $role = 'user';
        }

        /** create and return user. */
        return Users::create([
            'username' => $input['username'],
            'firstname' => $input['firstname'],
            'lastname' => $input['lastname'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
            'role' => $role,
        ]);
    }
}
