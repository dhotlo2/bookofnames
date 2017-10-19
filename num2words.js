function encode(n) {
        var str = "";

        do {
                str += String.fromCharCode((parseInt(n.mod(26).toString()))+'a'.charCodeAt(0))
                n = n.div(26);
        } while(n.gt(1));

        return str;
}

function decantor(n) {
        var t = n.times(8).plus(1).sqrt().plus(-1).div(2).round(0, 0)
        var x = t.times(t.plus(3)).div(2).minus(n);
        var y = n.minus(t.times(t.plus(1)).div(2));

        return [x, y];
}

function n2w(n) {
        n = decantor(n);
        var a, b;
        a = n[0]; b = n[1];

        return [encode(a), encode(b)];
}

function decode(w) {
        var n = new Big(0);

        for (var i=0;i<w.length;i++) {
                var digit = w.charCodeAt(i);
                digit -= 'a'.charCodeAt(0);
  	
                n = n.plus(new Big(digit).times(new Big(26).pow(i)));  
        }

        return n;
}

function cantor(x, y) {
        return x.plus(y).times(x.plus(y).plus(1)).div(2).plus(y);
}

function w2n(a, b) {
        return cantor(decode(a), decode(b))
}

function wordsToNumber() {
        var words = document.getElementById("words").value.split(" ");
        var number = w2n(words[0], words[1]);

        document.getElementById("number").value = number.toFixed();
}

function numberToWords() {
        var number = new Big(document.getElementById("number").value);
        var words = n2w(number);

        console.log(words);

        document.getElementById("words").value = words[0]+" "+words[1];
}

