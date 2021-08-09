const phoneRegex = new RegExp(/^((0)[1-8][0-9]{8})$/);
// eslint-disable-next-line
const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
// eslint-disable-next-line
const strongPasswordRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/);
// eslint-disable-next-line
const alphaRegex = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*) *$/);

export {
    alphaRegex,
    emailRegex,
    phoneRegex,
    strongPasswordRegex,
};