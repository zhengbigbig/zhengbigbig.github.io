// smooth-scroll
$.smoothScroll({
  //滑动到的位置的偏移量
  offset: 0,
  //滑动的方向，可取 'top' 或 'left'
  direction: 'top',
  // 只有当你想重写默认行为的时候才会用到
  scrollTarget: null,
  // 滑动开始前的回调函数。`this` 代表正在被滚动的元素
  beforeScroll: function () {
  },
  //滑动完成后的回调函数。 `this` 代表触发滑动的元素
  afterScroll: function () {
  },
  //缓动效果
  easing: 'swing',
  //滑动的速度
  speed: 700,
  // "自动" 加速的系数
  autoCoefficent: 2
});


// Bind the hashchange event listener
$(window).bind('hashchange', function (event) {
  $.smoothScroll({
    // Replace '#/' with '#' to go to the correct target
    offset: $("body").attr("data-offset") ? -$("body").attr("data-offset") : 0,
    // offset: -30,
    scrollTarget: decodeURI(location.hash.replace(/^\#\/?/, '#'))

  });
});

// $(".smooth-scroll").on('click', "a", function() {
$('a[href*="#"]')
  .bind('click', function (event) {
    // Remove '#' from the hash.
    var hash = this.hash.replace(/^#/, '')
    if (this.pathname === location.pathname && hash) {
      event.preventDefault();
      // Change '#' (removed above) to '#/' so it doesn't jump without the smooth scrolling
      location.hash = '#/' + hash;
    }
  });

// Trigger hashchange event on page load if there is a hash in the URL.
if (location.hash) {
  $(window).trigger('hashchange');
}

// // $('[data-spy="scroll"]').each(function () {
// //     var $spy = $(this).scrollspy('refresh')
// //   })

// $('[data-spy="scroll"]').on('activate.bs.scrollspy', function () {
//     // do something…
//     var offset = $('[data-spy="scroll"]').attr("data-offset")
//   })

$(".post-main-wrapper").append("<div id=\"content\"></div>")
$("#content").html(" <div class=\"hero\">\n" +
  "  <div class=\"demo the-look\">\n" +
  "  <img class=\"halftone\" src=\"img/p2.jpeg\" data-src=\"img/p2.jpeg\"/>\n" +
  "  </div>\n" +
  "  </div>");

var mouseTextSum = 0;
var mouseColorSum = 0;
$(document).ready(function ($) {
  $(".post-main-wrapper").click(function (e) {
    var textArr = new Array("️❤富强️❤", "❤民主❤", "❤文明❤", "❤和谐❤", "❤自由❤", "❤平等❤", "❤公正❤", "❤法治❤", "❤爱国❤", "❤敬业❤", "❤诚信❤", "❤友善❤");
    var colorArr = new Array("#ED2A27", "#F49E1E", "#FCEC23", "#63F831", "#3032E4", "#5E2CF4", "#832DF9");
    var $i = $("<span/>").text(textArr[mouseTextSum]);
    mouseTextSum = (mouseTextSum + 1) % textArr.length;
    mouseColorSum = (mouseColorSum + 1) % colorArr.length;
    var x = e.pageX,
      y = e.pageY,
      color = colorArr[mouseColorSum];
    $i.css({
      "z-index": 9999999,
      "top": y - 20,
      "left": x,
      "position": "absolute",
      "font-weight": "bold",
      "color": color
    });
    $("body").append($i);
    $i.animate({
        "top": y - 180,
        "opacity": 0
      },
      1500,
      function () {
        $i.remove();
      });
  });
});

// 粒子
!function () {
  var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

  var container;
  var camera, scene, renderer;

  var particles, particle, count = 0;

  var mouseX = 0, mouseY = 0;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  init();
  animate();

  function init() {

    // container = document.createElement( 'div' );
    // document.body.appendChild( container );
    container = document.querySelector('.post-main-wrapper');

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    particles = new Array();

    var PI2 = Math.PI * 2;
    var material = new THREE.ParticleCanvasMaterial({

      color: 0x5084CF,
      program: function (context) {

        context.beginPath();
        context.arc(0, 0, 1, 0, PI2, true);
        context.fill();

      }

    });

    var i = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {

      for (var iy = 0; iy < AMOUNTY; iy++) {

        particle = particles[i++] = new THREE.Particle(material);
        particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
        particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
        scene.add(particle);

      }

    }

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    //

    window.addEventListener('resize', onWindowResize, false);

  }

  function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

  }

//

  function onDocumentMouseMove(event) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

  }

  function onDocumentTouchStart(event) {

    if (event.touches.length === 1) {

      event.preventDefault();

      mouseX = event.touches[0].pageX - windowHalfX;
      mouseY = event.touches[0].pageY - windowHalfY;

    }

  }

  function onDocumentTouchMove(event) {

    if (event.touches.length === 1) {

      event.preventDefault();

      mouseX = event.touches[0].pageX - windowHalfX;
      mouseY = event.touches[0].pageY - windowHalfY;

    }

  }

//

  function animate() {

    requestAnimationFrame(animate);

    render();


  }

  function render() {

    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (-mouseY - camera.position.y) * .05;
    camera.lookAt(scene.position);

    var i = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {

      for (var iy = 0; iy < AMOUNTY; iy++) {

        particle = particles[i++];
        particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
        particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2;

      }

    }

    renderer.render(scene, camera);

    count += 0.1;

  }
}()
