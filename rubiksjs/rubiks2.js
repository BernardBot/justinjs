cube_index = [
        00, 01,
        02, 03,
04, 05, 08, 09, 12, 13, 16, 17,
06, 07, 10, 11, 14, 15, 18, 19,
        20, 21,
        22, 23,
];

cube_colors = "abcdef";
cube_empty = ".";
cube_regex = new RegExp("[^abcdef.]", "gi");

cube_initial_str = `
  aa
  aa
bbccddee
bbccddee
  ff
  ff`;

cube_initial = parse_cube(cube_initial_str);
cube_g = parse_cube(cube_initial_str);

cube_position = [
              [2,0], [3,0],
              [2,1], [3,1],
[0,2], [1,2], [2,2], [3,2], [4,2], [5,2], [6,2], [7,2],
[0,3], [1,3], [2,3], [3,3], [4,3], [5,3], [6,3], [7,3],
              [2,4], [3,4],
              [2,5], [3,5],
];

function parse_cube(str) {
	var cube = [];
	const clean = str.replace(cube_regex, "");
	for (let i = 0; i < clean.length; i++) {
		cube[cube_index[i]] = cube_colors.indexOf(clean[i]);
	}
	return cube;
}

function print_cube(cube) {
	var str = "";
	for (let i = 0; i < cube.length; i++) {
		str += cube_colors[cube[cube_index[i]]];
	}
	return "\n  " + str.slice(00, 02) +
	       "\n  " + str.slice(02, 04) +
	       "\n"   + str.slice(04, 12) +
	       "\n"   + str.slice(12, 20) +
	       "\n  " + str.slice(20, 22) +
	       "\n  " + str.slice(22, 24);
}

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
size = 50;
canvas.width = size * 8;
canvas.height = size * 6;

cube_colormap = ["white", "green", "orange", "red", "blue", "yellow"];

function draw_cube(cube) {
	for (let i = 0; i < cube.length; i++) {
		ctx.fillStyle = cube_colormap[cube[cube_index[i]]];
		ctx.fillRect  (cube_position[i][0] * size, cube_position[i][1] * size, size, size);
		ctx.strokeRect(cube_position[i][0] * size, cube_position[i][1] * size, size, size);
	}
}

function is_solved(c) {
	return c[00] == 0 && c[01] == 0 && c[02] == 0 && c[03] == 0 &&
	       c[04] == 1 && c[05] == 1 && c[06] == 1 && c[07] == 1 &&
	       c[08] == 2 && c[09] == 2 && c[10] == 2 && c[11] == 2 &&
	       c[12] == 3 && c[13] == 3 && c[14] == 3 && c[15] == 3 &&
	       c[16] == 4 && c[17] == 4 && c[18] == 4 && c[19] == 4 &&
	       c[20] == 5 && c[21] == 5 && c[22] == 5 && c[23] == 5;
}

function L(c) {
	var t;
	t = c[00]; c[00] = c[19]; c[19] = c[20]; c[20] = c[08]; c[08] = t;
	t = c[02]; c[02] = c[17]; c[17] = c[22]; c[22] = c[10]; c[10] = t;
	t = c[04]; c[04] = c[06]; c[06] = c[07]; c[07] = c[05]; c[05] = t;
	return c;
}
function R(c) {
	var t;
	t = c[01]; c[01] = c[09]; c[09] = c[21]; c[21] = c[18]; c[18] = t;
	t = c[03]; c[03] = c[11]; c[11] = c[23]; c[23] = c[16]; c[16] = t;
	t = c[12]; c[12] = c[14]; c[14] = c[15]; c[15] = c[13]; c[13] = t;
	return c;
}
function U(c) {
	var t;
	t = c[04]; c[04] = c[08]; c[08] = c[12]; c[12] = c[16]; c[16] = t;
	t = c[05]; c[05] = c[09]; c[09] = c[13]; c[13] = c[17]; c[17] = t;
	t = c[00]; c[00] = c[02]; c[02] = c[03]; c[03] = c[01]; c[01] = t;
	return c;
}
function D(c) {
	var t;
	t = c[06]; c[06] = c[18]; c[18] = c[14]; c[14] = c[10]; c[10] = t;
	t = c[07]; c[07] = c[19]; c[19] = c[15]; c[15] = c[11]; c[11] = t;
	t = c[20]; c[20] = c[22]; c[22] = c[23]; c[23] = c[21]; c[21] = t;
	return c;
}
function F(c) {
	var t;
	t = c[02]; c[02] = c[07]; c[07] = c[21]; c[21] = c[12]; c[12] = t;
	t = c[03]; c[03] = c[05]; c[05] = c[20]; c[20] = c[14]; c[14] = t;
	t = c[08]; c[08] = c[10]; c[10] = c[11]; c[11] = c[09]; c[09] = t;
	return c;
}
function B(c) {
	var t;
	t = c[00]; c[00] = c[13]; c[13] = c[23]; c[23] = c[06]; c[06] = t;
	t = c[01]; c[01] = c[15]; c[15] = c[22]; c[22] = c[04]; c[04] = t;
	t = c[16]; c[16] = c[18]; c[18] = c[19]; c[19] = c[17]; c[17] = t;
	return c;
}

