// OPERATORS 
//var num1 = 100; 
//var num2 = 10;

//console.log (num1 % num2);
// THEY ARE OF DIFFERENT TYPES, SUCH AS ARITHMETIC OPERATORS (+, -, *, /, %), ASSIGNMENT OPERATORS (=, +=, -=, *=, /=), COMPARISON OPERATORS (==, ===, !=, !==, >, <, >=, <=), LOGICAL OPERATORS (&&, ||, !), BITWISE OPERATORS (&, |, ^, ~, <<, >>), AND OTHER TYPES OF OPERATORS INCLUDE THE TERNARY OPERATOR (?:) AND THE TYPEOF OPERATOR. EACH OPERATOR HAS A SPECIFIC FUNCTION AND BEHAVIOR WHEN USED WITH VALUES OR VARIABLES.
// OPERATORS ARE SYMBOLS THAT PERFORM OPERATIONS ON VALUES AND VARIABLES. THEY CAN BE ARITHMETIC, ASSIGNMENT, COMPARISON, LOGICAL, BITWISE, OR OTHER TYPES OF OPERATORS. 
// VARIABLES
//var abc = 100;
//var abc = 200;

//console.log (abc);
// VARIABLES ARE CONTAINERS FOR STORING DATA VALUES.
// VARIABLES CAN BE DECLARED USING VAR, LET, OR CONST KEYWORD
// VAR: VARIABLES DECLARED WITH VAR CAN BE REASSIGNED AND REDECLARED. THEY ARE FUNCTION-SCOPED OR GLOBALLY SCOPED.
// LET: VARIABLES DECLARED WITH LET CAN BE REASSIGNED BUT NOT REDECLARED. THEY ARE BLOCK-SCOPED.
// CONST: VARIABLES DECLARED WITH CONST CANNOT BE REASSIGNED OR REDECLARED. THEY ARE BLOCK-SCOPED AND MUST BE INITIALIZED AT THE TIME OF DECLARATION.\

let hisage = 17
let hisstate = "Maharashtra"

var herage = 15
var herstate = "Gujarat"

var myage = 18
var mystate = "Odisha"
if (hisstate||herstate||mystate =="Maharashtra" || hisstate =="Gujarat" || hisstate =="Odisha" || hisstate =="Bihar" || hisstate =="Jharkhand" || hisstate =="Chhattisgarh" || hisstate =="Madhya Pradesh" || hisstate =="Uttar Pradesh" && hisage||herage||myage >= 16 ) {
    console.log ("He or She is eligible for driving license")
} 
else {
    console.log ("He or She is not eligible for driving license")
}