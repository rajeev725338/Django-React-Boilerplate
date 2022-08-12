from djoser import email


class ActivationEmail(email.ActivationEmail):
    template_name = 'core/email/activation.html'


class PasswordResetEmail(email.PasswordResetEmail):
    template_name = 'core/email/password_reset.html'


class ConfirmationEmail(email.ConfirmationEmail):
    template_name = 'core/email/confirmation.html'


class PasswordChangedConfirmationEmail(email.PasswordChangedConfirmationEmail):
    template_name = 'core/email/password_changed_confirmation.html'


class UsernameChangedConfirmationEmail(email.UsernameChangedConfirmationEmail):
    template_name = 'core/email/username_changed_confirmation.html'


class UsernameResetEmail(email.UsernameResetEmail):
    template_name = 'core/email/username_reset.html'