cube_moves6 = [L, R, U, D, F, B];

function shuffle_cube(c, n=5) {
	if (c == undefined) {
		c = cube_initial.slice();
	}
	for (let i = 0; i < n; i++) {
		const move = cube_moves6[Math.floor(Math.random() * cube_moves6.length)];
		console.log(move);
		move(c);
	}
	return c;
}

function hash_cube(cube) {
	var h = 0;
	for (let i = 0; i < 12; i++) {
		h |= cube[i] << (i * 3);
	}
	return h;
}

function lookup_cube(cube) {
	return cube_lookup[hash_cube(cube)][hash_cube(cube.slice(12))];
}

function setup_lookup() {
	cube_lookup = [];
	for (let i = 0; i < 6; i++) {
		if (!setup_lookup_helper(cube_initial.slice(), i, [])) {
			console.log("Found collision, retrying...");
			setup_lookup();
			return;
		}
	}
}

function setup_lookup_helper(c, d, s) {
	if (d < 1) {
		if (cube_lookup[hash_cube(c)]) {
			if (cube_lookup[hash_cube(c)][hash_cube(c.slice(12))]) {
				let t = c.slice();
				for (const move of cube_lookup[hash_cube(c)][hash_cube(c.slice(12))]) {
					move(t);
				}
				if (!is_solved(t)) {
					return false;
				}
			} else {
				cube_lookup[hash_cube(c)][hash_cube(c.slice(12))] = s.slice();
			}
		} else {
			cube_lookup[hash_cube(c)] = [];
			cube_lookup[hash_cube(c)][hash_cube(c.slice(12))] = s.slice();
		}
	} else {
		d--;
		for (let i = 0; i < 6; i++) {
			const move = cube_moves6[i];
			s.unshift(move);
			s.unshift(move);
			s.unshift(move);
			for (let j = 0; j < 3; j++) {
				move(c);
				if (!setup_lookup_helper(c, d, s)) {
					return false;
				}
				s.shift();
			}
			move(c);
		}
	}
	return true;
}

function solve_it(c) {
	for (let i = 0; i < 7; i++) {
		const solution = solve(c, i, i > 5);
		if (solution) {
			console.log("Found solution at depth: " + i);
			return solution;
		}
	}
	return false;
}

