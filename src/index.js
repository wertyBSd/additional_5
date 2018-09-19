module.exports = function check(str, bracketsConfig) {
  let itTrue = true;
  let bracketsObj = {};
  for (let i = 0; i < bracketsConfig.length; i++) {
    bracketsObj[bracketsConfig[i][1]] = bracketsConfig[i][0];
  }

  var check = (function(close) {
    var bracket = {},
      ch,
      end;
    console.log('close:'+close);
    for (i in close){
      bracket[close[i]] = (function(i) {
        console.log('i:'+i);
        return function(pos) {
          if (ch[pos + 1] == i) return pos + 2;
          else if (bracket[ch[(end = pos + 1)]])
            while ((end = bracket[ch[end]](end)))
              if (ch[end] == i) return end + 1;
          throw {};
        };
      })(i);
    };
    console.log('str:' + str);
    return function(str) {
      try {
        var pos = 0;
        console.log('str.length:' + str.length)
        while (pos < str.length) {
          console.log('pos:' + pos);
          console.log('ch:' + ch);
          pos = bracket[(ch = str)[pos]](pos);
        }
        return true;
      } catch (e) {
        return false;
      }
    };
  })(bracketsObj);
  itTrue = check(str);
  return itTrue;
};