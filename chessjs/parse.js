"use strict";

const start_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const start_board = `
**********
**********
*rnbqkbnr*
*pppppppp*
*........*
*........*
*........*
*........*
*PPPPPPPP*
*RNBQKBNR*
**********
**********
`.trim().split("\n").join("");

const N = -10, S = 10, E = 1, W = -1;

const rank_strings = "87654321";
const file_strings = "abcdefgh";
const white_piece_string = "PNBRQK";
const black_piece_string = "pnbrqk";
const piece_strings = "KQRBNPkqrbnp";
const color_strings = "wb";
const castling_strings = "KQkq";

const squares = [
    21, 22, 23, 24, 25, 26, 27, 28,
    31, 32, 33, 34, 35, 36, 37, 38,
    41, 42, 43, 44, 45, 46, 47, 48,
    51, 52, 53, 54, 55, 56, 57, 58,
    61, 62, 63, 64, 65, 66, 67, 68,
    71, 72, 73, 74, 75, 76, 77, 78,
    81, 82, 83, 84, 85, 86, 87, 88,
    91, 92, 93, 94, 95, 96, 97, 98,
];

const [
    a8, b8, c8, d8, e8, f8, g8, h8,
    a7, b7, c7, d7, e7, f7, g7, h7,
    a6, b6, c6, d6, e6, f6, g6, h6,
    a5, b5, c5, d5, e5, f5, g5, h5,
    a4, b4, c4, d4, e4, f4, g4, h4,
    a3, b3, c3, d3, e3, f3, g3, h3,
    a2, b2, c2, d2, e2, f2, g2, h2,
    a1, b1, c1, d1, e1, f1, g1, h1,
] = squares;

const strings2squares = {
    "a8" : 21, "b8" : 22, "c8" : 23, "d8" : 24, "e8" : 25, "f8" : 26, "g8" : 27, "h8" : 28,
    "a7" : 31, "b7" : 32, "c7" : 33, "d7" : 34, "e7" : 35, "f7" : 36, "g7" : 37, "h7" : 38,
    "a6" : 41, "b6" : 42, "c6" : 43, "d6" : 44, "e6" : 45, "f6" : 46, "g6" : 47, "h6" : 48,
    "a5" : 51, "b5" : 52, "c5" : 53, "d5" : 54, "e5" : 55, "f5" : 56, "g5" : 57, "h5" : 58,
    "a4" : 61, "b4" : 62, "c4" : 63, "d4" : 64, "e4" : 65, "f4" : 66, "g4" : 67, "h4" : 68,
    "a3" : 71, "b3" : 72, "c3" : 73, "d3" : 74, "e3" : 75, "f3" : 76, "g3" : 77, "h3" : 78,
    "a2" : 81, "b2" : 82, "c2" : 83, "d2" : 84, "e2" : 85, "f2" : 86, "g2" : 87, "h2" : 88,
    "a1" : 91, "b1" : 92, "c1" : 93, "d1" : 94, "e1" : 95, "f1" : 96, "g1" : 97, "h1" : 98,
};

const squares2string = {
    21 : "a8", 22 : "b8", 23 : "c8", 24 : "d8", 25 : "e8", 26 : "f8", 27 : "g8", 28 : "h8",
    31 : "a7", 32 : "b7", 33 : "c7", 34 : "d7", 35 : "e7", 36 : "f7", 37 : "g7", 38 : "h7",
    41 : "a6", 42 : "b6", 43 : "c6", 44 : "d6", 45 : "e6", 46 : "f6", 47 : "g6", 48 : "h6",
    51 : "a5", 52 : "b5", 53 : "c5", 54 : "d5", 55 : "e5", 56 : "f5", 57 : "g5", 58 : "h5",
    61 : "a4", 62 : "b4", 63 : "c4", 64 : "d4", 65 : "e4", 66 : "f4", 67 : "g4", 68 : "h4",
    71 : "a3", 72 : "b3", 73 : "c3", 74 : "d3", 75 : "e3", 76 : "f3", 77 : "g3", 78 : "h3",
    81 : "a2", 82 : "b2", 83 : "c2", 84 : "d2", 85 : "e2", 86 : "f2", 87 : "g2", 88 : "h2",
    91 : "a1", 92 : "b1", 93 : "c1", 94 : "d1", 95 : "e1", 96 : "f1", 97 : "g1", 98 : "h1",
};

function parse_fen(fen) {
    const [_board, color, castling, _enpassant, _halfmove, _fullmove] = fen.split(" ");
    
    var board = "*".repeat(21);
    
    for (const c of _board) {
        if (c == "/") {
            board += "**";
        } else if (rank_strings.includes(c)) {
            board += ".".repeat(c);
        } else {
            board += c;
        }
    }
    
    board += "*".repeat(21);
    
    const enpassant = strings2squares[_enpassant] || "-";
    const halfmove = parseInt(_halfmove);
    const fullmove = parseInt(_fullmove);
    
    return { board, color, castling, enpassant, halfmove, fullmove };
}

function print_fen(pos) {
    const _board = pos.board;
    
    var board = "";
    
    for (let i = 0; i < 64; i++) {
        const j = squares[i];
        const c = _board[j];
        
        if (c == ".") {
            let k = 0;
            while (_board[j + k] == ".") {
                k++;
            }
            board += k;
            i += k - 1;
        } else {
            board += c;
        }
        
        if (i % 8 == 7 && i != 63) {
            board += "/";
        }
    }
    
    const color = pos.color;
    const castling = pos.castling;
    const enpassant = squares2string[pos.enpassant] || "-";
    const halfmove = pos.halfmove;
    const fullmove = pos.fullmove;
    
    return [board, color, castling, enpassant, halfmove, fullmove].join(" ");
}
