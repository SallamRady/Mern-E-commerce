/**
 * * Password must containt
 * * upper case letter
 * * lower case letter
 * * number
 * * length between 8-15
 * * have a special char: @.#$!%*?&
 * @param {*} password
 * @returns boolean is password is valid
 */
export default function IsValidPassword(password) {
  /**
   * * Password must containt
   * * upper case letter
   * * lower case letter
   * * number
   * * length between 8-15
   * * have a special char: @.#$!%*?&
   */
  let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  return String(password).match(regex);
}
