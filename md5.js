﻿var Utf8 = require('jazor-encoding').utf8;
var HMAC = require('./hmac.js');
var l = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
var k = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
var m = function(r, q) {
	return (r << q) | (r >>> (32 - q))
};
var a = function(u, r) {
	var w, q, t, v, s;
	t = (u & 2147483648);
	v = (r & 2147483648);
	w = (u & 1073741824);
	q = (r & 1073741824);
	s = (u & 1073741823) + (r & 1073741823);
	if (w & q) {
		return (s ^ 2147483648 ^ t ^ v)
	}
	if (w | q) {
		if (s & 1073741824) {
			return (s ^ 3221225472 ^ t ^ v)
		} else {
			return (s ^ 1073741824 ^ t ^ v)
		}
	} else {
		return (s ^ t ^ v)
	}
};
var c = function(q, s, r) {
	return (q & s) | ((~q) & r)
};
var e = function(q, s, r) {
	return (q & r) | (s & (~r))
};
var g = function(q, s, r) {
	return (q ^ s ^ r)
};
var i = function(q, s, r) {
	return (s ^ (q | (~r)))
};
var d = function(s, r, w, v, q, t, u) {
	s = a(s, a(a(c(r, w, v), q), u));
	return a(m(s, t), r)
};
var f = function(s, r, w, v, q, t, u) {
	s = a(s, a(a(e(r, w, v), q), u));
	return a(m(s, t), r)
};
var h = function(s, r, w, v, q, t, u) {
	s = a(s, a(a(g(r, w, v), q), u));
	return a(m(s, t), r)
};
var j = function(s, r, w, v, q, t, u) {
	s = a(s, a(a(i(r, w, v), q), u));
	return a(m(s, t), r)
};
var b = function(t) {
	var x;
	var s = t.length;
	var r = s + 8;
	var w = (r - (r % 64)) / 64;
	var v = (w + 1) * 16;
	var y = Array(v - 1);
	var q = 0;
	var u = 0;
	while (u < s) {
		x = (u - (u % 4)) / 4;
		q = (u % 4) * 8;
		y[x] = (y[x] | (t[u] << q));
		u++
	}
	x = (u - (u % 4)) / 4;
	q = (u % 4) * 8;
	y[x] = y[x] | (128 << q);
	y[v - 2] = s << 3;
	y[v - 1] = s >>> 29;
	return y
};
var p = function(s) {
	var r = "",
		q;
	for (q = 0; q <= 3; q++) {
		r += l[(s >>> (q * 8)) & 255]
	}
	return r
};
var o = function(s) {
	var r = [],
		q;
	for (q = 0; q <= 3; q++) {
		r.push((s >>> (q * 8)) & 255)
	}
	return r
};
var n = function(M, ad) {
	ad = ad === true;
	var X = Array();
	var ai, aj, O, V, ah, W, U, N, G;
	var af = 7,
		ac = 12,
		aa = 17,
		Y = 22;
	var T = 5,
		H = 9,
		F = 14,
		ak = 20;
	var S = 4,
		R = 11,
		Q = 16,
		P = 23;
	var ag = 6,
		ae = 10,
		ab = 15,
		Z = 21;
	X = b(M);
	W = 1732584193;
	U = 4023233417;
	N = 2562383102;
	G = 271733878;
	var x = X.length;
	for (ai = 0; ai < x; ai += 16) {
		aj = W;
		O = U;
		V = N;
		ah = G;
		W = d(W, U, N, G, X[ai + 0], af, 3614090360);
		G = d(G, W, U, N, X[ai + 1], ac, 3905402710);
		N = d(N, G, W, U, X[ai + 2], aa, 606105819);
		U = d(U, N, G, W, X[ai + 3], Y, 3250441966);
		W = d(W, U, N, G, X[ai + 4], af, 4118548399);
		G = d(G, W, U, N, X[ai + 5], ac, 1200080426);
		N = d(N, G, W, U, X[ai + 6], aa, 2821735955);
		U = d(U, N, G, W, X[ai + 7], Y, 4249261313);
		W = d(W, U, N, G, X[ai + 8], af, 1770035416);
		G = d(G, W, U, N, X[ai + 9], ac, 2336552879);
		N = d(N, G, W, U, X[ai + 10], aa, 4294925233);
		U = d(U, N, G, W, X[ai + 11], Y, 2304563134);
		W = d(W, U, N, G, X[ai + 12], af, 1804603682);
		G = d(G, W, U, N, X[ai + 13], ac, 4254626195);
		N = d(N, G, W, U, X[ai + 14], aa, 2792965006);
		U = d(U, N, G, W, X[ai + 15], Y, 1236535329);
		W = f(W, U, N, G, X[ai + 1], T, 4129170786);
		G = f(G, W, U, N, X[ai + 6], H, 3225465664);
		N = f(N, G, W, U, X[ai + 11], F, 643717713);
		U = f(U, N, G, W, X[ai + 0], ak, 3921069994);
		W = f(W, U, N, G, X[ai + 5], T, 3593408605);
		G = f(G, W, U, N, X[ai + 10], H, 38016083);
		N = f(N, G, W, U, X[ai + 15], F, 3634488961);
		U = f(U, N, G, W, X[ai + 4], ak, 3889429448);
		W = f(W, U, N, G, X[ai + 9], T, 568446438);
		G = f(G, W, U, N, X[ai + 14], H, 3275163606);
		N = f(N, G, W, U, X[ai + 3], F, 4107603335);
		U = f(U, N, G, W, X[ai + 8], ak, 1163531501);
		W = f(W, U, N, G, X[ai + 13], T, 2850285829);
		G = f(G, W, U, N, X[ai + 2], H, 4243563512);
		N = f(N, G, W, U, X[ai + 7], F, 1735328473);
		U = f(U, N, G, W, X[ai + 12], ak, 2368359562);
		W = h(W, U, N, G, X[ai + 5], S, 4294588738);
		G = h(G, W, U, N, X[ai + 8], R, 2272392833);
		N = h(N, G, W, U, X[ai + 11], Q, 1839030562);
		U = h(U, N, G, W, X[ai + 14], P, 4259657740);
		W = h(W, U, N, G, X[ai + 1], S, 2763975236);
		G = h(G, W, U, N, X[ai + 4], R, 1272893353);
		N = h(N, G, W, U, X[ai + 7], Q, 4139469664);
		U = h(U, N, G, W, X[ai + 10], P, 3200236656);
		W = h(W, U, N, G, X[ai + 13], S, 681279174);
		G = h(G, W, U, N, X[ai + 0], R, 3936430074);
		N = h(N, G, W, U, X[ai + 3], Q, 3572445317);
		U = h(U, N, G, W, X[ai + 6], P, 76029189);
		W = h(W, U, N, G, X[ai + 9], S, 3654602809);
		G = h(G, W, U, N, X[ai + 12], R, 3873151461);
		N = h(N, G, W, U, X[ai + 15], Q, 530742520);
		U = h(U, N, G, W, X[ai + 2], P, 3299628645);
		W = j(W, U, N, G, X[ai + 0], ag, 4096336452);
		G = j(G, W, U, N, X[ai + 7], ae, 1126891415);
		N = j(N, G, W, U, X[ai + 14], ab, 2878612391);
		U = j(U, N, G, W, X[ai + 5], Z, 4237533241);
		W = j(W, U, N, G, X[ai + 12], ag, 1700485571);
		G = j(G, W, U, N, X[ai + 3], ae, 2399980690);
		N = j(N, G, W, U, X[ai + 10], ab, 4293915773);
		U = j(U, N, G, W, X[ai + 1], Z, 2240044497);
		W = j(W, U, N, G, X[ai + 8], ag, 1873313359);
		G = j(G, W, U, N, X[ai + 15], ae, 4264355552);
		N = j(N, G, W, U, X[ai + 6], ab, 2734768916);
		U = j(U, N, G, W, X[ai + 13], Z, 1309151649);
		W = j(W, U, N, G, X[ai + 4], ag, 4149444226);
		G = j(G, W, U, N, X[ai + 11], ae, 3174756917);
		N = j(N, G, W, U, X[ai + 2], ab, 718787259);
		U = j(U, N, G, W, X[ai + 9], Z, 3951481745);
		W = a(W, aj);
		U = a(U, O);
		N = a(N, V);
		G = a(G, ah)
	}
	if (ad) {
		return o(W).concat(o(U)).concat(o(N)).concat(o(G))
	} else {
		var I = p(W) + p(U) + p(N) + p(G);
		return I.toLowerCase()
	}
};
exports.MD5 = function(q, r) {
	if (typeof q == "string") {
		q = Utf8.getByteArray(q)
	}
	return n(q, r === true)
};
exports.HMACMD5 = function(q, r, s) {
	return HMAC(n, 64, q, r, s)
}