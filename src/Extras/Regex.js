export default {
  phoneRegex: /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm,
  emailRegex: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
  passwordRegex:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};