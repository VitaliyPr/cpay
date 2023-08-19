export function pageWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}
$('.select select').niceSelect();

if(document.querySelector('.tabs')){
	// получаем массив всех вкладок
	const tabs = document.querySelectorAll(".tab");
	// получаем массив всех блоков с содержимым вкладок
	const contents = document.querySelectorAll(".content");

	// запускаем цикл для каждой вкладки и добавляем на неё событие
	for (let i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener("click", ( event ) => {

			// сначала нам нужно удалить активный класс именно с вкладок
			let tabsChildren = event.target.parentElement.children;
			for (let t = 0; t < tabsChildren.length; t++) {
				tabsChildren[t].classList.remove("tab--active");
			}
			// добавляем активный класс
			tabs[i].classList.add("tab--active");
			// теперь нужно удалить активный класс с блоков содержимого вкладок
			let tabContentChildren = event.target.parentElement.nextElementSibling.children;
			for (let c = 0; c < tabContentChildren.length; c++) {
				tabContentChildren[c].classList.remove("content--active");
			}
			// добавляем активный класс
			contents[i].classList.add("content--active");

		});
	}
};


$('.select').on('change', function() {
  $(this).addClass('--active')
  var element = $(this).find('.selected').css('background-image');

  $(this).find('.current').css('background-image', element)
});

$('#wallet').on('change', function() {
  // $('input[type=submit]').prop('disabled', false);
  $('.submit_btn').removeClass('disabled')
  $(this).parent().addClass('select_wallet--active')
});

jQuery(document).ready(function($){
  $('#invoice_btn').click(function() {
    var $invoice_copy = $('#invoice_copy');
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($invoice_copy.text()).select();
    document.execCommand("copy");
    $temp.remove();
    $('#invoice__mess').fadeIn(400);
    setTimeout(function(){$('#invoice__mess').fadeOut(400);},4000);
  });
  $('#total_btn').click(function() {
    var $total_copy = $('#total_copy');
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($total_copy.text()).select();
    document.execCommand("copy");
    $temp.remove();
    $('#total__mess').fadeIn(400);
    setTimeout(function(){$('#total__mess').fadeOut(400);},4000);
  });
  $('#address_btn').click(function() {
    var $address_copy = $('#address_copy');
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($address_copy.text()).select();
    document.execCommand("copy");
    $temp.remove();
    $('#address__mess').fadeIn(400);
    setTimeout(function(){$('#address__mess').fadeOut(400);},4000);
  });
});


// Timer
if(document.querySelector('.cpay__timer')){


  //circle start
  let progressBar = document.querySelector('.e-c-progress');
  let length = Math.PI * 2 * 100;
  progressBar.style.strokeDasharray = length;

  function update(value, timePercent) {
    var offset = - length - length * value / (timePercent);
    progressBar.style.strokeDashoffset = offset; 
  };
  
  //circle ends
  const displayOutput = document.querySelector('.cpay__timer_time')

  let intervalTimer;
  let timeLeft;
  let wholeTime = 600; // Встановлюється час таймера
  let isStarted = true;

  update(wholeTime,wholeTime); //refreshes progress bar
  displayTimeLeft(wholeTime);

  function timer (seconds){ //counts time, takes seconds
    let remainTime = Date.now() + (seconds * 1000);
    displayTimeLeft(seconds);
    
    intervalTimer = setInterval(function(){
      timeLeft = Math.round((remainTime - Date.now()) / 1000);
      if(timeLeft < 0){
        clearInterval(intervalTimer);
        isStarted = false;
        displayTimeLeft(wholeTime);
        return ;
      }
      displayTimeLeft(timeLeft);
    }, 1000);
  }
  $(document).ready(function() {
    $('.cpay__timer').show();
    pauseTimer();
  });
  function pauseTimer(event){
    if(isStarted === false){
      timer(wholeTime);
      isStarted = true;
    } else {
      clearInterval(intervalTimer);
      displayTimeLeft(wholeTime);
      timer(wholeTime);
      isStarted = true;
    }
  }
  function displayTimeLeft (timeLeft){ //displays time on the input
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    displayOutput.textContent = displayString;
    update(timeLeft, wholeTime);
  }
  $('#crypto').on('change', function() {
    pauseTimer();
  });
  $('#network').on('change', function() {
    pauseTimer();
  });
};

