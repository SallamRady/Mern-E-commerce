/**
 * 
 * @param {*} value input field value
 * @returns boolean true if value is nor empty else false
 */
export default function IsRequired(value){
    return value.trim().length != 0;
}