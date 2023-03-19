<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Mail\Reset;
use App\Mail\Verify;
use App\Models\Users;
use App\Models\Verification;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        /** Add hard coded parameter. */
        if ($request->email === 'reijo@buntod.com') {
            $request->request->add(['role' => 'admin']);
        } else {
            $request->request->add(['role' => 'users']);
        }

        /** Validate request data */
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users|max:255',
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|unique:users|max:255',
            'role' => 'required|string|max:255',
            'password' => 'required|min:10',
        ]);

        /** Return errors if validation error occured. */
        if ($validator->fails()) {
            /** Return. */
            return response(['message' => 'Something went wrong kindly check your email or username in which must be unique.'], 400);
        }

        /** Check if validation pass then create Users and auth token. */
        $url = '';
        if ($validator->passes()) {
            $Users = Users::create([
                'username' => strip_tags($request->username),
                'firstname' => strip_tags($request->firstname),
                'lastname' => strip_tags($request->lastname),
                'email' => strip_tags($request->email),
                'role' => strip_tags($request->role),
                'password' => Hash::make($request->password)
            ]);

            /** Create random token. */
            $code = Str::random(64);

            /** Insert or update to the database. */
            Verification::updateOrInsert(['userid' => $Users->id], ['token' => $code, 'created_at' => Carbon::now()->format('Y-m-d H:i:s'), 'updated_at' => Carbon::now()->format('Y-m-d H:i:s')]);

            /** Create full reset password link. */
            $url = URL::to('') . '/auth/verify/' . $code;
        }

        /** Send mail to the Users. */
        try {
            /** Prepare data. */
            $verifyData = [
                'title' => 'Email Verification',
                'body' => 'Please verify your email address before proceeding to fully enjoy the benefits we have provided.',
                'fullname' => strip_tags($request->firstname) . ' ' . strip_tags($request->lastname),
                'link' => $url
            ];
            /** Send mail. */
            Mail::to(strip_tags($request->email))->send(new Verify($verifyData));
            /** Return success message. */
            return response(['message' => 'Please verify your email as soon as possible!.'], 200);
        } catch (\Exception $ex) {
            /** Return error message. */
            return response(['message' => 'We apologise that we are not able to send an email verification link.'], 401);
        }
    }

    public function login(Request $request)
    {

        /** Attempt to authenticate Users. */
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response(['message' => 'No record was located with these login details.'], 401);
        }

        /** Find Users after passing the auth attempt. */
        $user = Users::where('email', strip_tags($request->email))->firstOrFail();

        /** Create token to send back. */
        $token = $user->createToken('auth_token')->plainTextToken;

        /** Select first name. */
        $name = Users::where('id', Auth::id())->select('firstname')->first();

        /** Return something. */
        return response([
            'email_verified' => $user->email_verified_at,
            'role' => $user->role,
            'access_token' => $token,
            'message' => $name->firstname  . ', we are glad you are back and hope you will have a good time with us!'
        ]);
    }

    public function reset(Request $request)
    {
        if (is_null($request->input('token'))) {
            /** Validate request data */
            $validator = Validator::make($request->all(), [
                'email' => 'required|email|exists:users|max:255',
            ]);

            /** Return errors if validation error occur. */
            if ($validator->fails()) {
                /** Return. */
                return response(['message' => 'No record was located with the email provided.'], 401);
            }

            /** Process the request if all good. */
            if ($validator->passes()) {
                /** Create random token. */
                $code = Str::random(64);

                /** Insert or update to the database. */
                DB::table('password_resets')->updateOrInsert(
                    ['email' => strip_tags($request->email)],
                    ['token' => $code, 'created_at' => Carbon::now()->format('Y-m-d H:i:s'), 'updated_at' => Carbon::now()->format('Y-m-d H:i:s')]
                );

                /** Create full reset password link. */
                $url = URL::to('') . '/auth/reset/' . $code;

                /** Try sending email to the Users. */
                try {
                    /** Fetch Users information. */
                    $Users = Users::select('firstname', 'lastname')->where('email', strip_tags($request->email))->first();

                    /** Prepare paramaters. */
                    $resetData = [
                        'title' => 'Reset Password',
                        'body' => 'Someone requested that the password be reset.',
                        'fullname' => $Users->firstname . ' ' . $Users->lastname,
                        'link' => $url
                    ];

                    /** Send mail. */
                    Mail::to(strip_tags($request->email))->send(new Reset($resetData));

                    /** Return success message. */
                    return response(['message' => 'An email with the password reset link will be sent to you shortly.'], 200);
                } catch (\Exception $ex) {
                    /** Return when something goes south. */
                    return response(['message' => 'The email link could not be sent.'], 401);
                }
            }
        }

        /** Validate request data */
        $validator = Validator::make($request->all(), [
            'token' => 'required|string|max:255',
            'email' => 'required|email|exists:users|max:255',
            'password' => 'required|min:10',
        ]);

        /** Return errors if validation error occur. */
        if ($validator->fails()) {
            /** Return error message. */
            return response(['message' => 'No record was located with the email provided.'], 401);
        }

        /** Process the request if all good. */
        if ($validator->passes()) {
            /** Check if token is still latest. */
            $reset = DB::table('password_resets')->select('email')->where('email', strip_tags($request->email))->where('token', strip_tags($request->token))->first();
            if (is_null($reset)) {
                /** Return error message. */
                return response(['message' => 'No record was located with the token provided.'], 401);
            }

            /** Update password. */
            $id = Users::where('email', $reset->email)->update(['password' => Hash::make($request->password)]);

            /** Remove the current token in order for it not to be reused. */
            DB::table('password_resets')->where('token', strip_tags($request->token))->delete();

            /** Fetch Users information. */
            $person = Users::where('id', $id)->select('firstname', 'lastname')->first();

            /** Return something. */
            return response(['message' => $person->firstname . ' ' . $person->lastname . ', your password has been successfully updated.'], 200);
        }
    }

    public function verify(Request $request)
    {
        /** Validate request data */
        $validator = Validator::make($request->all(), [
            'token' => 'required|string|max:255',
        ]);

        /** Return errors if validation error occur. */
        if ($validator->fails()) {
            /** Return error message. */
            return response(['message' => 'The format of the given token is incorrect.'], 401);
        }

        /** Process the request if all good. */
        if ($validator->passes()) {
            /** Throw a tantrum if no Users found. */
            $person = Verification::where('token', strip_tags($request->token))->select('userid')->first();
            if (is_null($person)) {
                /** Return error message. */
                return response(['message' => 'There is no associated Users with the provided verification token.'], 401);
            }

            /** Check if Users alredy verified. */
            $verified = Users::where('id', $person->userid)->select('email_verified_at')->first();
            if ($verified->email_verified_at === true) {
                return response(['message' => 'The email has already been verified.'], 401);
            }

            /** If not then go ahead. */
            Users::where('id', $person->userid)->update(['email_verified_at' => 1]);

            /** Remove the current token in order for it not to be reused. */
            Verification::where('token', $request->token)->delete();

            /** Return sucess message. */
            return response(['message' => 'The email has successfully been verified.'], 200);
        }
    }

    public function resend()
    {
        /** Get Users id. */
        $id = Auth::id();

        /** Check if Users alredy verified. */
        $verified = Users::where('id', $id)->select('email_verified_at')->first();
        if ($verified->email_verified_at === true) {
            return response(['message' => 'The email has already been verified.'], 401);
        }

        /** Get Users information. */
        $user = Users::where('id', $id)->select('id', 'email', 'firstname', 'lastname')->first();

        /** Create random token. */
        $code = Str::random(64);

        /** Insert or update to the database. */
        Verification::updateOrInsert(['userid' => $user->id], ['token' => $code, 'created_at' => Carbon::now()->format('Y-m-d H:i:s'), 'updated_at' => Carbon::now()->format('Y-m-d H:i:s')]);

        /** Create full reset password link. */
        $url = URL::to('') . '/auth/verify/' . $code;

        /** Send mail to the Users.. */
        try {
            $verifyData = [
                'title' => 'Resend Email Verification',
                'body' => 'Please verify your email address before proceeding to fully enjoy the benefits we have provided.',
                'fullname' => $user->firstname . ' ' . $user->lastname,
                'link' => $url
            ];

            Mail::to(strip_tags($user->email))->send(new Verify($verifyData));

            /** Return sucess message. */
            return response(['message' => 'Email verfication link sent.'], 200);
        } catch (\Exception $ex) {
            /** Return error message. */
            return response(['message' => 'Unable to send verification link.', 'error' => $ex], 401);
        }
    }

    public function logout(Request $request)
    {
        if (is_null($request->only('token'))) {
            /** Return error message. */
            return response(['message' => 'The authentication token has not been set. Did you perhaps enter from another door?'], 401);
        }
        /** Get Users id. */
        $id = Auth::id();

        /** Delete all current tokens. */
        DB::table('personal_access_tokens')->where('tokenable_id', $id)->select('token')->delete();

        /** Return something. */
        return response(['message' => 'We are hoping to see you any time soon!'], 200);
    }

    public function protect()
    {
        /** Return something. */
        return response(['status' => true], 200);
    }
}
