document.addEventListener("DOMContentLoaded", () => {
	let elementon = 1; //tracks the timeline entry
	setInterval(() => {
		let position = document.getElementById("timeline" + (elementon + 1).toString()).offsetLeft; //calculate where to scroll
		document.getElementById("highlight").scrollTo({ left: position, behavior: "smooth" }); //scrolling
		elementon++; //go to the next one
		if (elementon >= document.querySelectorAll(".timelineentry").length) elementon = 0; //loop around
	}, 10000);
	let containerson = new Array(document.querySelectorAll(".subpage").length).fill(false); //track which images are opened
	function moveback(element, actualstart, start, end, time, i) { //move clip back to hide
		element.style.maskImage =
			"linear-gradient(112deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0)" + (100 - start).toString() + "%, var(--light2) 100%)";
		if (start >= end) return;
		setTimeout(moveback, 1, element, actualstart, start + (end - actualstart) / time, end, time, i);
	}
	function move(element, actualstart, start, end, time, i) { //move clip forward to show
		element.style.maskImage =
			"linear-gradient(112deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0)" + (100 - start).toString() + "%, var(--light2) 100%)";
		if (start <= end) return;
		setTimeout(move, 1, element, actualstart, start - (actualstart - end) / time, end, time, i);
	}
	document.querySelectorAll(".headerelement").forEach((e) => { //create links on the right side
		let newelement = document.createElement("a");
		newelement.href = "#" + e.innerHTML; //makes the link go to the subsection
		newelement.innerHTML = e.innerHTML;
		document.getElementById("scrollarea").appendChild(newelement);
	});
	let leeway = 100; //room for images to show earlier / hide later
	function tick() { //runs every frame
		document.querySelectorAll(".subpage").forEach((e, i) => {
			let rect = e.getBoundingClientRect();
			if (
				!(
					rect.top >=  0 - leeway &&
					rect.left >= 0 - leeway &&
					rect.bottom <= (window.innerHeight + leeway || document.documentElement.clientHeight + leeway) &&
					rect.right <= (window.innerWidth + leeway || document.documentElement.clientWidth + leeway)
				)
			) {
				if (!containerson[i]) move(document.getElementsByClassName("backgroundimage")[i], 70, 70, 0, 50, i); // call forward animation
				containerson[i] = true;
			} else {
				if (containerson[i]) moveback(document.getElementsByClassName("backgroundimage")[i], 0, 0, 70, 50, i); // call backward animation
				containerson[i] = false;
			}
		});
		window.requestAnimationFrame(tick);
	}
	window.requestAnimationFrame(tick);
});
