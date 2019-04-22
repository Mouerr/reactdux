export const checkFormValidity = (value, rules) => {
    let isValid = true;
    let input_value = value.trim();
    let errorMessage = [];

    if (!rules) {
        return true;
    }

    if (rules.required && input_value === '') {
        errorMessage.push('Field cannot be empty');
        isValid = false
    }

    if (rules.minLength && input_value.length < rules.minLength) {
        errorMessage.push('At least ' + rules.minLength + ' characters needed.');
        isValid = false
    }

    if (rules.maxLength && input_value.length > rules.maxLength) {
        errorMessage.push('You can\'t use more than ' + rules.maxLength + ' characters.');
        isValid = false
    }

    const email_pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (rules.isEmail && !email_pattern.test(input_value)) {
        errorMessage.push('Enter a valid email address');
        isValid = false
    }

    if (rules.isPassword) {
        let validated = true;

        if (input_value.length < 8 || input_value.length > 24) {
            errorMessage.push('should contain between 8 and 24 characters');
            validated = false;
        }
        if (!/\d/.test(input_value)) {
            errorMessage.push('should contain at least one digit');
            validated = false;
        }
        if (!/(?=.*[a-z])/.test(input_value)) {
            errorMessage.push('should contain at least one lower case');
            validated = false;
        }
        if (!/(?=.*[A-Z])/.test(input_value)) {
            errorMessage.push('should contain at least one upper case');
            validated = false;
        }
        if (!/(?=.*[#$^\-_+=!*()@%&])/.test(input_value)) {
            errorMessage.push('should contain at least one special character #$^\\-_+=!*()@%&');
            validated = false;
        }

        if (!validated) isValid = false
    }

    const ip_pattern = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
    if (rules.isIP && !ip_pattern.test(input_value)) {
        errorMessage.push('Enter a valid IP address');
        isValid = false
    }

    const numeric_pattern = /^\d+$/;
    if (rules.isNumeric && !numeric_pattern.test(input_value)) {
        errorMessage.push('Field must be Numeric');
        isValid = false
    }

    return {isValid: isValid, errorMessage: errorMessage};
};
