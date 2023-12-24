/**
 * @Filename: authentication.js
 * @Description:
 * @User: NINJA MASTER - Mustafa Shaaban
 * @Date: 1/4/2023
 */

/* global nhGlobals, KEY */

// import theme 3d party modules
import $ from 'jquery';

// import theme modules
import NhValidator from './helpers/Validator';
import NhUiCtrl    from './inc/UiCtrl';
import NhAuth      from './modules/Auth';
import NhAjax      from './inc/Ajax';

// Define a class named NhAuthentication which extends NhAuth class
class NhAuthentication extends NhAuth
{
    constructor()
    {
        // Call the constructor of the parent class (NhAuth)
        super();

        // Initialize the UiCtrl and $el properties
        this.UiCtrl = new NhUiCtrl();
        this.$el    = this.UiCtrl.selectors = {
            // Define selectors for various forms and elements
            registration: {
                form: $(`#${KEY}_registration_form`),
                parent: $(`#${KEY}_registration_form`).parent(),
                user_password: $(`#${KEY}_user_password`),
            },
            login: {
                form: $(`#${KEY}_login_form`),
                parent: $(`#${KEY}_login_form`).parent(),
            },
            forgot: {
                form: $(`#${KEY}_forgot_form`),
                parent: $(`#${KEY}_forgot_form`).parent(),
            },
            change_password: {
                form: $(`#${KEY}_change_password_form`),
                parent: $(`#${KEY}_change_password_form`).parent(),
                user_password: $(`#${KEY}_user_password`),
            },
        };

        // Call the initialization method
        this.initialization();
    }

    // Perform necessary initializations
    initialization()
    {
        this.globalEvents();
        this.registrationFront();
        this.loginFront();
        this.forgotPasswordFront();
        this.changePasswordFront();
        this.showPassword();
    }

    globalEvents()
    {
        $('input[type="password"]').on('copy paste', function (e) {
            e.preventDefault();
        });
    }

    // Front-end code for the registration form
    registrationFront()
    {
        let that          = this,
            $registration = this.$el.registration;

        // Initialize form validation
        NhValidator.initAuthValidation($registration, 'registration');

        // Handle form submission
        $registration.form.on('submit', $registration.parent, function (e) {
            e.preventDefault();
            let $this    = $(e.currentTarget),
                formData = $this.serializeObject();

            // Validate the form and perform registration if valid
            if ($this.valid()) {
                NhAjax.createRequest($('body'), 'registration', {
                    action: `${KEY}_registration_ajax`,
                    data: formData,
                });
            }

            $(document).on('on:resSuccess', function (e, res, $el, requestName, data) {
                if (requestName === 'registration') {
                    window.location.href = res.data.redirect_url;
                }
            });
        });
    }

    // Front-end code for the login form
    loginFront()
    {
        let that         = this,
            $login       = this.$el.login;

        // Initialize form validation
        NhValidator.initAuthValidation($login, 'login');

        // Handle form submission
        $login.form.on('submit', $login.parent, function (e) {
            e.preventDefault();
            let $this    = $(e.currentTarget),
                formData = $this.serializeObject();

            // Validate the form and perform login if valid
            if ($this.valid()) {
                NhAjax.createRequest($('body'), 'login', {
                    action: `${KEY}_login_ajax`,
                    data: formData,
                });
            }

            $(document).on('on:resSuccess', function (e, res, $el, requestName, data) {
                if (requestName === 'login') {
                    window.location.href = res.data.redirect_url;
                }
            });
        });
    }

    // Front-end code for the forgot password form
    forgotPasswordFront()
    {
        let that         = this,
            $forgot      = this.$el.forgot;

        // Initialize form validation
        NhValidator.initAuthValidation($forgot, 'forgotPassword');

        // Handle form submission
        $forgot.form.on('submit', $forgot.parent, function (e) {
            e.preventDefault();
            let $this    = $(e.currentTarget),
                formData = $this.serializeObject();

            // Validate the form and perform forgot password request if valid
            if ($this.valid()) {
                NhAjax.createRequest($('body'), 'forgot', {
                    action: `${KEY}_forgot_password_ajax`,
                    data: formData,
                });
            }

            $(document).on('on:resSuccess', function (e, res, $el, requestName, data) {
                if (requestName === 'forgot') {
                    $el[0].reset();
                }
            });
        });
    }

    // Front-end code for the change password form
    changePasswordFront()
    {
        let that             = this,
            $change_password = this.$el.change_password;

        // Initialize form validation
        NhValidator.initAuthValidation($change_password, 'change_password');

        // Handle form submission
        $change_password.form.on('submit', $change_password.parent, function (e) {
            e.preventDefault();
            let $this    = $(e.currentTarget),
                formData = $this.serializeObject();

            // Validate the form and perform change password request if valid
            if ($this.valid()) {
                NhAjax.createRequest($('body'), 'changePassword', {
                    action: `${KEY}_change_password_ajax`,
                    data: formData,
                });
            }

            $(document).on('on:resSuccess', function (e, res, $el, requestName, data) {
                if (requestName === 'changePassword') {
                    $el[0].reset();
                }
            });

        });
    }

    // Show/hide password when the show password icon is clicked
    showPassword()
    {
        $('.showPassIcon').on('click', function (e) {
            let $this           = $(e.currentTarget),
                $target_element = $this.attr('data-target');
            $this.removeClass('bbc-eye1');
            $this.addClass('bbc-eye-off');
            if ($($target_element).attr('type') === 'password') {
                $($target_element).attr('type', 'text');
                $this.removeClass('bbc-eye-off');
                $this.addClass('bbc-eye1');
            } else {
                $($target_element).attr('type', 'password');
                $this.removeClass('bbc-eye1');
                $this.addClass('bbc-eye-off');
            }
        });
    }
}

// Create an instance of the NhAuthentication class
new NhAuthentication();
