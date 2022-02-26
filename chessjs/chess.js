start_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
kiwi_fen = "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1";
N = -10, S = 10, E = 1, W = -1;
A1 = 91, H1 = 98, A8 = 21, H8 = 28;
start_sq = A8, end_sq = H1 + 1;
dir = {
    "k" : [N,S,E,W,N+E,N+W,S+E,S+W],
    "q" : [N,S,E,W,N+E,N+W,S+E,S+W],
    "r" : [N,S,E,W],
    "b" :         [N+E,N+W,S+E,S+W],
    "n" : [N+E+E,N+N+E,N+W+W,N+N+W,
           S+E+E,S+S+E,S+W+W,S+S+W],
};
files = "abcdefgh";
ranks = "12345678";
wpieces = "PNBRQK";
bpieces = "pnbrqk";
empty = ".";
offside = " \n";
function parse_fen(fen) {
    [plc, clr, ctl, esq, hlf, fll] = fen.split(" ");
    brd = "         \n         \n " +
        plc.replaceAll("/", "\n ")
        .replaceAll("8", "........")
        .replaceAll("7", ".......")
        .replaceAll("6", "......")
        .replaceAll("5", ".....")
        .replaceAll("4", "....")
        .replaceAll("3", "...")
        .replaceAll("2", "..")
        .replaceAll("1", ".") +
        "\n         \n         \n";
    hlf = parseInt(hlf);
    fll = parseInt(fll);
}
function print_fen() {
    plc = brd.slice(start_sq, end_sq)
        .replaceAll("\n ", "/")
        .replaceAll("........", "8")
        .replaceAll(".......", "7")
        .replaceAll("......", "6")
        .replaceAll(".....", "5")
        .replaceAll("....", "4")
        .replaceAll("...", "3")
        .replaceAll("..", "2")
        .replaceAll(".", "1");
    return [plc, clr, ctl, esq, hlf, fll].join(" ");
}
function parse_file(file) { return files.indexOf(file); }
function print_file(i) { return files[i]; }
function parse_rank(rank) { return ranks.indexOf(rank); }
function print_rank(i) { return ranks[i]; }
function parse_sq(sq) {
    let f = parse_file(sq[0]);
    let r = parse_rank(sq[1]);
    return A1 + f + N * r;
}
function print_sq(i) {
    let f = print_file(i % 10 - 1);
    let r = print_rank(9 - Math.floor(i / 10));
    return f + r;
}
function parse_move(move) {
    return [parse_sq(move), parse_sq(move.slice(2))];
}
function print_move(m) {
    return print_sq(m[0]) + print_sq(m[1]);
}

stk = [];
function push() { stk.push(print_fen()); }
function pop() { parse_fen(stk.pop()); }

function do_move(m) {
    push();
    let [fr, to] = m;
    let piece = brd[fr];
    brd = brd.slice(0, fr) + empty + brd.slice(fr + 1);
    brd = brd.slice(0, to) + piece + brd.slice(to + 1);
    clr = clr == "w" ? "b" : "w";
    // TODO: update other pos params
}
function undo_move() {
    pop();
}

// TODO: legal moves
function gen_moves() {
    let i, j, p, q, t, d;
    let moves = [];
    if (clr == "w") {
        var us = wpieces, them = bpieces, F = N, start_rank = 8;
    } else {
        var us = bpieces, them = wpieces, F = S, start_rank = 3;
    }
    // TODO: castling moves
    for (i = start_sq; i < end_sq; i++) {
        p = brd[i];
        if (!us.includes(p)) { continue; }
        t = p.toLowerCase();
        if (t == "p") {
            // TODO: pawn moves
            for (d of [E, W]) {
                j = i + F + d;
                q = brd[j];
                if (them.includes(q) || j == esq) {
                    moves.push([i, j]);
                }
            }

            j = i + F;
            q = brd[j];
            if (q == empty) {
                moves.push([i, j]);
                j = i + F + F;
                q = brd[j];
                if (q == empty && Math.floor(i / 10) == start_rank) {
                    moves.push([i, j]);
                    // set enpassant square
                    esq = j - F;
                }
            }
        } else {
            for (d of dir[t]) {
                for (j = i + d; ; j += d) {
                    q = brd[j];
                    if (us.includes(q)) { break; }
                    if (offside.includes(q)) { break; }
                    moves.push([i, j]);
                    if (them.includes(q)) { break; }
                    if ("nk".includes(t)) { break; }
                }
            }
        }
    }
    return moves;
}

parse_fen(start_fen);
