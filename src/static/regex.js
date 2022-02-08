import passwordValidator from 'password-validator';

const phoneRegex = new RegExp(/^((0)[1-8][0-9]{8}) *$/);
// eslint-disable-next-line
const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
// eslint-disable-next-line
// const strongPasswordRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/);
const strongPasswordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
// eslint-disable-next-line
const alphaRegex = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*) *$/);

// const email = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9-_\.]+@([a-zA-Z]|[a-zA-Z0-9]?[a-zA-Z0-9-]+[a-zA-Z0-9])\.[a-zA-Z0-9]{2,10}(?:\.[a-zA-Z]{2,10})?$/)
const fiatCurrencyRegex = new RegExp(/^(\$?\d{1,3}(?:,?\d{3})*(?:\.\d{2})?|\.\d{2})?$/);
const numberRegex = new RegExp(/^[0-9]*$/);


const passwordValidationSchema = new passwordValidator();
// Password validation schema
passwordValidationSchema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 1 digit
    .has().symbols(1)                                // Should have atleast one special character
    .has().not().spaces()                           // Should not have spaces
// .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

export {
    alphaRegex,
    emailRegex,
    phoneRegex,
    strongPasswordRegex,
    fiatCurrencyRegex,
    numberRegex,
    passwordValidationSchema
};