let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d")
canvas.style.zIndex = 999*999;
setup()
document.body.appendChild(canvas);

var tick = 0;
var flakes = [];
var piles = {};


SNOW_CONFIG = {max: 100000, no_pile: true}

function draw() {
	if (flakes.length >  (SNOW_CONFIG ?? 2000)) {location.reload()}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	tick++;
	for (var i=0;i<flakes.length;i++) {
		let flake = flakes[i]
		if (!flake) continue;
		if (!flake.done) {
			flake.h += flake.v
			flake.w = flake.ow + 10*Math.sin((tick+i) * Math.PI/180)
		}
		if (flake.h - canvas.height > canvas.height + 10) {
			piles[Math.round(flake.w)] = piles[Math.round(flake.w)]+1 | 0
			flake.h = canvas.height + canvas.height + 5 - 3*piles[Math.round(flake.w)]
			if (SNOW_CONFIG.no_pile) {
				delete flakes[i];
				flake.done = true;
			} else {
				flake.done = true;
			}
			newflake()
		}
		ctx.fillText("*", flake.w, flake.h - canvas.height)
	}
	requestAnimationFrame(draw)
}

function newflake() {
	flakes.push({
		ow:Math.round(canvas.width*Math.random()),
		h:canvas.height*Math.random(),
		v:1+ Math.random(),
		done: false
	})
}

for (var i=0;i<1000;i++) newflake()

requestAnimationFrame(draw)
function setup() {
	canvas.width = window.outerWidth;
	canvas.height = window.innerHeight;
	ctx.font = "20px monospace"
	ctx.fillStyle = "white";
}
window.onresize = setup
