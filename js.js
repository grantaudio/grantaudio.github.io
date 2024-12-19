document.addEventListener("DOMContentLoaded", () => {
	let elementon = 1;
	setInterval(() => {
		let position = document.getElementById("timeline" + (elementon + 1).toString()).offsetLeft;
		document.getElementById("highlight").scrollTo({ left: position, behavior: "smooth" });
		elementon++;
		if (elementon >= document.querySelectorAll(".timelineentry").length) elementon = 0;
	}, 10000);
	let containerson = new Array(document.querySelectorAll(".subpage").length).fill(false);
	function moveback(element, actualstart, start, end, time, i) {
		element.style.maskImage =
			"linear-gradient(112deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0)" + (100 - start).toString() + "%, var(--light2) 100%)";
		if (start >= end) return;
		setTimeout(moveback, 1, element, actualstart, start + (end - actualstart) / time, end, time, i);
	}
	function move(element, actualstart, start, end, time, i) {
		element.style.maskImage =
			"linear-gradient(112deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0)" + (100 - start).toString() + "%, var(--light2) 100%)";
		if (start <= end) return;
		setTimeout(move, 1, element, actualstart, start - (actualstart - end) / time, end, time, i);
	}
	document.querySelectorAll(".headerelement").forEach((e) => {
		let newelement = document.createElement("a");
		newelement.href = "#" + e.innerHTML;
		newelement.innerHTML = e.innerHTML;
		document.getElementById("scrollarea").appendChild(newelement);
	});
	function tick() {
		document.querySelectorAll(".subpage").forEach((e, i) => {
			let rect = e.getBoundingClientRect();
			if (
				!(
					rect.top >= 0 &&
					rect.left >= 0 &&
					rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
					rect.right <= (window.innerWidth || document.documentElement.clientWidth)
				)
			) {
				if (!containerson[i]) move(document.getElementsByClassName("backgroundimage")[i], 70, 70, 0, 50, i);
				containerson[i] = true;
			} else {
				if (containerson[i]) moveback(document.getElementsByClassName("backgroundimage")[i], 0, 0, 70, 50, i);
				containerson[i] = false;
			}
		});
		window.requestAnimationFrame(tick);
	}
	window.requestAnimationFrame(tick);
});