$(document).ready(function() {
  setTimeout(function(){
    $('.cookie').show();
  },5000)
});

$("#cookie_decline").click(function () {
  $('.cookie').hide();
});
$("#cookie_allow").click(function () {
  $('.cookie').hide();
});

$.fancybox.defaults.closeExisting = true;
$.fancybox.defaults.autoFocus = false;

$( "#login_form" ).validate({
  errorElement: "span",
  rules: {
    login_email: {
      required: true,
      email: true,
    },
    login_password: {
      required: true,
      minlength: 6,
    }
  },
  messages: {
    login_email: {
      required: "Error text",
      email: "Error text",
    },
    login_password: {
      required: "Error text",
      minlength: "Error text",
    }
  }
});
$( "#signup_form" ).validate({
  errorElement: "span",
  rules: {
    signup_name: {
      required: true,
    },
    signup_email: {
      required: true,
      email: true,
    },
    signup_password: {
      required: true,
      minlength: 6,
    }
  },
  messages: {
    signup_name: {
      required: "Error text",
    },
    signup_email: {
      required: "Error text",
      email: "Error text",
    },
    signup_password: {
      required: "Error text",
      minlength: "Error text",
    }
  }
});
$( "#forgot_form" ).validate({
  errorElement: "span",
  rules: {
    forgot_email: {
      required: true,
      email: true,
    }
  },
  messages: {
    forgot_email: {
      required: "Error text",
      email: "Error text",
    }
  }
});

$("#login_show").click(function () {
  var x = document.getElementById("login_password");
  if (x.type === "password") {
    x.type = "text";
    $(this).text('Hide');
  } else {
    x.type = "password";
    $(this).text('Show');
  }
});

$("#signup_show").click(function () {
  var x = document.getElementById("signup_password");
  if (x.type === "password") {
    x.type = "text";
    $(this).text('Hide');
  } else {
    x.type = "password";
    $(this).text('Show');
  }
});
$("#reset_show").click(function () {
  var x = document.getElementById("reset_password");
  if (x.type === "password") {
    x.type = "text";
    $(this).text('Hide');
  } else {
    x.type = "password";
    $(this).text('Show');
  }
});
$("#reset_show2").click(function () {
  var x = document.getElementById("reset_password2");
  if (x.type === "password") {
    x.type = "text";
    $(this).text('Hide');
  } else {
    x.type = "password";
    $(this).text('Show');
  }
});



var content = document.getElementById('content');

// content.oninput = function() {

//   if (!content.value == '') {
//     $(this).addClass('not-empty')
//   } else {
//     $(this).removeClass('not-empty')
//   }
// };

if(document.querySelector('.cpay')){
  content.addEventListener('input', onInput)

  function onInput(evt){
  const length = evt.target.value.length

    if (!content.value == '') {
      $(this).addClass('not-empty')
    } else {
      $(this).removeClass('not-empty')
    }
    if (length > 42) {
      content.classList.add('error')
    } else {
      content.classList.remove('error')
    }
  }
};


$("#reset_btn").click(function () {
  $(this).parent().addClass('load');
  setTimeout (function(){
    $("#reset_btn").parent().removeClass('load');
    console.log("HI")
  }, 3000);
});

const inputFile = document.querySelectorAll(".upload-file__input");

/////////// Кнопка «Прикрепить файл» ///////////
inputFile.forEach(function (el) {
  let textSelector = document.querySelector(".upload-file__text");
  let fileList;

  // Событие выбора файла(ов)
  el.addEventListener("change", function (e) {

    // создаём массив файлов
    fileList = [];
    for (let i = 0; i < el.files.length; i++) {
      fileList.push(el.files[i]);
    }

    // вызов функции для каждого файла
    fileList.forEach(file => {
      uploadFile(file);
    });
  });

  // Проверяем размер файлов и выводим название
  const uploadFile = (file) => {

    // файла <5 Мб
    if (file.size > 5 * 1024 * 1024) {
      alert("Файл должен быть не более 5 МБ.");
      return;
    }

    // Показ загружаемых файлов
    if (file && file.length > 1) {
      if (file.length <= 4) {
        textSelector.textContent = `Выбрано ${file.length} файла`;
      }
      if (file.length > 4) {
        textSelector.textContent = `Выбрано ${file.length} файлов`;
      }
    } else {
      textSelector.textContent = file.name;
    }
  }
});