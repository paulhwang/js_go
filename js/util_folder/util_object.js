/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: UtilObject.js
 */

var LOG_IT = function (str1_val, str2_val) {
    window.console.log(str1_val + "() " + str2_val);
};

var ABEND = function (str1_val, str2_val) {
    window.console.log("***ABEND*** " + str1_val + "() " + str2_val);
    window.alert("***ABEND*** " + str1_val + "() " + str2_val);
    var x = junk;
};

