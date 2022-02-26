start_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
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
    
}

stk = [];
function push() { stk.push(print_fen()); }
function pop() { parse_fen(stk.pop()); }

function gen_moves() {
    let moves = [];
    return moves;
}

parse_fen(start_fen);