function solve(c, d, flag) {
	if (d < 1) {
		if (flag && cube_lookup[hash_cube(c)] && cube_lookup[hash_cube(c)][hash_cube(c.slice(12))]) {
			console.log("cock");
			console.log(print_cube(c));
			console.log(cube_lookup[hash_cube(c)]);
			return cube_lookup[hash_cube(c)][hash_cube(c.slice(12))];
		}
		if (c[00] == 0 && c[01] == 0 && c[02] == 0 && c[03] == 0 &&
		    c[04] == 1 && c[05] == 1 && c[06] == 1 && c[07] == 1 &&
		    c[08] == 2 && c[09] == 2 && c[10] == 2 && c[11] == 2 &&
		    c[12] == 3 && c[13] == 3 && c[14] == 3 && c[15] == 3 &&
		    c[16] == 4 && c[17] == 4 && c[18] == 4 && c[19] == 4 &&
		    c[20] == 5 && c[21] == 5 && c[22] == 5 && c[23] == 5) {
			return [];
		}
		return false;
	}

	d--;
	var t, s;

	t = c[00]; c[00] = c[19]; c[19] = c[20]; c[20] = c[08]; c[08] = t;
	t = c[02]; c[02] = c[17]; c[17] = c[22]; c[22] = c[10]; c[10] = t;
	t = c[04]; c[04] = c[06]; c[06] = c[07]; c[07] = c[05]; c[05] = t;
	s = solve(c, d, flag); if (s) return [L].concat(s);
	t = c[00]; c[00] = c[19]; c[19] = c[20]; c[20] = c[08]; c[08] = t;
	t = c[02]; c[02] = c[17]; c[17] = c[22]; c[22] = c[10]; c[10] = t;
	t = c[04]; c[04] = c[06]; c[06] = c[07]; c[07] = c[05]; c[05] = t;
	s = solve(c, d, flag); if (s) return [L,L].concat(s);
	t = c[00]; c[00] = c[19]; c[19] = c[20]; c[20] = c[08]; c[08] = t;
	t = c[02]; c[02] = c[17]; c[17] = c[22]; c[22] = c[10]; c[10] = t;
	t = c[04]; c[04] = c[06]; c[06] = c[07]; c[07] = c[05]; c[05] = t;
	s = solve(c, d, flag); if (s) return [L,L,L].concat(s);
	t = c[00]; c[00] = c[19]; c[19] = c[20]; c[20] = c[08]; c[08] = t;
	t = c[02]; c[02] = c[17]; c[17] = c[22]; c[22] = c[10]; c[10] = t;
	t = c[04]; c[04] = c[06]; c[06] = c[07]; c[07] = c[05]; c[05] = t;

	t = c[01]; c[01] = c[09]; c[09] = c[21]; c[21] = c[18]; c[18] = t;
	t = c[03]; c[03] = c[11]; c[11] = c[23]; c[23] = c[16]; c[16] = t;
	t = c[12]; c[12] = c[14]; c[14] = c[15]; c[15] = c[13]; c[13] = t;
	s = solve(c, d, flag); if (s) return [R].concat(s);
	t = c[01]; c[01] = c[09]; c[09] = c[21]; c[21] = c[18]; c[18] = t;
	t = c[03]; c[03] = c[11]; c[11] = c[23]; c[23] = c[16]; c[16] = t;
	t = c[12]; c[12] = c[14]; c[14] = c[15]; c[15] = c[13]; c[13] = t;
	s = solve(c, d, flag); if (s) return [R,R].concat(s);
	t = c[01]; c[01] = c[09]; c[09] = c[21]; c[21] = c[18]; c[18] = t;
	t = c[03]; c[03] = c[11]; c[11] = c[23]; c[23] = c[16]; c[16] = t;
	t = c[12]; c[12] = c[14]; c[14] = c[15]; c[15] = c[13]; c[13] = t;
	s = solve(c, d, flag); if (s) return [R,R,R].concat(s);
	t = c[01]; c[01] = c[09]; c[09] = c[21]; c[21] = c[18]; c[18] = t;
	t = c[03]; c[03] = c[11]; c[11] = c[23]; c[23] = c[16]; c[16] = t;
	t = c[12]; c[12] = c[14]; c[14] = c[15]; c[15] = c[13]; c[13] = t;

	t = c[04]; c[04] = c[08]; c[08] = c[12]; c[12] = c[16]; c[16] = t;
	t = c[05]; c[05] = c[09]; c[09] = c[13]; c[13] = c[17]; c[17] = t;
	t = c[00]; c[00] = c[02]; c[02] = c[03]; c[03] = c[01]; c[01] = t;
	s = solve(c, d, flag); if (s) return [U].concat(s);
	t = c[04]; c[04] = c[08]; c[08] = c[12]; c[12] = c[16]; c[16] = t;
	t = c[05]; c[05] = c[09]; c[09] = c[13]; c[13] = c[17]; c[17] = t;
	t = c[00]; c[00] = c[02]; c[02] = c[03]; c[03] = c[01]; c[01] = t;
	s = solve(c, d, flag); if (s) return [U,U].concat(s);
	t = c[04]; c[04] = c[08]; c[08] = c[12]; c[12] = c[16]; c[16] = t;
	t = c[05]; c[05] = c[09]; c[09] = c[13]; c[13] = c[17]; c[17] = t;
	t = c[00]; c[00] = c[02]; c[02] = c[03]; c[03] = c[01]; c[01] = t;
	s = solve(c, d, flag); if (s) return [U,U,U].concat(s);
	t = c[04]; c[04] = c[08]; c[08] = c[12]; c[12] = c[16]; c[16] = t;
	t = c[05]; c[05] = c[09]; c[09] = c[13]; c[13] = c[17]; c[17] = t;
	t = c[00]; c[00] = c[02]; c[02] = c[03]; c[03] = c[01]; c[01] = t;
	
	t = c[06]; c[06] = c[18]; c[18] = c[14]; c[14] = c[10]; c[10] = t;
	t = c[07]; c[07] = c[19]; c[19] = c[15]; c[15] = c[11]; c[11] = t;
	t = c[20]; c[20] = c[22]; c[22] = c[23]; c[23] = c[21]; c[21] = t;
	s = solve(c, d, flag); if (s) return [D].concat(s);
	t = c[06]; c[06] = c[18]; c[18] = c[14]; c[14] = c[10]; c[10] = t;
	t = c[07]; c[07] = c[19]; c[19] = c[15]; c[15] = c[11]; c[11] = t;
	t = c[20]; c[20] = c[22]; c[22] = c[23]; c[23] = c[21]; c[21] = t;
	s = solve(c, d, flag); if (s) return [D,D].concat(s);
	t = c[06]; c[06] = c[18]; c[18] = c[14]; c[14] = c[10]; c[10] = t;
	t = c[07]; c[07] = c[19]; c[19] = c[15]; c[15] = c[11]; c[11] = t;
	t = c[20]; c[20] = c[22]; c[22] = c[23]; c[23] = c[21]; c[21] = t;
	s = solve(c, d, flag); if (s) return [D,D,D].concat(s);
	t = c[06]; c[06] = c[18]; c[18] = c[14]; c[14] = c[10]; c[10] = t;
	t = c[07]; c[07] = c[19]; c[19] = c[15]; c[15] = c[11]; c[11] = t;
	t = c[20]; c[20] = c[22]; c[22] = c[23]; c[23] = c[21]; c[21] = t;

	t = c[02]; c[02] = c[07]; c[07] = c[21]; c[21] = c[12]; c[12] = t;
	t = c[03]; c[03] = c[05]; c[05] = c[20]; c[20] = c[14]; c[14] = t;
	t = c[08]; c[08] = c[10]; c[10] = c[11]; c[11] = c[09]; c[09] = t;
	s = solve(c, d, flag); if (s) return [F].concat(s);
	t = c[02]; c[02] = c[07]; c[07] = c[21]; c[21] = c[12]; c[12] = t;
	t = c[03]; c[03] = c[05]; c[05] = c[20]; c[20] = c[14]; c[14] = t;
	t = c[08]; c[08] = c[10]; c[10] = c[11]; c[11] = c[09]; c[09] = t;
	s = solve(c, d, flag); if (s) return [F,F].concat(s);
	t = c[02]; c[02] = c[07]; c[07] = c[21]; c[21] = c[12]; c[12] = t;
	t = c[03]; c[03] = c[05]; c[05] = c[20]; c[20] = c[14]; c[14] = t;
	t = c[08]; c[08] = c[10]; c[10] = c[11]; c[11] = c[09]; c[09] = t;
	s = solve(c, d, flag); if (s) return [F,F,F].concat(s);
	t = c[02]; c[02] = c[07]; c[07] = c[21]; c[21] = c[12]; c[12] = t;
	t = c[03]; c[03] = c[05]; c[05] = c[20]; c[20] = c[14]; c[14] = t;
	t = c[08]; c[08] = c[10]; c[10] = c[11]; c[11] = c[09]; c[09] = t;

	t = c[00]; c[00] = c[13]; c[13] = c[23]; c[23] = c[06]; c[06] = t;
	t = c[01]; c[01] = c[15]; c[15] = c[22]; c[22] = c[04]; c[04] = t;
	t = c[16]; c[16] = c[18]; c[18] = c[19]; c[19] = c[17]; c[17] = t;
	s = solve(c, d, flag); if (s) return [B].concat(s);
	t = c[00]; c[00] = c[13]; c[13] = c[23]; c[23] = c[06]; c[06] = t;
	t = c[01]; c[01] = c[15]; c[15] = c[22]; c[22] = c[04]; c[04] = t;
	t = c[16]; c[16] = c[18]; c[18] = c[19]; c[19] = c[17]; c[17] = t;
	s = solve(c, d, flag); if (s) return [B,B].concat(s);
	t = c[00]; c[00] = c[13]; c[13] = c[23]; c[23] = c[06]; c[06] = t;
	t = c[01]; c[01] = c[15]; c[15] = c[22]; c[22] = c[04]; c[04] = t;
	t = c[16]; c[16] = c[18]; c[18] = c[19]; c[19] = c[17]; c[17] = t;
	s = solve(c, d, flag); if (s) return [B,B,B].concat(s);
	t = c[00]; c[00] = c[13]; c[13] = c[23]; c[23] = c[06]; c[06] = t;
	t = c[01]; c[01] = c[15]; c[15] = c[22]; c[22] = c[04]; c[04] = t;
	t = c[16]; c[16] = c[18]; c[18] = c[19]; c[19] = c[17]; c[17] = t;

	return false;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

frame_duration = 300; // millis

async function animate(moves, cube) {
	draw_cube(cube);
	for (const move of moves) {
		draw_cube(move(cube));
		await sleep(frame_duration);
	}
}

function example(n) {
	const cube = shuffle_cube(cube_initial.slice(), n);
	const solution = solve_it(cube.slice());
	draw_cube(cube);
	if (solution) {
		console.log(solution);
		animate(solution, cube.slice());
	} else {
		console.log("NO solution found for depth");
	}
	return cube;
}

window.onload = function() {
	setup_lookup();
	draw_cube(cube_initial);
}
