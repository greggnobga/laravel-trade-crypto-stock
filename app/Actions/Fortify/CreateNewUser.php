<?php

namespace App\Actions\Fortify;

use App\Models\Users;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     */
    public function create(array $input)
    {
        /** validate input. */
        Validator::make($input, [
            'username' => ['required', 'string', 'max:255'],
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
