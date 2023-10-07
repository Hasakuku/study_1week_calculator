
const buttons = document.querySelectorAll("button");
const input = document.getElementById("input");

let calculateFinish = false; // 계산완료 여부
let resultOut = ""; // 계산식
let result = 0; // 결과
const operators = { //연산자
   "+": (a, b) => a + b,
   "-": (a, b) => a - b,
   "×": (a, b) => a * b,
   "÷": (a, b) => a / b,
   "%": (a) => a / 100,
   "√": (a) => Math.sqrt(a), // 제곱근 기능 추가
   "⁻": (a) => 1 / a, // 역수 연산 추가
   "^": (a, b) => Math.pow(a, b), // 제곱 수 추가 
};

buttons.forEach((button) => {
   button.addEventListener("click", (event) => {
      const buttonText = event.target.textContent; // 버튼의 text 
      switch (buttonText) {
         case "=": // try catch 문써서 error 나타내보기
            try {
               const [btn1, operator, btn2] = resultOut.split(/([+\-×÷%√^⁻])/); // 연산자와 숫자(btn1, btn2) 분리
               const calculate = operators[operator]; // 연산자 함수

               result = calculate(Number(btn1), Number(btn2)); // 연산자 함수 사용
               input.textContent = result; // 결과를 계산
               resultOut = String(result); // 계산창
               calculateFinish = true;
            }
            catch (error) {
               if (resultOut.length < 3 || isNaN(result) || !isFinite(result)) { result.error(); }
               resultOut = "error"; // error 발생시 계산창 초기화
               input.textContent = resultOut; // 계산시 초기화
            }
            break;

         case "C":
            resultOut = "";
            result = 0;
            input.textContent = resultOut;
            break;

         case "π":
            if (resultOut === "") {
               resultOut = 3.1415926535897932384
               input.textContent = resultOut;
            } else {
               resultOut = resultOut * 3.1415926535897932384
               input.textContent = resultOut;
            }
            break;

         case "←":
            resultOut = resultOut.slice(0, -1); // 마지막으로 입력한 숫자 삭제
            input.textContent = resultOut;
            break;

         case "±":
            resultOut = String(-1 * Number(resultOut)); // 숫자 등호 바꾸기
            input.textContent = resultOut;
            break;

         default:
            if (calculateFinish && isNaN(buttonText)) { // 계산이 완료되었고, 새로운 연산자가 입력된 경우
               calculateFinish = false;
               resultOut += buttonText;
               input.textContent = resultOut;
           } else if (calculateFinish && !isNaN(buttonText)) { // 계산이 완료되었고, 새로운 숫자가 입력된 경우
               calculateFinish = false;
               resultOut = "";
               resultOut += buttonText;
               input.textContent = resultOut;
           } else {
               resultOut += buttonText;
               input.textContent = resultOut;
           }
      }
   });
});

//^ 다른 버튼 구현
//* % 버튼에 다른 연산은 실행 안됨
//~ 결과값에 연산하려 하면 실행 안됨
//? 3개이상의 연산은 실행이 안됨
//! 점(.) 버튼을 누르면 하나만 나오는게 아니라 연속으로 결과창에 나옴