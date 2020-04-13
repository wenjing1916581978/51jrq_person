"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
* DES加密/解密
* @Copyright Copyright (c) 2006
* @author Guapo
* @see DESCore
*/

/*
* encrypt the string to string made up of hex
* return the encrypted string
*/
function strEnc(data, firstKey, secondKey, thirdKey) {

  var leng = data.length;
  var encData = "";
  var firstKeyBt, secondKeyBt, thirdKeyBt, firstLength, secondLength, thirdLength;
  if (firstKey != null && firstKey != "") {
    firstKeyBt = getKeyBytes(firstKey);
    firstLength = firstKeyBt.length;
  }
  if (secondKey != null && secondKey != "") {
    secondKeyBt = getKeyBytes(secondKey);
    secondLength = secondKeyBt.length;
  }
  if (thirdKey != null && thirdKey != "") {
    thirdKeyBt = getKeyBytes(thirdKey);
    thirdLength = thirdKeyBt.length;
  }

  if (leng > 0) {
    if (leng < 4) {
      var bt = strToBt(data);
      var encByte;
      if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != "") {
        var tempBt;
        var x, y, z;
        tempBt = bt;
        for (x = 0; x < firstLength; x++) {
          tempBt = enc(tempBt, firstKeyBt[x]);
        }
        for (y = 0; y < secondLength; y++) {
          tempBt = enc(tempBt, secondKeyBt[y]);
        }
        for (z = 0; z < thirdLength; z++) {
          tempBt = enc(tempBt, thirdKeyBt[z]);
        }
        encByte = tempBt;
      } else {
        if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "") {
          var tempBt;
          var x, y;
          tempBt = bt;
          for (x = 0; x < firstLength; x++) {
            tempBt = enc(tempBt, firstKeyBt[x]);
          }
          for (y = 0; y < secondLength; y++) {
            tempBt = enc(tempBt, secondKeyBt[y]);
          }
          encByte = tempBt;
        } else {
          if (firstKey != null && firstKey != "") {
            var tempBt;
            var x = 0;
            tempBt = bt;
            for (x = 0; x < firstLength; x++) {
              tempBt = enc(tempBt, firstKeyBt[x]);
            }
            encByte = tempBt;
          }
        }
      }
      encData = bt64ToHex(encByte);
    } else {
      var iterator = parseInt(leng / 4);
      var remainder = leng % 4;
      var i = 0;
      for (i = 0; i < iterator; i++) {
        var tempData = data.substring(i * 4 + 0, i * 4 + 4);
        var tempByte = strToBt(tempData);
        var encByte;
        if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != "") {
          var tempBt;
          var x, y, z;
          tempBt = tempByte;
          for (x = 0; x < firstLength; x++) {
            tempBt = enc(tempBt, firstKeyBt[x]);
          }
          for (y = 0; y < secondLength; y++) {
            tempBt = enc(tempBt, secondKeyBt[y]);
          }
          for (z = 0; z < thirdLength; z++) {
            tempBt = enc(tempBt, thirdKeyBt[z]);
          }
          encByte = tempBt;
        } else {
          if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "") {
            var tempBt;
            var x, y;
            tempBt = tempByte;
            for (x = 0; x < firstLength; x++) {
              tempBt = enc(tempBt, firstKeyBt[x]);
            }
            for (y = 0; y < secondLength; y++) {
              tempBt = enc(tempBt, secondKeyBt[y]);
            }
            encByte = tempBt;
          } else {
            if (firstKey != null && firstKey != "") {
              var tempBt;
              var x;
              tempBt = tempByte;
              for (x = 0; x < firstLength; x++) {
                tempBt = enc(tempBt, firstKeyBt[x]);
              }
              encByte = tempBt;
            }
          }
        }
        encData += bt64ToHex(encByte);
      }
      if (remainder > 0) {
        var remainderData = data.substring(iterator * 4 + 0, leng);
        var tempByte = strToBt(remainderData);
        var encByte;
        if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != "") {
          var tempBt;
          var x, y, z;
          tempBt = tempByte;
          for (x = 0; x < firstLength; x++) {
            tempBt = enc(tempBt, firstKeyBt[x]);
          }
          for (y = 0; y < secondLength; y++) {
            tempBt = enc(tempBt, secondKeyBt[y]);
          }
          for (z = 0; z < thirdLength; z++) {
            tempBt = enc(tempBt, thirdKeyBt[z]);
          }
          encByte = tempBt;
        } else {
          if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "") {
            var tempBt;
            var x, y;
            tempBt = tempByte;
            for (x = 0; x < firstLength; x++) {
              tempBt = enc(tempBt, firstKeyBt[x]);
            }
            for (y = 0; y < secondLength; y++) {
              tempBt = enc(tempBt, secondKeyBt[y]);
            }
            encByte = tempBt;
          } else {
            if (firstKey != null && firstKey != "") {
              var tempBt;
              var x;
              tempBt = tempByte;
              for (x = 0; x < firstLength; x++) {
                tempBt = enc(tempBt, firstKeyBt[x]);
              }
              encByte = tempBt;
            }
          }
        }
        encData += bt64ToHex(encByte);
      }
    }
  }
  return encData;
}

/*
* decrypt the encrypted string to the original string 
*
* return  the original string  
*/
function strDec(data, firstKey, secondKey, thirdKey) {
  var leng = data.length;
  var decStr = "";
  var firstKeyBt, secondKeyBt, thirdKeyBt, firstLength, secondLength, thirdLength;
  if (firstKey != null && firstKey != "") {
    firstKeyBt = getKeyBytes(firstKey);
    firstLength = firstKeyBt.length;
  }
  if (secondKey != null && secondKey != "") {
    secondKeyBt = getKeyBytes(secondKey);
    secondLength = secondKeyBt.length;
  }
  if (thirdKey != null && thirdKey != "") {
    thirdKeyBt = getKeyBytes(thirdKey);
    thirdLength = thirdKeyBt.length;
  }

  var iterator = parseInt(leng / 16);
  var i = 0;
  for (i = 0; i < iterator; i++) {
    var tempData = data.substring(i * 16 + 0, i * 16 + 16);
    var strByte = hexToBt64(tempData);
    var intByte = new Array(64);
    var j = 0;
    for (j = 0; j < 64; j++) {
      intByte[j] = parseInt(strByte.substring(j, j + 1));
    }
    var decByte;
    if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != "") {
      var tempBt;
      var x, y, z;
      tempBt = intByte;
      for (x = thirdLength - 1; x >= 0; x--) {
        tempBt = dec(tempBt, thirdKeyBt[x]);
      }
      for (y = secondLength - 1; y >= 0; y--) {
        tempBt = dec(tempBt, secondKeyBt[y]);
      }
      for (z = firstLength - 1; z >= 0; z--) {
        tempBt = dec(tempBt, firstKeyBt[z]);
      }
      decByte = tempBt;
    } else {
      if (firstKey != null && firstKey != "" && secondKey != null && secondKey != "") {
        var tempBt;
        var x, y, z;
        tempBt = intByte;
        for (x = secondLength - 1; x >= 0; x--) {
          tempBt = dec(tempBt, secondKeyBt[x]);
        }
        for (y = firstLength - 1; y >= 0; y--) {
          tempBt = dec(tempBt, firstKeyBt[y]);
        }
        decByte = tempBt;
      } else {
        if (firstKey != null && firstKey != "") {
          var tempBt;
          var x, y, z;
          tempBt = intByte;
          for (x = firstLength - 1; x >= 0; x--) {
            tempBt = dec(tempBt, firstKeyBt[x]);
          }
          decByte = tempBt;
        }
      }
    }
    decStr += byteToString(decByte);
  }
  return decStr;
}
/*
* chang the string into the bit array
* 
* return bit array(it's length % 64 = 0)
*/
function getKeyBytes(key) {
  var keyBytes = new Array();
  var leng = key.length;
  var iterator = parseInt(leng / 4);
  var remainder = leng % 4;
  var i = 0;
  for (i = 0; i < iterator; i++) {
    keyBytes[i] = strToBt(key.substring(i * 4 + 0, i * 4 + 4));
  }
  if (remainder > 0) {
    keyBytes[i] = strToBt(key.substring(i * 4 + 0, leng));
  }
  return keyBytes;
}

/*
* chang the string(it's length <= 4) into the bit array
* 
* return bit array(it's length = 64)
*/
function strToBt(str) {
  var leng = str.length;
  var bt = new Array(64);
  if (leng < 4) {
    var i = 0,
        j = 0,
        p = 0,
        q = 0;
    for (i = 0; i < leng; i++) {
      var k = str.charCodeAt(i);
      for (j = 0; j < 16; j++) {
        var pow = 1,
            m = 0;
        for (m = 15; m > j; m--) {
          pow *= 2;
        }
        bt[16 * i + j] = parseInt(k / pow) % 2;
      }
    }
    for (p = leng; p < 4; p++) {
      var k = 0;
      for (q = 0; q < 16; q++) {
        var pow = 1,
            m = 0;
        for (m = 15; m > q; m--) {
          pow *= 2;
        }
        bt[16 * p + q] = parseInt(k / pow) % 2;
      }
    }
  } else {
    for (i = 0; i < 4; i++) {
      var k = str.charCodeAt(i);
      for (j = 0; j < 16; j++) {
        var pow = 1;
        for (m = 15; m > j; m--) {
          pow *= 2;
        }
        bt[16 * i + j] = parseInt(k / pow) % 2;
      }
    }
  }
  return bt;
}

/*
* chang the bit(it's length = 4) into the hex
* 
* return hex
*/
function bt4ToHex(binary) {
  var hex;
  switch (binary) {
    case "0000":
      hex = "0";break;
    case "0001":
      hex = "1";break;
    case "0010":
      hex = "2";break;
    case "0011":
      hex = "3";break;
    case "0100":
      hex = "4";break;
    case "0101":
      hex = "5";break;
    case "0110":
      hex = "6";break;
    case "0111":
      hex = "7";break;
    case "1000":
      hex = "8";break;
    case "1001":
      hex = "9";break;
    case "1010":
      hex = "A";break;
    case "1011":
      hex = "B";break;
    case "1100":
      hex = "C";break;
    case "1101":
      hex = "D";break;
    case "1110":
      hex = "E";break;
    case "1111":
      hex = "F";break;
  }
  return hex;
}

/*
* chang the hex into the bit(it's length = 4)
* 
* return the bit(it's length = 4)
*/
function hexToBt4(hex) {
  var binary;
  switch (hex) {
    case "0":
      binary = "0000";break;
    case "1":
      binary = "0001";break;
    case "2":
      binary = "0010";break;
    case "3":
      binary = "0011";break;
    case "4":
      binary = "0100";break;
    case "5":
      binary = "0101";break;
    case "6":
      binary = "0110";break;
    case "7":
      binary = "0111";break;
    case "8":
      binary = "1000";break;
    case "9":
      binary = "1001";break;
    case "A":
      binary = "1010";break;
    case "B":
      binary = "1011";break;
    case "C":
      binary = "1100";break;
    case "D":
      binary = "1101";break;
    case "E":
      binary = "1110";break;
    case "F":
      binary = "1111";break;
  }
  return binary;
}

/*
* chang the bit(it's length = 64) into the string
* 
* return string
*/
function byteToString(byteData) {
  var str = "";
  for (var i = 0; i < 4; i++) {
    var count = 0;
    for (var j = 0; j < 16; j++) {
      var pow = 1;
      for (var m = 15; m > j; m--) {
        pow *= 2;
      }
      count += byteData[16 * i + j] * pow;
    }
    if (count != 0) {
      str += String.fromCharCode(count);
    }
  }
  return str;
}

function bt64ToHex(byteData) {
  var hex = "";
  for (var i = 0; i < 16; i++) {
    var bt = "";
    for (var j = 0; j < 4; j++) {
      bt += byteData[i * 4 + j];
    }
    hex += bt4ToHex(bt);
  }
  return hex;
}

function hexToBt64(hex) {
  var binary = "";
  for (var i = 0; i < 16; i++) {
    binary += hexToBt4(hex.substring(i, i + 1));
  }
  return binary;
}

/*
* the 64 bit des core arithmetic
*/

function enc(dataByte, keyByte) {
  var keys = generateKeys(keyByte);
  var ipByte = initPermute(dataByte);
  var ipLeft = new Array(32);
  var ipRight = new Array(32);
  var tempLeft = new Array(32);
  var i = 0,
      j = 0,
      k = 0,
      m = 0,
      n = 0;
  for (k = 0; k < 32; k++) {
    ipLeft[k] = ipByte[k];
    ipRight[k] = ipByte[32 + k];
  }
  for (i = 0; i < 16; i++) {
    for (j = 0; j < 32; j++) {
      tempLeft[j] = ipLeft[j];
      ipLeft[j] = ipRight[j];
    }
    var key = new Array(48);
    for (m = 0; m < 48; m++) {
      key[m] = keys[i][m];
    }
    var tempRight = xor(pPermute(sBoxPermute(xor(expandPermute(ipRight), key))), tempLeft);
    for (n = 0; n < 32; n++) {
      ipRight[n] = tempRight[n];
    }
  }

  var finalData = new Array(64);
  for (i = 0; i < 32; i++) {
    finalData[i] = ipRight[i];
    finalData[32 + i] = ipLeft[i];
  }
  return finallyPermute(finalData);
}

function dec(dataByte, keyByte) {
  var keys = generateKeys(keyByte);
  var ipByte = initPermute(dataByte);
  var ipLeft = new Array(32);
  var ipRight = new Array(32);
  var tempLeft = new Array(32);
  var i = 0,
      j = 0,
      k = 0,
      m = 0,
      n = 0;
  for (k = 0; k < 32; k++) {
    ipLeft[k] = ipByte[k];
    ipRight[k] = ipByte[32 + k];
  }
  for (i = 15; i >= 0; i--) {
    for (j = 0; j < 32; j++) {
      tempLeft[j] = ipLeft[j];
      ipLeft[j] = ipRight[j];
    }
    var key = new Array(48);
    for (m = 0; m < 48; m++) {
      key[m] = keys[i][m];
    }

    var tempRight = xor(pPermute(sBoxPermute(xor(expandPermute(ipRight), key))), tempLeft);
    for (n = 0; n < 32; n++) {
      ipRight[n] = tempRight[n];
    }
  }

  var finalData = new Array(64);
  for (i = 0; i < 32; i++) {
    finalData[i] = ipRight[i];
    finalData[32 + i] = ipLeft[i];
  }
  return finallyPermute(finalData);
}

function initPermute(originalData) {
  var ipByte = new Array(64);
  for (var i = 0, m = 1, n = 0; i < 4; i++, m += 2, n += 2) {
    for (var j = 7, k = 0; j >= 0; j--, k++) {
      ipByte[i * 8 + k] = originalData[j * 8 + m];
      ipByte[i * 8 + k + 32] = originalData[j * 8 + n];
    }
  }
  return ipByte;
}

function expandPermute(rightData) {
  var epByte = new Array(48);
  for (var i = 0; i < 8; i++) {
    if (i == 0) {
      epByte[i * 6 + 0] = rightData[31];
    } else {
      epByte[i * 6 + 0] = rightData[i * 4 - 1];
    }
    epByte[i * 6 + 1] = rightData[i * 4 + 0];
    epByte[i * 6 + 2] = rightData[i * 4 + 1];
    epByte[i * 6 + 3] = rightData[i * 4 + 2];
    epByte[i * 6 + 4] = rightData[i * 4 + 3];
    if (i == 7) {
      epByte[i * 6 + 5] = rightData[0];
    } else {
      epByte[i * 6 + 5] = rightData[i * 4 + 4];
    }
  }
  return epByte;
}

function xor(byteOne, byteTwo) {
  var xorByte = new Array(byteOne.length);
  for (var i = 0; i < byteOne.length; i++) {
    xorByte[i] = byteOne[i] ^ byteTwo[i];
  }
  return xorByte;
}

function sBoxPermute(expandByte) {

  var sBoxByte = new Array(32);
  var binary = "";
  var s1 = [[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7], [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8], [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0], [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]];

  /* Table - s2 */
  var s2 = [[15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10], [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5], [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15], [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]];

  /* Table - s3 */
  var s3 = [[10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8], [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1], [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7], [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]];
  /* Table - s4 */
  var s4 = [[7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15], [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9], [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4], [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]];

  /* Table - s5 */
  var s5 = [[2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9], [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6], [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14], [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]];

  /* Table - s6 */
  var s6 = [[12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11], [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8], [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6], [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]];

  /* Table - s7 */
  var s7 = [[4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1], [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6], [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2], [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]];

  /* Table - s8 */
  var s8 = [[13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7], [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2], [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8], [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]];

  for (var m = 0; m < 8; m++) {
    var i = 0,
        j = 0;
    i = expandByte[m * 6 + 0] * 2 + expandByte[m * 6 + 5];
    j = expandByte[m * 6 + 1] * 2 * 2 * 2 + expandByte[m * 6 + 2] * 2 * 2 + expandByte[m * 6 + 3] * 2 + expandByte[m * 6 + 4];
    switch (m) {
      case 0:
        binary = getBoxBinary(s1[i][j]);
        break;
      case 1:
        binary = getBoxBinary(s2[i][j]);
        break;
      case 2:
        binary = getBoxBinary(s3[i][j]);
        break;
      case 3:
        binary = getBoxBinary(s4[i][j]);
        break;
      case 4:
        binary = getBoxBinary(s5[i][j]);
        break;
      case 5:
        binary = getBoxBinary(s6[i][j]);
        break;
      case 6:
        binary = getBoxBinary(s7[i][j]);
        break;
      case 7:
        binary = getBoxBinary(s8[i][j]);
        break;
    }
    sBoxByte[m * 4 + 0] = parseInt(binary.substring(0, 1));
    sBoxByte[m * 4 + 1] = parseInt(binary.substring(1, 2));
    sBoxByte[m * 4 + 2] = parseInt(binary.substring(2, 3));
    sBoxByte[m * 4 + 3] = parseInt(binary.substring(3, 4));
  }
  return sBoxByte;
}

function pPermute(sBoxByte) {
  var pBoxPermute = new Array(32);
  pBoxPermute[0] = sBoxByte[15];
  pBoxPermute[1] = sBoxByte[6];
  pBoxPermute[2] = sBoxByte[19];
  pBoxPermute[3] = sBoxByte[20];
  pBoxPermute[4] = sBoxByte[28];
  pBoxPermute[5] = sBoxByte[11];
  pBoxPermute[6] = sBoxByte[27];
  pBoxPermute[7] = sBoxByte[16];
  pBoxPermute[8] = sBoxByte[0];
  pBoxPermute[9] = sBoxByte[14];
  pBoxPermute[10] = sBoxByte[22];
  pBoxPermute[11] = sBoxByte[25];
  pBoxPermute[12] = sBoxByte[4];
  pBoxPermute[13] = sBoxByte[17];
  pBoxPermute[14] = sBoxByte[30];
  pBoxPermute[15] = sBoxByte[9];
  pBoxPermute[16] = sBoxByte[1];
  pBoxPermute[17] = sBoxByte[7];
  pBoxPermute[18] = sBoxByte[23];
  pBoxPermute[19] = sBoxByte[13];
  pBoxPermute[20] = sBoxByte[31];
  pBoxPermute[21] = sBoxByte[26];
  pBoxPermute[22] = sBoxByte[2];
  pBoxPermute[23] = sBoxByte[8];
  pBoxPermute[24] = sBoxByte[18];
  pBoxPermute[25] = sBoxByte[12];
  pBoxPermute[26] = sBoxByte[29];
  pBoxPermute[27] = sBoxByte[5];
  pBoxPermute[28] = sBoxByte[21];
  pBoxPermute[29] = sBoxByte[10];
  pBoxPermute[30] = sBoxByte[3];
  pBoxPermute[31] = sBoxByte[24];
  return pBoxPermute;
}

function finallyPermute(endByte) {
  var fpByte = new Array(64);
  fpByte[0] = endByte[39];
  fpByte[1] = endByte[7];
  fpByte[2] = endByte[47];
  fpByte[3] = endByte[15];
  fpByte[4] = endByte[55];
  fpByte[5] = endByte[23];
  fpByte[6] = endByte[63];
  fpByte[7] = endByte[31];
  fpByte[8] = endByte[38];
  fpByte[9] = endByte[6];
  fpByte[10] = endByte[46];
  fpByte[11] = endByte[14];
  fpByte[12] = endByte[54];
  fpByte[13] = endByte[22];
  fpByte[14] = endByte[62];
  fpByte[15] = endByte[30];
  fpByte[16] = endByte[37];
  fpByte[17] = endByte[5];
  fpByte[18] = endByte[45];
  fpByte[19] = endByte[13];
  fpByte[20] = endByte[53];
  fpByte[21] = endByte[21];
  fpByte[22] = endByte[61];
  fpByte[23] = endByte[29];
  fpByte[24] = endByte[36];
  fpByte[25] = endByte[4];
  fpByte[26] = endByte[44];
  fpByte[27] = endByte[12];
  fpByte[28] = endByte[52];
  fpByte[29] = endByte[20];
  fpByte[30] = endByte[60];
  fpByte[31] = endByte[28];
  fpByte[32] = endByte[35];
  fpByte[33] = endByte[3];
  fpByte[34] = endByte[43];
  fpByte[35] = endByte[11];
  fpByte[36] = endByte[51];
  fpByte[37] = endByte[19];
  fpByte[38] = endByte[59];
  fpByte[39] = endByte[27];
  fpByte[40] = endByte[34];
  fpByte[41] = endByte[2];
  fpByte[42] = endByte[42];
  fpByte[43] = endByte[10];
  fpByte[44] = endByte[50];
  fpByte[45] = endByte[18];
  fpByte[46] = endByte[58];
  fpByte[47] = endByte[26];
  fpByte[48] = endByte[33];
  fpByte[49] = endByte[1];
  fpByte[50] = endByte[41];
  fpByte[51] = endByte[9];
  fpByte[52] = endByte[49];
  fpByte[53] = endByte[17];
  fpByte[54] = endByte[57];
  fpByte[55] = endByte[25];
  fpByte[56] = endByte[32];
  fpByte[57] = endByte[0];
  fpByte[58] = endByte[40];
  fpByte[59] = endByte[8];
  fpByte[60] = endByte[48];
  fpByte[61] = endByte[16];
  fpByte[62] = endByte[56];
  fpByte[63] = endByte[24];
  return fpByte;
}

function getBoxBinary(i) {
  var binary = "";
  switch (i) {
    case 0:
      binary = "0000";break;
    case 1:
      binary = "0001";break;
    case 2:
      binary = "0010";break;
    case 3:
      binary = "0011";break;
    case 4:
      binary = "0100";break;
    case 5:
      binary = "0101";break;
    case 6:
      binary = "0110";break;
    case 7:
      binary = "0111";break;
    case 8:
      binary = "1000";break;
    case 9:
      binary = "1001";break;
    case 10:
      binary = "1010";break;
    case 11:
      binary = "1011";break;
    case 12:
      binary = "1100";break;
    case 13:
      binary = "1101";break;
    case 14:
      binary = "1110";break;
    case 15:
      binary = "1111";break;
  }
  return binary;
}
/*
* generate 16 keys for xor
*
*/
function generateKeys(keyByte) {
  var key = new Array(56);
  var keys = new Array();

  keys[0] = new Array();
  keys[1] = new Array();
  keys[2] = new Array();
  keys[3] = new Array();
  keys[4] = new Array();
  keys[5] = new Array();
  keys[6] = new Array();
  keys[7] = new Array();
  keys[8] = new Array();
  keys[9] = new Array();
  keys[10] = new Array();
  keys[11] = new Array();
  keys[12] = new Array();
  keys[13] = new Array();
  keys[14] = new Array();
  keys[15] = new Array();
  var loop = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

  for (var i = 0; i < 7; i++) {
    for (var j = 0, k = 7; j < 8; j++, k--) {
      key[i * 8 + j] = keyByte[8 * k + i];
    }
  }

  var i = 0;
  for (i = 0; i < 16; i++) {
    var tempLeft = 0;
    var tempRight = 0;
    for (j = 0; j < loop[i]; j++) {
      tempLeft = key[0];
      tempRight = key[28];
      for (k = 0; k < 27; k++) {
        key[k] = key[k + 1];
        key[28 + k] = key[29 + k];
      }
      key[27] = tempLeft;
      key[55] = tempRight;
    }
    var tempKey = new Array(48);
    tempKey[0] = key[13];
    tempKey[1] = key[16];
    tempKey[2] = key[10];
    tempKey[3] = key[23];
    tempKey[4] = key[0];
    tempKey[5] = key[4];
    tempKey[6] = key[2];
    tempKey[7] = key[27];
    tempKey[8] = key[14];
    tempKey[9] = key[5];
    tempKey[10] = key[20];
    tempKey[11] = key[9];
    tempKey[12] = key[22];
    tempKey[13] = key[18];
    tempKey[14] = key[11];
    tempKey[15] = key[3];
    tempKey[16] = key[25];
    tempKey[17] = key[7];
    tempKey[18] = key[15];
    tempKey[19] = key[6];
    tempKey[20] = key[26];
    tempKey[21] = key[19];
    tempKey[22] = key[12];
    tempKey[23] = key[1];
    tempKey[24] = key[40];
    tempKey[25] = key[51];
    tempKey[26] = key[30];
    tempKey[27] = key[36];
    tempKey[28] = key[46];
    tempKey[29] = key[54];
    tempKey[30] = key[29];
    tempKey[31] = key[39];
    tempKey[32] = key[50];
    tempKey[33] = key[44];
    tempKey[34] = key[32];
    tempKey[35] = key[47];
    tempKey[36] = key[43];
    tempKey[37] = key[48];
    tempKey[38] = key[38];
    tempKey[39] = key[55];
    tempKey[40] = key[33];
    tempKey[41] = key[52];
    tempKey[42] = key[45];
    tempKey[43] = key[41];
    tempKey[44] = key[49];
    tempKey[45] = key[35];
    tempKey[46] = key[28];
    tempKey[47] = key[31];
    switch (i) {
      case 0:
        for (var m = 0; m < 48; m++) {
          keys[0][m] = tempKey[m];
        }break;
      case 1:
        for (var m = 0; m < 48; m++) {
          keys[1][m] = tempKey[m];
        }break;
      case 2:
        for (var m = 0; m < 48; m++) {
          keys[2][m] = tempKey[m];
        }break;
      case 3:
        for (var m = 0; m < 48; m++) {
          keys[3][m] = tempKey[m];
        }break;
      case 4:
        for (var m = 0; m < 48; m++) {
          keys[4][m] = tempKey[m];
        }break;
      case 5:
        for (var m = 0; m < 48; m++) {
          keys[5][m] = tempKey[m];
        }break;
      case 6:
        for (var m = 0; m < 48; m++) {
          keys[6][m] = tempKey[m];
        }break;
      case 7:
        for (var m = 0; m < 48; m++) {
          keys[7][m] = tempKey[m];
        }break;
      case 8:
        for (var m = 0; m < 48; m++) {
          keys[8][m] = tempKey[m];
        }break;
      case 9:
        for (var m = 0; m < 48; m++) {
          keys[9][m] = tempKey[m];
        }break;
      case 10:
        for (var m = 0; m < 48; m++) {
          keys[10][m] = tempKey[m];
        }break;
      case 11:
        for (var m = 0; m < 48; m++) {
          keys[11][m] = tempKey[m];
        }break;
      case 12:
        for (var m = 0; m < 48; m++) {
          keys[12][m] = tempKey[m];
        }break;
      case 13:
        for (var m = 0; m < 48; m++) {
          keys[13][m] = tempKey[m];
        }break;
      case 14:
        for (var m = 0; m < 48; m++) {
          keys[14][m] = tempKey[m];
        }break;
      case 15:
        for (var m = 0; m < 48; m++) {
          keys[15][m] = tempKey[m];
        }break;
    }
  }
  return keys;
}
//end-------------------------------------------------------------------------------------------------------------
/*
function test() {
 
 var msg = "abcdefgh";
 var bt = strToBt(msg);
 
 var key = "12345678";
 var keyB = strToBt(key);
   
 var encByte = enc(bt,keyB);
     
 var enchex  = bt64ToHex(encByte);  
 endata.value=enchex;
 
 var encStr = hexToBt64(enchex);
 alert("encStr="+encStr);
 var eByte = new Array();
 for(m=0;m<encStr.length;m++){
   eByte[m] = parseInt(encStr.substring(m,m+1));
 }
 var decbyte= dec(eByte,keyB)
 var decmsg= byteToString(decbyte);
 alert("decbyte="+decbyte);
 alert("decmsg="+decmsg);  
}*/

exports.strEnc = strEnc;
exports.strDec = strDec;
exports.getKeyBytes = getKeyBytes;
exports.strToBt = strToBt;
exports.bt4ToHex = bt4ToHex;
exports.hexToBt4 = hexToBt4;
exports.byteToString = byteToString;
exports.bt64ToHex = bt64ToHex;
exports.hexToBt64 = hexToBt64;
exports.enc = enc;
exports.dec = dec;
exports.initPermute = initPermute;
exports.expandPermute = expandPermute;
exports.xor = xor;
exports.sBoxPermute = sBoxPermute;
exports.pPermute = pPermute;
exports.finallyPermute = finallyPermute;
exports.getBoxBinary = getBoxBinary;
exports.generateKeys = generateKeys;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlcy5qcyJdLCJuYW1lcyI6WyJzdHJFbmMiLCJkYXRhIiwiZmlyc3RLZXkiLCJzZWNvbmRLZXkiLCJ0aGlyZEtleSIsImxlbmciLCJsZW5ndGgiLCJlbmNEYXRhIiwiZmlyc3RLZXlCdCIsInNlY29uZEtleUJ0IiwidGhpcmRLZXlCdCIsImZpcnN0TGVuZ3RoIiwic2Vjb25kTGVuZ3RoIiwidGhpcmRMZW5ndGgiLCJnZXRLZXlCeXRlcyIsImJ0Iiwic3RyVG9CdCIsImVuY0J5dGUiLCJ0ZW1wQnQiLCJ4IiwieSIsInoiLCJlbmMiLCJidDY0VG9IZXgiLCJpdGVyYXRvciIsInBhcnNlSW50IiwicmVtYWluZGVyIiwiaSIsInRlbXBEYXRhIiwic3Vic3RyaW5nIiwidGVtcEJ5dGUiLCJyZW1haW5kZXJEYXRhIiwic3RyRGVjIiwiZGVjU3RyIiwic3RyQnl0ZSIsImhleFRvQnQ2NCIsImludEJ5dGUiLCJBcnJheSIsImoiLCJkZWNCeXRlIiwiZGVjIiwiYnl0ZVRvU3RyaW5nIiwia2V5Iiwia2V5Qnl0ZXMiLCJzdHIiLCJwIiwicSIsImsiLCJjaGFyQ29kZUF0IiwicG93IiwibSIsImJ0NFRvSGV4IiwiYmluYXJ5IiwiaGV4IiwiaGV4VG9CdDQiLCJieXRlRGF0YSIsImNvdW50IiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiZGF0YUJ5dGUiLCJrZXlCeXRlIiwia2V5cyIsImdlbmVyYXRlS2V5cyIsImlwQnl0ZSIsImluaXRQZXJtdXRlIiwiaXBMZWZ0IiwiaXBSaWdodCIsInRlbXBMZWZ0IiwibiIsInRlbXBSaWdodCIsInhvciIsInBQZXJtdXRlIiwic0JveFBlcm11dGUiLCJleHBhbmRQZXJtdXRlIiwiZmluYWxEYXRhIiwiZmluYWxseVBlcm11dGUiLCJvcmlnaW5hbERhdGEiLCJyaWdodERhdGEiLCJlcEJ5dGUiLCJieXRlT25lIiwiYnl0ZVR3byIsInhvckJ5dGUiLCJleHBhbmRCeXRlIiwic0JveEJ5dGUiLCJzMSIsInMyIiwiczMiLCJzNCIsInM1IiwiczYiLCJzNyIsInM4IiwiZ2V0Qm94QmluYXJ5IiwicEJveFBlcm11dGUiLCJlbmRCeXRlIiwiZnBCeXRlIiwibG9vcCIsInRlbXBLZXkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBOzs7Ozs7O0FBT0E7Ozs7QUFJQSxTQUFTQSxNQUFULENBQWdCQyxJQUFoQixFQUFxQkMsUUFBckIsRUFBOEJDLFNBQTlCLEVBQXdDQyxRQUF4QyxFQUFpRDs7QUFFaEQsTUFBSUMsT0FBT0osS0FBS0ssTUFBaEI7QUFDQSxNQUFJQyxVQUFVLEVBQWQ7QUFDQSxNQUFJQyxVQUFKLEVBQWVDLFdBQWYsRUFBMkJDLFVBQTNCLEVBQXNDQyxXQUF0QyxFQUFrREMsWUFBbEQsRUFBK0RDLFdBQS9EO0FBQ0EsTUFBR1gsWUFBWSxJQUFaLElBQW9CQSxZQUFZLEVBQW5DLEVBQXNDO0FBQ3BDTSxpQkFBYU0sWUFBWVosUUFBWixDQUFiO0FBQ0FTLGtCQUFjSCxXQUFXRixNQUF6QjtBQUNEO0FBQ0QsTUFBR0gsYUFBYSxJQUFiLElBQXFCQSxhQUFhLEVBQXJDLEVBQXdDO0FBQ3RDTSxrQkFBY0ssWUFBWVgsU0FBWixDQUFkO0FBQ0FTLG1CQUFlSCxZQUFZSCxNQUEzQjtBQUNEO0FBQ0QsTUFBR0YsWUFBWSxJQUFaLElBQW9CQSxZQUFZLEVBQW5DLEVBQXNDO0FBQ3BDTSxpQkFBYUksWUFBWVYsUUFBWixDQUFiO0FBQ0FTLGtCQUFjSCxXQUFXSixNQUF6QjtBQUNEOztBQUVELE1BQUdELE9BQU8sQ0FBVixFQUFZO0FBQ1YsUUFBR0EsT0FBTyxDQUFWLEVBQVk7QUFDVixVQUFJVSxLQUFLQyxRQUFRZixJQUFSLENBQVQ7QUFDQSxVQUFJZ0IsT0FBSjtBQUNBLFVBQUdmLFlBQVksSUFBWixJQUFvQkEsWUFBVyxFQUEvQixJQUFxQ0MsYUFBYSxJQUFsRCxJQUEwREEsYUFBYSxFQUF2RSxJQUE2RUMsWUFBWSxJQUF6RixJQUFpR0EsWUFBWSxFQUFoSCxFQUFtSDtBQUNqSCxZQUFJYyxNQUFKO0FBQ0EsWUFBSUMsQ0FBSixFQUFNQyxD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Q0FBVSxFQUFWLENBQWI7QUFDQTBELFNBQVEsQ0FBUixJQUFhRCxRQUFRLEVBQVIsQ0FBYjtBQUNBQyxTQUFRLENBQVIsSUFBYUQsUUFBUyxDQUFULENBQWI7QUFDQUMsU0FBUSxDQUFSLElBQWFELFFBQVEsRUFBUixDQUFiO0FBQ0FDLFNBQVEsQ0FBUixJQUFhRCxRQUFRLEVBQVIsQ0FBYjtBQUNBQyxTQUFRLENBQVIsSUFBYUQsUUFBUSxFQUFSLENBQWI7QUFDQUMsU0FBUSxDQUFSLElBQWFELFFBQVEsRUFBUixDQUFiO0FBQ0FDLFNBQVEsQ0FBUixJQUFhRCxRQUFRLEVBQVIsQ0FBYjtBQUNBQyxTQUFRLENBQVIsSUFBYUQsUUFBUSxFQUFSLENBQWI7QUFDQUMsU0FBUSxDQUFSLElBQWFELFFBQVEsRUFBUixDQUFiO0FBQ0FDLFNBQVEsQ0FBUixJQUFhRCxRQUFTLENBQVQsQ0FBYjtBQUNBQyxTQUFPLEVBQVAsSUFBYUQsUUFBUSxFQUFSLENBQWI7QUFDQUMsU0FBTyxFQUFQLElBQWFELFFBQVEsRUFBUixDQUFiO0FBQ0FDLFNBQU8sRUFBUCxJQUFhRCxRQUFRLEVBQVIsQ0FBYjtBQUNBQyxTQUFPLEVBQVAsSUFBYUQsUUFBUSxFQUFSLENBQWI7QUFDQUMsU0FBTyxFQUFQLElBQWFELFFBQVEsRUFBUixDQUFiO0FBQ0FDLFNBQU8sRUFBUCxJQUFhRCxRQUFRLEVBQVIsQ0FBYjtBQUNBQyxTQUFPLEVBQVAsSUFBYUQsUUFBUSxFQUFSLENBQWI7QUFDQUMsU0FBTyxFQUFQLElBQWFELFFBQVMsQ0FBVCxDQUFiO0FBQ0FDLFNBQU8sRUFBUCxJQUFhRCxRQUFRLEVBQVIsQ0FBYjtBQUNBQyxTQUFPLEVBQVAsSUFBYUQsUUFBUSxFQUFSLENBQWI7QUFDQUMsU0FBTyxFQUFQLElBQWFELFFBQVEsRUFBUixDQUFiO0FBQ0FDLFNBQU8sRUFBUCxJQUFhRCxRQUFRLEVBQVIsQ0FBYjtBQUNBQyxTQUFPLEVBQVAsSUFBYUQsUUFBUSxFQUFSLENBQWI7QUFDQUMsU0FBTyxFQUFQLElBQWFELFFBQVEsRUFBUixDQUFiO0FBQ0FDLFNBQU8sRUFBUCxJQUFhRCxRQUFRLEVBQVIsQ0FBYjtBQUNBQyxTQUFPLEVBQVAsSUFBYUQsUUFBUyxDQUFULENBQWI7QUFDQUMsU0FBTyxFQUFQLElBQWFELFFBQVEsRUFBUixDQUFiO0FBQ0FDLFNBQU8sRUFBUCxJQUFhRCxRQUFRLEVBQVIsQ0FBYjtBQUNBQyxTQUFPLEVBQVAsSUFBYUQsUUFBUSxFQUFSLENBQWI7QUFDQUMsU0FBTyxFQUFQLElBQWFELFFBQVEsRUFBUixDQUFiO0FBQ0FDLFNBQU8sRUFBUCxJQUFhRCxRQUFRLEVBQVIsQ0FBYjtBQUNBQyxTQUFPLEVBQVAsSUFBYUQsUUFBUSxFQUFSLENBQWI7QUFDQUMsU0FBTyxFQUFQLElBQWFELFFBQVEsRUFBUixDQUFiO0FBQ0FDLFNBQU8sRUFBUCxJQUFhRCxRQUFTLENBQVQsQ0FBYjtBQUNBQyxTQUFPLEVBQVAsSUFBYUQsUUFBUSxFQUFSLENBQWI7QUFDQUMsU0FBTyxFQUFQLElBQWFELFFBQVEsRUFBUixDQUFiO0FBQ0FDLFNBQU8sRUFBUCxJQUFhRCxRQUFRLEVBQVIsQ0FBYjtBQUNBQyxTQUFPLEVBQVAsSUFBYUQsUUFBUSxFQUFSLENBQWI7QUFDQUMsU0FBTyxFQUFQLElBQWFELFFBQVEsRUFBUixDQUFiO0FBQ0FDLFNBQU8sRUFBUCxJQUFhRCxRQUFRLEVBQVIsQ0FBYjtBQUNBQyxTQUFPLEVBQVAsSUFBYUQsUUFBUSxFQUFSLENBQWI7QUFDQUMsU0FBTyxFQUFQLElBQWFELFFBQVMsQ0FBVCxDQUFiO0FBQ0FDLFNBQU8sRUFBUCxJQUFhRCxRQUFRLEVBQVIsQ0FBYjtBQUNBQyxTQUFPLEVBQVAsSUFBYUQsUUFBUSxFQUFSLENBQWI7QUFDQUMsU0FBTyxFQUFQLElBQWFELFFBQVEsRUFBUixDQUFiO0FBQ0FDLFNBQU8sRUFBUCxJQUFhRCxRQUFRLEVBQVIsQ0FBYjtBQUNBQyxTQUFPLEVBQVAsSUFBYUQsUUFBUSxFQUFSLENBQWI7QUFDQUMsU0FBTyxFQUFQLElBQWFELFFBQVEsRUFBUixDQUFiO0FBQ0FDLFNB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dUQsWUFBUSxFQUFSLElBQWN2RCxJQUFLLENBQUwsQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFJLEVBQUosQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFLLENBQUwsQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFJLEVBQUosQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFLLENBQUwsQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFJLEVBQUosQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFJLEVBQUosQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFJLEVBQUosQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFLLENBQUwsQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFJLEVBQUosQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFJLEVBQUosQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFJLEVBQUosQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFJLEVBQUosQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFJLEVBQUosQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFJLEVBQUosQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFJLEVBQUosQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFJLEVBQUosQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFJLEVBQUosQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFJLEVBQUosQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFJLEVBQUosQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFJLEVBQUosQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFJLEVBQUosQ0FBZDtBQUNBdUQsWUFBUSxFQUFSLElBQWN2RCxJQUFJLEVBQUosQ0FBZDtBQUNBdUQs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Ozs7Ozs7OztRQTJCRTdELE0sR0FBQUEsTTtRQUNBZ0MsTSxHQUFBQSxNO1FBQ0FsQixXLEdBQUFBLFc7UUFDQUUsTyxHQUFBQSxPO1FBQ0FtQyxRLEdBQUFBLFE7UUFDQUcsUSxHQUFBQSxRO1FBQ0FiLFksR0FBQUEsWTtRQUNBbEIsUyxHQUFBQSxTO1FBQ0FZLFMsR0FBQUEsUztRQUNBYixHLEdBQUFBLEc7UUFDQWtCLEcsR0FBQUEsRztRQUNBd0IsVyxHQUFBQSxXO1FBQ0FTLGEsR0FBQUEsYTtRQUNBSCxHLEdBQUFBLEc7UUFDQUUsVyxHQUFBQSxXO1FBQ0FELFEsR0FBQUEsUTtRQUNBSSxjLEdBQUFBLGM7UUFDQWlCLFksR0FBQUEsWTtRQUNBOUIsWSxHQUFBQSxZIiwiZmlsZSI6ImRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vKipcclxuKiBERVPliqDlr4Yv6Kej5a+GXHJcbiogQENvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMDZcclxuKiBAYXV0aG9yIEd1YXBvXHJcbiogQHNlZSBERVNDb3JlXHJcbiovXHJcblxyXG4vKlxyXG4qIGVuY3J5cHQgdGhlIHN0cmluZyB0byBzdHJpbmcgbWFkZSB1cCBvZiBoZXhcclxuKiByZXR1cm4gdGhlIGVuY3J5cHRlZCBzdHJpbmdcclxuKi9cclxuZnVuY3Rpb24gc3RyRW5jKGRhdGEsZmlyc3RLZXksc2Vjb25kS2V5LHRoaXJkS2V5KXtcclxuXHJcbiB2YXIgbGVuZyA9IGRhdGEubGVuZ3RoO1xyXG4gdmFyIGVuY0RhdGEgPSBcIlwiO1xyXG4gdmFyIGZpcnN0S2V5QnQsc2Vjb25kS2V5QnQsdGhpcmRLZXlCdCxmaXJzdExlbmd0aCxzZWNvbmRMZW5ndGgsdGhpcmRMZW5ndGg7XHJcbiBpZihmaXJzdEtleSAhPSBudWxsICYmIGZpcnN0S2V5ICE9IFwiXCIpeyAgICBcclxuICAgZmlyc3RLZXlCdCA9IGdldEtleUJ5dGVzKGZpcnN0S2V5KTtcclxuICAgZmlyc3RMZW5ndGggPSBmaXJzdEtleUJ0Lmxlbmd0aDtcclxuIH1cclxuIGlmKHNlY29uZEtleSAhPSBudWxsICYmIHNlY29uZEtleSAhPSBcIlwiKXtcclxuICAgc2Vjb25kS2V5QnQgPSBnZXRLZXlCeXRlcyhzZWNvbmRLZXkpO1xyXG4gICBzZWNvbmRMZW5ndGggPSBzZWNvbmRLZXlCdC5sZW5ndGg7XHJcbiB9XHJcbiBpZih0aGlyZEtleSAhPSBudWxsICYmIHRoaXJkS2V5ICE9IFwiXCIpe1xyXG4gICB0aGlyZEtleUJ0ID0gZ2V0S2V5Qnl0ZXModGhpcmRLZXkpO1xyXG4gICB0aGlyZExlbmd0aCA9IHRoaXJkS2V5QnQubGVuZ3RoO1xyXG4gfSAgXHJcbiBcclxuIGlmKGxlbmcgPiAwKXtcclxuICAgaWYobGVuZyA8IDQpe1xyXG4gICAgIHZhciBidCA9IHN0clRvQnQoZGF0YSk7ICAgICAgXHJcbiAgICAgdmFyIGVuY0J5dGUgO1xyXG4gICAgIGlmKGZpcnN0S2V5ICE9IG51bGwgJiYgZmlyc3RLZXkgIT1cIlwiICYmIHNlY29uZEtleSAhPSBudWxsICYmIHNlY29uZEtleSAhPSBcIlwiICYmIHRoaXJkS2V5ICE9IG51bGwgJiYgdGhpcmRLZXkgIT0gXCJcIil7XHJcbiAgICAgICB2YXIgdGVtcEJ0O1xyXG4gICAgICAgdmFyIHgseSx6O1xyXG4gICAgICAgdGVtcEJ0ID0gYnQ7ICAgICAgICBcclxuICAgICAgIGZvcih4ID0gMDt4IDwgZmlyc3RMZW5ndGggO3ggKyspe1xyXG4gICAgICAgICB0ZW1wQnQgPSBlbmModGVtcEJ0LGZpcnN0S2V5QnRbeF0pO1xyXG4gICAgICAgfVxyXG4gICAgICAgZm9yKHkgPSAwO3kgPCBzZWNvbmRMZW5ndGggO3kgKyspe1xyXG4gICAgICAgICB0ZW1wQnQgPSBlbmModGVtcEJ0LHNlY29uZEtleUJ0W3ldKTtcclxuICAgICAgIH1cclxuICAgICAgIGZvcih6ID0gMDt6IDwgdGhpcmRMZW5ndGggO3ogKyspe1xyXG4gICAgICAgICB0ZW1wQnQgPSBlbmModGVtcEJ0LHRoaXJkS2V5QnRbel0pO1xyXG4gICAgICAgfSAgICAgICAgXHJcbiAgICAgICBlbmNCeXRlID0gdGVtcEJ0OyAgICAgICAgXHJcbiAgICAgfWVsc2V7XHJcbiAgICAgICBpZihmaXJzdEtleSAhPSBudWxsICYmIGZpcnN0S2V5ICE9XCJcIiAmJiBzZWNvbmRLZXkgIT0gbnVsbCAmJiBzZWNvbmRLZXkgIT0gXCJcIil7XHJcbiAgICAgICAgIHZhciB0ZW1wQnQ7XHJcbiAgICAgICAgIHZhciB4LHk7XHJcbiAgICAgICAgIHRlbXBCdCA9IGJ0O1xyXG4gICAgICAgICBmb3IoeCA9IDA7eCA8IGZpcnN0TGVuZ3RoIDt4ICsrKXtcclxuICAgICAgICAgICB0ZW1wQnQgPSBlbmModGVtcEJ0LGZpcnN0S2V5QnRbeF0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGZvcih5ID0gMDt5IDwgc2Vjb25kTGVuZ3RoIDt5ICsrKXtcclxuICAgICAgICAgICB0ZW1wQnQgPSBlbmModGVtcEJ0LHNlY29uZEtleUJ0W3ldKTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBlbmNCeXRlID0gdGVtcEJ0O1xyXG4gICAgICAgfWVsc2V7XHJcbiAgICAgICAgIGlmKGZpcnN0S2V5ICE9IG51bGwgJiYgZmlyc3RLZXkgIT1cIlwiKXsgICAgICAgICAgICBcclxuICAgICAgICAgICB2YXIgdGVtcEJ0O1xyXG4gICAgICAgICAgIHZhciB4ID0gMDtcclxuICAgICAgICAgICB0ZW1wQnQgPSBidDsgICAgICAgICAgICBcclxuICAgICAgICAgICBmb3IoeCA9IDA7eCA8IGZpcnN0TGVuZ3RoIDt4ICsrKXtcclxuICAgICAgICAgICAgIHRlbXBCdCA9IGVuYyh0ZW1wQnQsZmlyc3RLZXlCdFt4XSk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgIGVuY0J5dGUgPSB0ZW1wQnQ7XHJcbiAgICAgICAgIH1cclxuICAgICAgIH0gICAgICAgIFxyXG4gICAgIH1cclxuICAgICBlbmNEYXRhID0gYnQ2NFRvSGV4KGVuY0J5dGUpO1xyXG4gICB9ZWxzZXtcclxuICAgICB2YXIgaXRlcmF0b3IgPSBwYXJzZUludChsZW5nLzQpO1xyXG4gICAgIHZhciByZW1haW5kZXIgPSBsZW5nJTQ7XHJcbiAgICAgdmFyIGk9MDsgICAgICBcclxuICAgICBmb3IoaSA9IDA7aSA8IGl0ZXJhdG9yO2krKyl7XHJcbiAgICAgICB2YXIgdGVtcERhdGEgPSBkYXRhLnN1YnN0cmluZyhpKjQrMCxpKjQrNCk7XHJcbiAgICAgICB2YXIgdGVtcEJ5dGUgPSBzdHJUb0J0KHRlbXBEYXRhKTtcclxuICAgICAgIHZhciBlbmNCeXRlIDtcclxuICAgICAgIGlmKGZpcnN0S2V5ICE9IG51bGwgJiYgZmlyc3RLZXkgIT1cIlwiICYmIHNlY29uZEtleSAhPSBudWxsICYmIHNlY29uZEtleSAhPSBcIlwiICYmIHRoaXJkS2V5ICE9IG51bGwgJiYgdGhpcmRLZXkgIT0gXCJcIil7XHJcbiAgICAgICAgIHZhciB0ZW1wQnQ7XHJcbiAgICAgICAgIHZhciB4LHksejtcclxuICAgICAgICAgdGVtcEJ0ID0gdGVtcEJ5dGU7XHJcbiAgICAgICAgIGZvcih4ID0gMDt4IDwgZmlyc3RMZW5ndGggO3ggKyspe1xyXG4gICAgICAgICAgIHRlbXBCdCA9IGVuYyh0ZW1wQnQsZmlyc3RLZXlCdFt4XSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgZm9yKHkgPSAwO3kgPCBzZWNvbmRMZW5ndGggO3kgKyspe1xyXG4gICAgICAgICAgIHRlbXBCdCA9IGVuYyh0ZW1wQnQsc2Vjb25kS2V5QnRbeV0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGZvcih6ID0gMDt6IDwgdGhpcmRMZW5ndGggO3ogKyspe1xyXG4gICAgICAgICAgIHRlbXBCdCA9IGVuYyh0ZW1wQnQsdGhpcmRLZXlCdFt6XSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgZW5jQnl0ZSA9IHRlbXBCdDtcclxuICAgICAgIH1lbHNle1xyXG4gICAgICAgICBpZihmaXJzdEtleSAhPSBudWxsICYmIGZpcnN0S2V5ICE9XCJcIiAmJiBzZWNvbmRLZXkgIT0gbnVsbCAmJiBzZWNvbmRLZXkgIT0gXCJcIil7XHJcbiAgICAgICAgICAgdmFyIHRlbXBCdDtcclxuICAgICAgICAgICB2YXIgeCx5O1xyXG4gICAgICAgICAgIHRlbXBCdCA9IHRlbXBCeXRlO1xyXG4gICAgICAgICAgIGZvcih4ID0gMDt4IDwgZmlyc3RMZW5ndGggO3ggKyspe1xyXG4gICAgICAgICAgICAgdGVtcEJ0ID0gZW5jKHRlbXBCdCxmaXJzdEtleUJ0W3hdKTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgZm9yKHkgPSAwO3kgPCBzZWNvbmRMZW5ndGggO3kgKyspe1xyXG4gICAgICAgICAgICAgdGVtcEJ0ID0gZW5jKHRlbXBCdCxzZWNvbmRLZXlCdFt5XSk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgIGVuY0J5dGUgPSB0ZW1wQnQ7XHJcbiAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgIGlmKGZpcnN0S2V5ICE9IG51bGwgJiYgZmlyc3RLZXkgIT1cIlwiKXsgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICB2YXIgdGVtcEJ0O1xyXG4gICAgICAgICAgICAgdmFyIHg7XHJcbiAgICAgICAgICAgICB0ZW1wQnQgPSB0ZW1wQnl0ZTtcclxuICAgICAgICAgICAgIGZvcih4ID0gMDt4IDwgZmlyc3RMZW5ndGggO3ggKyspeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgdGVtcEJ0ID0gZW5jKHRlbXBCdCxmaXJzdEtleUJ0W3hdKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGVuY0J5dGUgPSB0ZW1wQnQ7ICAgICAgICAgICAgICBcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgIH1cclxuICAgICAgIGVuY0RhdGEgKz0gYnQ2NFRvSGV4KGVuY0J5dGUpO1xyXG4gICAgIH0gICAgICBcclxuICAgICBpZihyZW1haW5kZXIgPiAwKXtcclxuICAgICAgIHZhciByZW1haW5kZXJEYXRhID0gZGF0YS5zdWJzdHJpbmcoaXRlcmF0b3IqNCswLGxlbmcpO1xyXG4gICAgICAgdmFyIHRlbXBCeXRlID0gc3RyVG9CdChyZW1haW5kZXJEYXRhKTtcclxuICAgICAgIHZhciBlbmNCeXRlIDtcclxuICAgICAgIGlmKGZpcnN0S2V5ICE9IG51bGwgJiYgZmlyc3RLZXkgIT1cIlwiICYmIHNlY29uZEtleSAhPSBudWxsICYmIHNlY29uZEtleSAhPSBcIlwiICYmIHRoaXJkS2V5ICE9IG51bGwgJiYgdGhpcmRLZXkgIT0gXCJcIil7XHJcbiAgICAgICAgIHZhciB0ZW1wQnQ7XHJcbiAgICAgICAgIHZhciB4LHksejtcclxuICAgICAgICAgdGVtcEJ0ID0gdGVtcEJ5dGU7XHJcbiAgICAgICAgIGZvcih4ID0gMDt4IDwgZmlyc3RMZW5ndGggO3ggKyspe1xyXG4gICAgICAgICAgIHRlbXBCdCA9IGVuYyh0ZW1wQnQsZmlyc3RLZXlCdFt4XSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgZm9yKHkgPSAwO3kgPCBzZWNvbmRMZW5ndGggO3kgKyspe1xyXG4gICAgICAgICAgIHRlbXBCdCA9IGVuYyh0ZW1wQnQsc2Vjb25kS2V5QnRbeV0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGZvcih6ID0gMDt6IDwgdGhpcmRMZW5ndGggO3ogKyspe1xyXG4gICAgICAgICAgIHRlbXBCdCA9IGVuYyh0ZW1wQnQsdGhpcmRLZXlCdFt6XSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgZW5jQnl0ZSA9IHRlbXBCdDtcclxuICAgICAgIH1lbHNle1xyXG4gICAgICAgICBpZihmaXJzdEtleSAhPSBudWxsICYmIGZpcnN0S2V5ICE9XCJcIiAmJiBzZWNvbmRLZXkgIT0gbnVsbCAmJiBzZWNvbmRLZXkgIT0gXCJcIil7XHJcbiAgICAgICAgICAgdmFyIHRlbXBCdDtcclxuICAgICAgICAgICB2YXIgeCx5O1xyXG4gICAgICAgICAgIHRlbXBCdCA9IHRlbXBCeXRlO1xyXG4gICAgICAgICAgIGZvcih4ID0gMDt4IDwgZmlyc3RMZW5ndGggO3ggKyspe1xyXG4gICAgICAgICAgICAgdGVtcEJ0ID0gZW5jKHRlbXBCdCxmaXJzdEtleUJ0W3hdKTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgZm9yKHkgPSAwO3kgPCBzZWNvbmRMZW5ndGggO3kgKyspe1xyXG4gICAgICAgICAgICAgdGVtcEJ0ID0gZW5jKHRlbXBCdCxzZWNvbmRLZXlCdFt5XSk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgIGVuY0J5dGUgPSB0ZW1wQnQ7XHJcbiAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgIGlmKGZpcnN0S2V5ICE9IG51bGwgJiYgZmlyc3RLZXkgIT1cIlwiKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgIHZhciB0ZW1wQnQ7XHJcbiAgICAgICAgICAgICB2YXIgeDtcclxuICAgICAgICAgICAgIHRlbXBCdCA9IHRlbXBCeXRlO1xyXG4gICAgICAgICAgICAgZm9yKHggPSAwO3ggPCBmaXJzdExlbmd0aCA7eCArKyl7XHJcbiAgICAgICAgICAgICAgIHRlbXBCdCA9IGVuYyh0ZW1wQnQsZmlyc3RLZXlCdFt4XSk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbmNCeXRlID0gdGVtcEJ0O1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICAgfVxyXG4gICAgICAgZW5jRGF0YSArPSBidDY0VG9IZXgoZW5jQnl0ZSk7XHJcbiAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgfVxyXG4gfVxyXG4gcmV0dXJuIGVuY0RhdGE7XHJcbn1cclxuXHJcbi8qXHJcbiogZGVjcnlwdCB0aGUgZW5jcnlwdGVkIHN0cmluZyB0byB0aGUgb3JpZ2luYWwgc3RyaW5nIFxyXG4qXHJcbiogcmV0dXJuICB0aGUgb3JpZ2luYWwgc3RyaW5nICBcclxuKi9cclxuZnVuY3Rpb24gc3RyRGVjKGRhdGEsZmlyc3RLZXksc2Vjb25kS2V5LHRoaXJkS2V5KXtcclxuIHZhciBsZW5nID0gZGF0YS5sZW5ndGg7XHJcbiB2YXIgZGVjU3RyID0gXCJcIjtcclxuIHZhciBmaXJzdEtleUJ0LHNlY29uZEtleUJ0LHRoaXJkS2V5QnQsZmlyc3RMZW5ndGgsc2Vjb25kTGVuZ3RoLHRoaXJkTGVuZ3RoO1xyXG4gaWYoZmlyc3RLZXkgIT0gbnVsbCAmJiBmaXJzdEtleSAhPSBcIlwiKXsgICAgXHJcbiAgIGZpcnN0S2V5QnQgPSBnZXRLZXlCeXRlcyhmaXJzdEtleSk7XHJcbiAgIGZpcnN0TGVuZ3RoID0gZmlyc3RLZXlCdC5sZW5ndGg7XHJcbiB9XHJcbiBpZihzZWNvbmRLZXkgIT0gbnVsbCAmJiBzZWNvbmRLZXkgIT0gXCJcIil7XHJcbiAgIHNlY29uZEtleUJ0ID0gZ2V0S2V5Qnl0ZXMoc2Vjb25kS2V5KTtcclxuICAgc2Vjb25kTGVuZ3RoID0gc2Vjb25kS2V5QnQubGVuZ3RoO1xyXG4gfVxyXG4gaWYodGhpcmRLZXkgIT0gbnVsbCAmJiB0aGlyZEtleSAhPSBcIlwiKXtcclxuICAgdGhpcmRLZXlCdCA9IGdldEtleUJ5dGVzKHRoaXJkS2V5KTtcclxuICAgdGhpcmRMZW5ndGggPSB0aGlyZEtleUJ0Lmxlbmd0aDtcclxuIH1cclxuIFxyXG4gdmFyIGl0ZXJhdG9yID0gcGFyc2VJbnQobGVuZy8xNik7XHJcbiB2YXIgaT0wOyAgXHJcbiBmb3IoaSA9IDA7aSA8IGl0ZXJhdG9yO2krKyl7XHJcbiAgIHZhciB0ZW1wRGF0YSA9IGRhdGEuc3Vic3RyaW5nKGkqMTYrMCxpKjE2KzE2KTsgICAgXHJcbiAgIHZhciBzdHJCeXRlID0gaGV4VG9CdDY0KHRlbXBEYXRhKTsgICAgXHJcbiAgIHZhciBpbnRCeXRlID0gbmV3IEFycmF5KDY0KTtcclxuICAgdmFyIGogPSAwO1xyXG4gICBmb3IoaiA9IDA7aiA8IDY0OyBqKyspe1xyXG4gICAgIGludEJ5dGVbal0gPSBwYXJzZUludChzdHJCeXRlLnN1YnN0cmluZyhqLGorMSkpO1xyXG4gICB9ICAgIFxyXG4gICB2YXIgZGVjQnl0ZTtcclxuICAgaWYoZmlyc3RLZXkgIT0gbnVsbCAmJiBmaXJzdEtleSAhPVwiXCIgJiYgc2Vjb25kS2V5ICE9IG51bGwgJiYgc2Vjb25kS2V5ICE9IFwiXCIgJiYgdGhpcmRLZXkgIT0gbnVsbCAmJiB0aGlyZEtleSAhPSBcIlwiKXtcclxuICAgICB2YXIgdGVtcEJ0O1xyXG4gICAgIHZhciB4LHksejtcclxuICAgICB0ZW1wQnQgPSBpbnRCeXRlO1xyXG4gICAgIGZvcih4ID0gdGhpcmRMZW5ndGggLSAxO3ggPj0gMDt4IC0tKXtcclxuICAgICAgIHRlbXBCdCA9IGRlYyh0ZW1wQnQsdGhpcmRLZXlCdFt4XSk7XHJcbiAgICAgfVxyXG4gICAgIGZvcih5ID0gc2Vjb25kTGVuZ3RoIC0gMTt5ID49IDA7eSAtLSl7XHJcbiAgICAgICB0ZW1wQnQgPSBkZWModGVtcEJ0LHNlY29uZEtleUJ0W3ldKTtcclxuICAgICB9XHJcbiAgICAgZm9yKHogPSBmaXJzdExlbmd0aCAtIDE7eiA+PSAwIDt6IC0tKXtcclxuICAgICAgIHRlbXBCdCA9IGRlYyh0ZW1wQnQsZmlyc3RLZXlCdFt6XSk7XHJcbiAgICAgfVxyXG4gICAgIGRlY0J5dGUgPSB0ZW1wQnQ7XHJcbiAgIH1lbHNle1xyXG4gICAgIGlmKGZpcnN0S2V5ICE9IG51bGwgJiYgZmlyc3RLZXkgIT1cIlwiICYmIHNlY29uZEtleSAhPSBudWxsICYmIHNlY29uZEtleSAhPSBcIlwiKXtcclxuICAgICAgIHZhciB0ZW1wQnQ7XHJcbiAgICAgICB2YXIgeCx5LHo7XHJcbiAgICAgICB0ZW1wQnQgPSBpbnRCeXRlO1xyXG4gICAgICAgZm9yKHggPSBzZWNvbmRMZW5ndGggLSAxO3ggPj0gMCA7eCAtLSl7XHJcbiAgICAgICAgIHRlbXBCdCA9IGRlYyh0ZW1wQnQsc2Vjb25kS2V5QnRbeF0pO1xyXG4gICAgICAgfVxyXG4gICAgICAgZm9yKHkgPSBmaXJzdExlbmd0aCAtIDE7eSA+PSAwIDt5IC0tKXtcclxuICAgICAgICAgdGVtcEJ0ID0gZGVjKHRlbXBCdCxmaXJzdEtleUJ0W3ldKTtcclxuICAgICAgIH1cclxuICAgICAgIGRlY0J5dGUgPSB0ZW1wQnQ7XHJcbiAgICAgfWVsc2V7XHJcbiAgICAgICBpZihmaXJzdEtleSAhPSBudWxsICYmIGZpcnN0S2V5ICE9XCJcIil7XHJcbiAgICAgICAgIHZhciB0ZW1wQnQ7XHJcbiAgICAgICAgIHZhciB4LHksejtcclxuICAgICAgICAgdGVtcEJ0ID0gaW50Qnl0ZTtcclxuICAgICAgICAgZm9yKHggPSBmaXJzdExlbmd0aCAtIDE7eCA+PSAwIDt4IC0tKXtcclxuICAgICAgICAgICB0ZW1wQnQgPSBkZWModGVtcEJ0LGZpcnN0S2V5QnRbeF0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGRlY0J5dGUgPSB0ZW1wQnQ7XHJcbiAgICAgICB9XHJcbiAgICAgfVxyXG4gICB9XHJcbiAgIGRlY1N0ciArPSBieXRlVG9TdHJpbmcoZGVjQnl0ZSk7XHJcbiB9ICAgICAgXHJcbiByZXR1cm4gZGVjU3RyO1xyXG59XHJcbi8qXHJcbiogY2hhbmcgdGhlIHN0cmluZyBpbnRvIHRoZSBiaXQgYXJyYXlcclxuKiBcclxuKiByZXR1cm4gYml0IGFycmF5KGl0J3MgbGVuZ3RoICUgNjQgPSAwKVxyXG4qL1xyXG5mdW5jdGlvbiBnZXRLZXlCeXRlcyhrZXkpe1xyXG4gdmFyIGtleUJ5dGVzID0gbmV3IEFycmF5KCk7XHJcbiB2YXIgbGVuZyA9IGtleS5sZW5ndGg7XHJcbiB2YXIgaXRlcmF0b3IgPSBwYXJzZUludChsZW5nLzQpO1xyXG4gdmFyIHJlbWFpbmRlciA9IGxlbmclNDtcclxuIHZhciBpID0gMDtcclxuIGZvcihpID0gMDtpIDwgaXRlcmF0b3I7IGkgKyspe1xyXG4gICBrZXlCeXRlc1tpXSA9IHN0clRvQnQoa2V5LnN1YnN0cmluZyhpKjQrMCxpKjQrNCkpO1xyXG4gfVxyXG4gaWYocmVtYWluZGVyID4gMCl7XHJcbiAgIGtleUJ5dGVzW2ldID0gc3RyVG9CdChrZXkuc3Vic3RyaW5nKGkqNCswLGxlbmcpKTtcclxuIH0gICAgXHJcbiByZXR1cm4ga2V5Qnl0ZXM7XHJcbn1cclxuXHJcbi8qXHJcbiogY2hhbmcgdGhlIHN0cmluZyhpdCdzIGxlbmd0aCA8PSA0KSBpbnRvIHRoZSBiaXQgYXJyYXlcclxuKiBcclxuKiByZXR1cm4gYml0IGFycmF5KGl0J3MgbGVuZ3RoID0gNjQpXHJcbiovXHJcbmZ1bmN0aW9uIHN0clRvQnQoc3RyKXsgIFxyXG4gdmFyIGxlbmcgPSBzdHIubGVuZ3RoO1xyXG4gdmFyIGJ0ID0gbmV3IEFycmF5KDY0KTtcclxuIGlmKGxlbmcgPCA0KXtcclxuICAgdmFyIGk9MCxqPTAscD0wLHE9MDtcclxuICAgZm9yKGkgPSAwO2k8bGVuZztpKyspe1xyXG4gICAgIHZhciBrID0gc3RyLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgZm9yKGo9MDtqPDE2O2orKyl7ICAgICAgXHJcbiAgICAgICB2YXIgcG93PTEsbT0wO1xyXG4gICAgICAgZm9yKG09MTU7bT5qO20tLSl7XHJcbiAgICAgICAgIHBvdyAqPSAyO1xyXG4gICAgICAgfSAgICAgICAgXHJcbiAgICAgICBidFsxNippK2pdPXBhcnNlSW50KGsvcG93KSUyO1xyXG4gICAgIH1cclxuICAgfVxyXG4gICBmb3IocCA9IGxlbmc7cDw0O3ArKyl7XHJcbiAgICAgdmFyIGsgPSAwO1xyXG4gICAgIGZvcihxPTA7cTwxNjtxKyspeyAgICAgIFxyXG4gICAgICAgdmFyIHBvdz0xLG09MDtcclxuICAgICAgIGZvcihtPTE1O20+cTttLS0pe1xyXG4gICAgICAgICBwb3cgKj0gMjtcclxuICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgYnRbMTYqcCtxXT1wYXJzZUludChrL3BvdyklMjtcclxuICAgICB9XHJcbiAgIH0gIFxyXG4gfWVsc2V7XHJcbiAgIGZvcihpID0gMDtpPDQ7aSsrKXtcclxuICAgICB2YXIgayA9IHN0ci5jaGFyQ29kZUF0KGkpO1xyXG4gICAgIGZvcihqPTA7ajwxNjtqKyspeyAgICAgIFxyXG4gICAgICAgdmFyIHBvdz0xO1xyXG4gICAgICAgZm9yKG09MTU7bT5qO20tLSl7XHJcbiAgICAgICAgIHBvdyAqPSAyO1xyXG4gICAgICAgfSAgICAgICAgXHJcbiAgICAgICBidFsxNippK2pdPXBhcnNlSW50KGsvcG93KSUyO1xyXG4gICAgIH1cclxuICAgfSAgXHJcbiB9XHJcbiByZXR1cm4gYnQ7XHJcbn1cclxuXHJcbi8qXHJcbiogY2hhbmcgdGhlIGJpdChpdCdzIGxlbmd0aCA9IDQpIGludG8gdGhlIGhleFxyXG4qIFxyXG4qIHJldHVybiBoZXhcclxuKi9cclxuZnVuY3Rpb24gYnQ0VG9IZXgoYmluYXJ5KSB7XHJcbiB2YXIgaGV4O1xyXG4gc3dpdGNoIChiaW5hcnkpIHtcclxuICAgY2FzZSBcIjAwMDBcIiA6IGhleCA9IFwiMFwiOyBicmVhaztcclxuICAgY2FzZSBcIjAwMDFcIiA6IGhleCA9IFwiMVwiOyBicmVhaztcclxuICAgY2FzZSBcIjAwMTBcIiA6IGhleCA9IFwiMlwiOyBicmVhaztcclxuICAgY2FzZSBcIjAwMTFcIiA6IGhleCA9IFwiM1wiOyBicmVhaztcclxuICAgY2FzZSBcIjAxMDBcIiA6IGhleCA9IFwiNFwiOyBicmVhaztcclxuICAgY2FzZSBcIjAxMDFcIiA6IGhleCA9IFwiNVwiOyBicmVhaztcclxuICAgY2FzZSBcIjAxMTBcIiA6IGhleCA9IFwiNlwiOyBicmVhaztcclxuICAgY2FzZSBcIjAxMTFcIiA6IGhleCA9IFwiN1wiOyBicmVhaztcclxuICAgY2FzZSBcIjEwMDBcIiA6IGhleCA9IFwiOFwiOyBicmVhaztcclxuICAgY2FzZSBcIjEwMDFcIiA6IGhleCA9IFwiOVwiOyBicmVhaztcclxuICAgY2FzZSBcIjEwMTBcIiA6IGhleCA9IFwiQVwiOyBicmVhaztcclxuICAgY2FzZSBcIjEwMTFcIiA6IGhleCA9IFwiQlwiOyBicmVhaztcclxuICAgY2FzZSBcIjExMDBcIiA6IGhleCA9IFwiQ1wiOyBicmVhaztcclxuICAgY2FzZSBcIjExMDFcIiA6IGhleCA9IFwiRFwiOyBicmVhaztcclxuICAgY2FzZSBcIjExMTBcIiA6IGhleCA9IFwiRVwiOyBicmVhaztcclxuICAgY2FzZSBcIjExMTFcIiA6IGhleCA9IFwiRlwiOyBicmVhaztcclxuIH1cclxuIHJldHVybiBoZXg7XHJcbn1cclxuXHJcbi8qXHJcbiogY2hhbmcgdGhlIGhleCBpbnRvIHRoZSBiaXQoaXQncyBsZW5ndGggPSA0KVxyXG4qIFxyXG4qIHJldHVybiB0aGUgYml0KGl0J3MgbGVuZ3RoID0gNClcclxuKi9cclxuZnVuY3Rpb24gaGV4VG9CdDQoaGV4KSB7XHJcbiB2YXIgYmluYXJ5O1xyXG4gc3dpdGNoIChoZXgpIHtcclxuICAgY2FzZSBcIjBcIiA6IGJpbmFyeSA9IFwiMDAwMFwiOyBicmVhaztcclxuICAgY2FzZSBcIjFcIiA6IGJpbmFyeSA9IFwiMDAwMVwiOyBicmVhaztcclxuICAgY2FzZSBcIjJcIiA6IGJpbmFyeSA9IFwiMDAxMFwiOyBicmVhaztcclxuICAgY2FzZSBcIjNcIiA6IGJpbmFyeSA9IFwiMDAxMVwiOyBicmVhaztcclxuICAgY2FzZSBcIjRcIiA6IGJpbmFyeSA9IFwiMDEwMFwiOyBicmVhaztcclxuICAgY2FzZSBcIjVcIiA6IGJpbmFyeSA9IFwiMDEwMVwiOyBicmVhaztcclxuICAgY2FzZSBcIjZcIiA6IGJpbmFyeSA9IFwiMDExMFwiOyBicmVhaztcclxuICAgY2FzZSBcIjdcIiA6IGJpbmFyeSA9IFwiMDExMVwiOyBicmVhaztcclxuICAgY2FzZSBcIjhcIiA6IGJpbmFyeSA9IFwiMTAwMFwiOyBicmVhaztcclxuICAgY2FzZSBcIjlcIiA6IGJpbmFyeSA9IFwiMTAwMVwiOyBicmVhaztcclxuICAgY2FzZSBcIkFcIiA6IGJpbmFyeSA9IFwiMTAxMFwiOyBicmVhaztcclxuICAgY2FzZSBcIkJcIiA6IGJpbmFyeSA9IFwiMTAxMVwiOyBicmVhaztcclxuICAgY2FzZSBcIkNcIiA6IGJpbmFyeSA9IFwiMTEwMFwiOyBicmVhaztcclxuICAgY2FzZSBcIkRcIiA6IGJpbmFyeSA9IFwiMTEwMVwiOyBicmVhaztcclxuICAgY2FzZSBcIkVcIiA6IGJpbmFyeSA9IFwiMTExMFwiOyBicmVhaztcclxuICAgY2FzZSBcIkZcIiA6IGJpbmFyeSA9IFwiMTExMVwiOyBicmVhaztcclxuIH1cclxuIHJldHVybiBiaW5hcnk7XHJcbn1cclxuXHJcbi8qXHJcbiogY2hhbmcgdGhlIGJpdChpdCdzIGxlbmd0aCA9IDY0KSBpbnRvIHRoZSBzdHJpbmdcclxuKiBcclxuKiByZXR1cm4gc3RyaW5nXHJcbiovXHJcbmZ1bmN0aW9uIGJ5dGVUb1N0cmluZyhieXRlRGF0YSl7XHJcbiB2YXIgc3RyPVwiXCI7XHJcbiBmb3IodmFyIGkgPSAwO2k8NDtpKyspe1xyXG4gICB2YXIgY291bnQ9MDtcclxuICAgZm9yKHZhciBqPTA7ajwxNjtqKyspeyAgICAgICAgXHJcbiAgICAgdmFyIHBvdz0xO1xyXG4gICAgIGZvcih2YXIgbT0xNTttPmo7bS0tKXtcclxuICAgICAgIHBvdyo9MjtcclxuICAgICB9ICAgICAgICAgICAgICBcclxuICAgICBjb3VudCs9Ynl0ZURhdGFbMTYqaStqXSpwb3c7XHJcbiAgIH0gICAgICAgIFxyXG4gICBpZihjb3VudCAhPSAwKXtcclxuICAgICBzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUoY291bnQpO1xyXG4gICB9XHJcbiB9XHJcbiByZXR1cm4gc3RyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBidDY0VG9IZXgoYnl0ZURhdGEpe1xyXG4gdmFyIGhleCA9IFwiXCI7XHJcbiBmb3IodmFyIGkgPSAwO2k8MTY7aSsrKXtcclxuICAgdmFyIGJ0ID0gXCJcIjtcclxuICAgZm9yKHZhciBqPTA7ajw0O2orKyl7ICAgIFxyXG4gICAgIGJ0ICs9IGJ5dGVEYXRhW2kqNCtqXTtcclxuICAgfSAgICBcclxuICAgaGV4Kz1idDRUb0hleChidCk7XHJcbiB9XHJcbiByZXR1cm4gaGV4O1xyXG59XHJcblxyXG5mdW5jdGlvbiBoZXhUb0J0NjQoaGV4KXtcclxuIHZhciBiaW5hcnkgPSBcIlwiO1xyXG4gZm9yKHZhciBpID0gMDtpPDE2O2krKyl7XHJcbiAgIGJpbmFyeSs9aGV4VG9CdDQoaGV4LnN1YnN0cmluZyhpLGkrMSkpO1xyXG4gfVxyXG4gcmV0dXJuIGJpbmFyeTtcclxufVxyXG5cclxuLypcclxuKiB0aGUgNjQgYml0IGRlcyBjb3JlIGFyaXRobWV0aWNcclxuKi9cclxuXHJcbmZ1bmN0aW9uIGVuYyhkYXRhQnl0ZSxrZXlCeXRlKXsgIFxyXG4gdmFyIGtleXMgPSBnZW5lcmF0ZUtleXMoa2V5Qnl0ZSk7ICAgIFxyXG4gdmFyIGlwQnl0ZSAgID0gaW5pdFBlcm11dGUoZGF0YUJ5dGUpOyAgXHJcbiB2YXIgaXBMZWZ0ICAgPSBuZXcgQXJyYXkoMzIpO1xyXG4gdmFyIGlwUmlnaHQgID0gbmV3IEFycmF5KDMyKTtcclxuIHZhciB0ZW1wTGVmdCA9IG5ldyBBcnJheSgzMik7XHJcbiB2YXIgaSA9IDAsaiA9IDAsayA9IDAsbSA9IDAsIG4gPSAwO1xyXG4gZm9yKGsgPSAwO2sgPCAzMjtrICsrKXtcclxuICAgaXBMZWZ0W2tdID0gaXBCeXRlW2tdO1xyXG4gICBpcFJpZ2h0W2tdID0gaXBCeXRlWzMyK2tdO1xyXG4gfSAgICBcclxuIGZvcihpID0gMDtpIDwgMTY7aSArKyl7XHJcbiAgIGZvcihqID0gMDtqIDwgMzI7aiArKyl7XHJcbiAgICAgdGVtcExlZnRbal0gPSBpcExlZnRbal07XHJcbiAgICAgaXBMZWZ0W2pdID0gaXBSaWdodFtqXTsgICAgICBcclxuICAgfSAgXHJcbiAgIHZhciBrZXkgPSBuZXcgQXJyYXkoNDgpO1xyXG4gICBmb3IobSA9IDA7bSA8IDQ4O20gKyspe1xyXG4gICAgIGtleVttXSA9IGtleXNbaV1bbV07XHJcbiAgIH1cclxuICAgdmFyICB0ZW1wUmlnaHQgPSB4b3IocFBlcm11dGUoc0JveFBlcm11dGUoeG9yKGV4cGFuZFBlcm11dGUoaXBSaWdodCksa2V5KSkpLCB0ZW1wTGVmdCk7ICAgICAgXHJcbiAgIGZvcihuID0gMDtuIDwgMzI7biArKyl7XHJcbiAgICAgaXBSaWdodFtuXSA9IHRlbXBSaWdodFtuXTtcclxuICAgfSAgXHJcbiAgIFxyXG4gfSAgXHJcbiBcclxuIFxyXG4gdmFyIGZpbmFsRGF0YSA9bmV3IEFycmF5KDY0KTtcclxuIGZvcihpID0gMDtpIDwgMzI7aSArKyl7XHJcbiAgIGZpbmFsRGF0YVtpXSA9IGlwUmlnaHRbaV07XHJcbiAgIGZpbmFsRGF0YVszMitpXSA9IGlwTGVmdFtpXTtcclxuIH1cclxuIHJldHVybiBmaW5hbGx5UGVybXV0ZShmaW5hbERhdGEpOyAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlYyhkYXRhQnl0ZSxrZXlCeXRlKXsgIFxyXG4gdmFyIGtleXMgPSBnZW5lcmF0ZUtleXMoa2V5Qnl0ZSk7ICAgIFxyXG4gdmFyIGlwQnl0ZSAgID0gaW5pdFBlcm11dGUoZGF0YUJ5dGUpOyAgXHJcbiB2YXIgaXBMZWZ0ICAgPSBuZXcgQXJyYXkoMzIpO1xyXG4gdmFyIGlwUmlnaHQgID0gbmV3IEFycmF5KDMyKTtcclxuIHZhciB0ZW1wTGVmdCA9IG5ldyBBcnJheSgzMik7XHJcbiB2YXIgaSA9IDAsaiA9IDAsayA9IDAsbSA9IDAsIG4gPSAwO1xyXG4gZm9yKGsgPSAwO2sgPCAzMjtrICsrKXtcclxuICAgaXBMZWZ0W2tdID0gaXBCeXRlW2tdO1xyXG4gICBpcFJpZ2h0W2tdID0gaXBCeXRlWzMyK2tdO1xyXG4gfSAgXHJcbiBmb3IoaSA9IDE1O2kgPj0gMDtpIC0tKXtcclxuICAgZm9yKGogPSAwO2ogPCAzMjtqICsrKXtcclxuICAgICB0ZW1wTGVmdFtqXSA9IGlwTGVmdFtqXTtcclxuICAgICBpcExlZnRbal0gPSBpcFJpZ2h0W2pdOyAgICAgIFxyXG4gICB9ICBcclxuICAgdmFyIGtleSA9IG5ldyBBcnJheSg0OCk7XHJcbiAgIGZvcihtID0gMDttIDwgNDg7bSArKyl7XHJcbiAgICAga2V5W21dID0ga2V5c1tpXVttXTtcclxuICAgfVxyXG4gICBcclxuICAgdmFyICB0ZW1wUmlnaHQgPSB4b3IocFBlcm11dGUoc0JveFBlcm11dGUoeG9yKGV4cGFuZFBlcm11dGUoaXBSaWdodCksa2V5KSkpLCB0ZW1wTGVmdCk7ICAgICAgXHJcbiAgIGZvcihuID0gMDtuIDwgMzI7biArKyl7XHJcbiAgICAgaXBSaWdodFtuXSA9IHRlbXBSaWdodFtuXTtcclxuICAgfSAgXHJcbiB9ICBcclxuIFxyXG4gXHJcbiB2YXIgZmluYWxEYXRhID1uZXcgQXJyYXkoNjQpO1xyXG4gZm9yKGkgPSAwO2kgPCAzMjtpICsrKXtcclxuICAgZmluYWxEYXRhW2ldID0gaXBSaWdodFtpXTtcclxuICAgZmluYWxEYXRhWzMyK2ldID0gaXBMZWZ0W2ldO1xyXG4gfVxyXG4gcmV0dXJuIGZpbmFsbHlQZXJtdXRlKGZpbmFsRGF0YSk7ICBcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFBlcm11dGUob3JpZ2luYWxEYXRhKXtcclxuIHZhciBpcEJ5dGUgPSBuZXcgQXJyYXkoNjQpO1xyXG4gZm9yICh2YXIgaSA9IDAsIG0gPSAxLCBuID0gMDsgaSA8IDQ7IGkrKywgbSArPSAyLCBuICs9IDIpIHtcclxuICAgZm9yICh2YXIgaiA9IDcsIGsgPSAwOyBqID49IDA7IGotLSwgaysrKSB7XHJcbiAgICAgaXBCeXRlW2kgKiA4ICsga10gPSBvcmlnaW5hbERhdGFbaiAqIDggKyBtXTtcclxuICAgICBpcEJ5dGVbaSAqIDggKyBrICsgMzJdID0gb3JpZ2luYWxEYXRhW2ogKiA4ICsgbl07XHJcbiAgIH1cclxuIH0gICAgXHJcbiByZXR1cm4gaXBCeXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBleHBhbmRQZXJtdXRlKHJpZ2h0RGF0YSl7ICBcclxuIHZhciBlcEJ5dGUgPSBuZXcgQXJyYXkoNDgpO1xyXG4gZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcclxuICAgaWYgKGkgPT0gMCkge1xyXG4gICAgIGVwQnl0ZVtpICogNiArIDBdID0gcmlnaHREYXRhWzMxXTtcclxuICAgfSBlbHNlIHtcclxuICAgICBlcEJ5dGVbaSAqIDYgKyAwXSA9IHJpZ2h0RGF0YVtpICogNCAtIDFdO1xyXG4gICB9XHJcbiAgIGVwQnl0ZVtpICogNiArIDFdID0gcmlnaHREYXRhW2kgKiA0ICsgMF07XHJcbiAgIGVwQnl0ZVtpICogNiArIDJdID0gcmlnaHREYXRhW2kgKiA0ICsgMV07XHJcbiAgIGVwQnl0ZVtpICogNiArIDNdID0gcmlnaHREYXRhW2kgKiA0ICsgMl07XHJcbiAgIGVwQnl0ZVtpICogNiArIDRdID0gcmlnaHREYXRhW2kgKiA0ICsgM107XHJcbiAgIGlmIChpID09IDcpIHtcclxuICAgICBlcEJ5dGVbaSAqIDYgKyA1XSA9IHJpZ2h0RGF0YVswXTtcclxuICAgfSBlbHNlIHtcclxuICAgICBlcEJ5dGVbaSAqIDYgKyA1XSA9IHJpZ2h0RGF0YVtpICogNCArIDRdO1xyXG4gICB9XHJcbiB9ICAgICAgXHJcbiByZXR1cm4gZXBCeXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiB4b3IoYnl0ZU9uZSxieXRlVHdvKXsgIFxyXG4gdmFyIHhvckJ5dGUgPSBuZXcgQXJyYXkoYnl0ZU9uZS5sZW5ndGgpO1xyXG4gZm9yKHZhciBpID0gMDtpIDwgYnl0ZU9uZS5sZW5ndGg7IGkgKyspeyAgICAgIFxyXG4gICB4b3JCeXRlW2ldID0gYnl0ZU9uZVtpXSBeIGJ5dGVUd29baV07XHJcbiB9ICBcclxuIHJldHVybiB4b3JCeXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzQm94UGVybXV0ZShleHBhbmRCeXRlKXtcclxuIFxyXG4gICB2YXIgc0JveEJ5dGUgPSBuZXcgQXJyYXkoMzIpO1xyXG4gICB2YXIgYmluYXJ5ID0gXCJcIjtcclxuICAgdmFyIHMxID0gW1xyXG4gICAgICAgWzE0LCA0LCAxMywgMSwgMiwgMTUsIDExLCA4LCAzLCAxMCwgNiwgMTIsIDUsIDksIDAsIDddLFxyXG4gICAgICAgWzAsIDE1LCA3LCA0LCAxNCwgMiwgMTMsIDEsIDEwLCA2LCAxMiwgMTEsIDksIDUsIDMsIDhdLFxyXG4gICAgICAgWzQsIDEsIDE0LCA4LCAxMywgNiwgMiwgMTEsIDE1LCAxMiwgOSwgNywgMywgMTAsIDUsIDBdLFxyXG4gICAgICAgWzE1LCAxMiwgOCwgMiwgNCwgOSwgMSwgNywgNSwgMTEsIDMsIDE0LCAxMCwgMCwgNiwgMTMgXV07XHJcblxyXG4gICAgICAgLyogVGFibGUgLSBzMiAqL1xyXG4gICB2YXIgczIgPSBbXHJcbiAgICAgICBbMTUsIDEsIDgsIDE0LCA2LCAxMSwgMywgNCwgOSwgNywgMiwgMTMsIDEyLCAwLCA1LCAxMF0sXHJcbiAgICAgICBbMywgMTMsIDQsIDcsIDE1LCAyLCA4LCAxNCwgMTIsIDAsIDEsIDEwLCA2LCA5LCAxMSwgNV0sXHJcbiAgICAgICBbMCwgMTQsIDcsIDExLCAxMCwgNCwgMTMsIDEsIDUsIDgsIDEyLCA2LCA5LCAzLCAyLCAxNV0sXHJcbiAgICAgICBbMTMsIDgsIDEwLCAxLCAzLCAxNSwgNCwgMiwgMTEsIDYsIDcsIDEyLCAwLCA1LCAxNCwgOSBdXTtcclxuXHJcbiAgICAgICAvKiBUYWJsZSAtIHMzICovXHJcbiAgIHZhciBzMz0gW1xyXG4gICAgICAgWzEwLCAwLCA5LCAxNCwgNiwgMywgMTUsIDUsIDEsIDEzLCAxMiwgNywgMTEsIDQsIDIsIDhdLFxyXG4gICAgICAgWzEzLCA3LCAwLCA5LCAzLCA0LCA2LCAxMCwgMiwgOCwgNSwgMTQsIDEyLCAxMSwgMTUsIDFdLFxyXG4gICAgICAgWzEzLCA2LCA0LCA5LCA4LCAxNSwgMywgMCwgMTEsIDEsIDIsIDEyLCA1LCAxMCwgMTQsIDddLFxyXG4gICAgICAgWzEsIDEwLCAxMywgMCwgNiwgOSwgOCwgNywgNCwgMTUsIDE0LCAzLCAxMSwgNSwgMiwgMTIgXV07XHJcbiAgICAgICAvKiBUYWJsZSAtIHM0ICovXHJcbiAgIHZhciBzNCA9IFtcclxuICAgICAgIFs3LCAxMywgMTQsIDMsIDAsIDYsIDksIDEwLCAxLCAyLCA4LCA1LCAxMSwgMTIsIDQsIDE1XSxcclxuICAgICAgIFsxMywgOCwgMTEsIDUsIDYsIDE1LCAwLCAzLCA0LCA3LCAyLCAxMiwgMSwgMTAsIDE0LCA5XSxcclxuICAgICAgIFsxMCwgNiwgOSwgMCwgMTIsIDExLCA3LCAxMywgMTUsIDEsIDMsIDE0LCA1LCAyLCA4LCA0XSxcclxuICAgICAgIFszLCAxNSwgMCwgNiwgMTAsIDEsIDEzLCA4LCA5LCA0LCA1LCAxMSwgMTIsIDcsIDIsIDE0IF1dO1xyXG5cclxuICAgICAgIC8qIFRhYmxlIC0gczUgKi9cclxuICAgdmFyIHM1ID0gW1xyXG4gICAgICAgWzIsIDEyLCA0LCAxLCA3LCAxMCwgMTEsIDYsIDgsIDUsIDMsIDE1LCAxMywgMCwgMTQsIDldLFxyXG4gICAgICAgWzE0LCAxMSwgMiwgMTIsIDQsIDcsIDEzLCAxLCA1LCAwLCAxNSwgMTAsIDMsIDksIDgsIDZdLFxyXG4gICAgICAgWzQsIDIsIDEsIDExLCAxMCwgMTMsIDcsIDgsIDE1LCA5LCAxMiwgNSwgNiwgMywgMCwgMTRdLFxyXG4gICAgICAgWzExLCA4LCAxMiwgNywgMSwgMTQsIDIsIDEzLCA2LCAxNSwgMCwgOSwgMTAsIDQsIDUsIDMgXV07XHJcblxyXG4gICAgICAgLyogVGFibGUgLSBzNiAqL1xyXG4gICB2YXIgczYgPSBbXHJcbiAgICAgICBbMTIsIDEsIDEwLCAxNSwgOSwgMiwgNiwgOCwgMCwgMTMsIDMsIDQsIDE0LCA3LCA1LCAxMV0sXHJcbiAgICAgICBbMTAsIDE1LCA0LCAyLCA3LCAxMiwgOSwgNSwgNiwgMSwgMTMsIDE0LCAwLCAxMSwgMywgOF0sXHJcbiAgICAgICBbOSwgMTQsIDE1LCA1LCAyLCA4LCAxMiwgMywgNywgMCwgNCwgMTAsIDEsIDEzLCAxMSwgNl0sXHJcbiAgICAgICBbNCwgMywgMiwgMTIsIDksIDUsIDE1LCAxMCwgMTEsIDE0LCAxLCA3LCA2LCAwLCA4LCAxMyBdXTtcclxuXHJcbiAgICAgICAvKiBUYWJsZSAtIHM3ICovXHJcbiAgIHZhciBzNyA9IFtcclxuICAgICAgIFs0LCAxMSwgMiwgMTQsIDE1LCAwLCA4LCAxMywgMywgMTIsIDksIDcsIDUsIDEwLCA2LCAxXSxcclxuICAgICAgIFsxMywgMCwgMTEsIDcsIDQsIDksIDEsIDEwLCAxNCwgMywgNSwgMTIsIDIsIDE1LCA4LCA2XSxcclxuICAgICAgIFsxLCA0LCAxMSwgMTMsIDEyLCAzLCA3LCAxNCwgMTAsIDE1LCA2LCA4LCAwLCA1LCA5LCAyXSxcclxuICAgICAgIFs2LCAxMSwgMTMsIDgsIDEsIDQsIDEwLCA3LCA5LCA1LCAwLCAxNSwgMTQsIDIsIDMsIDEyXV07XHJcblxyXG4gICAgICAgLyogVGFibGUgLSBzOCAqL1xyXG4gICB2YXIgczggPSBbXHJcbiAgICAgICBbMTMsIDIsIDgsIDQsIDYsIDE1LCAxMSwgMSwgMTAsIDksIDMsIDE0LCA1LCAwLCAxMiwgN10sXHJcbiAgICAgICBbMSwgMTUsIDEzLCA4LCAxMCwgMywgNywgNCwgMTIsIDUsIDYsIDExLCAwLCAxNCwgOSwgMl0sXHJcbiAgICAgICBbNywgMTEsIDQsIDEsIDksIDEyLCAxNCwgMiwgMCwgNiwgMTAsIDEzLCAxNSwgMywgNSwgOF0sXHJcbiAgICAgICBbMiwgMSwgMTQsIDcsIDQsIDEwLCA4LCAxMywgMTUsIDEyLCA5LCAwLCAzLCA1LCA2LCAxMV1dO1xyXG4gICBcclxuICAgZm9yKHZhciBtPTA7bTw4O20rKyl7XHJcbiAgIHZhciBpPTAsaj0wO1xyXG4gICBpID0gZXhwYW5kQnl0ZVttKjYrMF0qMitleHBhbmRCeXRlW20qNis1XTtcclxuICAgaiA9IGV4cGFuZEJ5dGVbbSAqIDYgKyAxXSAqIDIgKiAyICogMiBcclxuICAgICArIGV4cGFuZEJ5dGVbbSAqIDYgKyAyXSAqIDIqIDIgXHJcbiAgICAgKyBleHBhbmRCeXRlW20gKiA2ICsgM10gKiAyIFxyXG4gICAgICsgZXhwYW5kQnl0ZVttICogNiArIDRdO1xyXG4gICBzd2l0Y2ggKG0pIHtcclxuICAgICBjYXNlIDAgOlxyXG4gICAgICAgYmluYXJ5ID0gZ2V0Qm94QmluYXJ5KHMxW2ldW2pdKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGNhc2UgMSA6XHJcbiAgICAgICBiaW5hcnkgPSBnZXRCb3hCaW5hcnkoczJbaV1bal0pO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSAyIDpcclxuICAgICAgIGJpbmFyeSA9IGdldEJveEJpbmFyeShzM1tpXVtqXSk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIDMgOlxyXG4gICAgICAgYmluYXJ5ID0gZ2V0Qm94QmluYXJ5KHM0W2ldW2pdKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGNhc2UgNCA6XHJcbiAgICAgICBiaW5hcnkgPSBnZXRCb3hCaW5hcnkoczVbaV1bal0pO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSA1IDpcclxuICAgICAgIGJpbmFyeSA9IGdldEJveEJpbmFyeShzNltpXVtqXSk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIDYgOlxyXG4gICAgICAgYmluYXJ5ID0gZ2V0Qm94QmluYXJ5KHM3W2ldW2pdKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGNhc2UgNyA6XHJcbiAgICAgICBiaW5hcnkgPSBnZXRCb3hCaW5hcnkoczhbaV1bal0pO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgIH0gICAgICBcclxuICAgc0JveEJ5dGVbbSo0KzBdID0gcGFyc2VJbnQoYmluYXJ5LnN1YnN0cmluZygwLDEpKTtcclxuICAgc0JveEJ5dGVbbSo0KzFdID0gcGFyc2VJbnQoYmluYXJ5LnN1YnN0cmluZygxLDIpKTtcclxuICAgc0JveEJ5dGVbbSo0KzJdID0gcGFyc2VJbnQoYmluYXJ5LnN1YnN0cmluZygyLDMpKTtcclxuICAgc0JveEJ5dGVbbSo0KzNdID0gcGFyc2VJbnQoYmluYXJ5LnN1YnN0cmluZygzLDQpKTtcclxuIH1cclxuIHJldHVybiBzQm94Qnl0ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gcFBlcm11dGUoc0JveEJ5dGUpe1xyXG4gdmFyIHBCb3hQZXJtdXRlID0gbmV3IEFycmF5KDMyKTtcclxuIHBCb3hQZXJtdXRlWyAwXSA9IHNCb3hCeXRlWzE1XTsgXHJcbiBwQm94UGVybXV0ZVsgMV0gPSBzQm94Qnl0ZVsgNl07IFxyXG4gcEJveFBlcm11dGVbIDJdID0gc0JveEJ5dGVbMTldOyBcclxuIHBCb3hQZXJtdXRlWyAzXSA9IHNCb3hCeXRlWzIwXTsgXHJcbiBwQm94UGVybXV0ZVsgNF0gPSBzQm94Qnl0ZVsyOF07IFxyXG4gcEJveFBlcm11dGVbIDVdID0gc0JveEJ5dGVbMTFdOyBcclxuIHBCb3hQZXJtdXRlWyA2XSA9IHNCb3hCeXRlWzI3XTsgXHJcbiBwQm94UGVybXV0ZVsgN10gPSBzQm94Qnl0ZVsxNl07IFxyXG4gcEJveFBlcm11dGVbIDhdID0gc0JveEJ5dGVbIDBdOyBcclxuIHBCb3hQZXJtdXRlWyA5XSA9IHNCb3hCeXRlWzE0XTsgXHJcbiBwQm94UGVybXV0ZVsxMF0gPSBzQm94Qnl0ZVsyMl07IFxyXG4gcEJveFBlcm11dGVbMTFdID0gc0JveEJ5dGVbMjVdOyBcclxuIHBCb3hQZXJtdXRlWzEyXSA9IHNCb3hCeXRlWyA0XTsgXHJcbiBwQm94UGVybXV0ZVsxM10gPSBzQm94Qnl0ZVsxN107IFxyXG4gcEJveFBlcm11dGVbMTRdID0gc0JveEJ5dGVbMzBdOyBcclxuIHBCb3hQZXJtdXRlWzE1XSA9IHNCb3hCeXRlWyA5XTsgXHJcbiBwQm94UGVybXV0ZVsxNl0gPSBzQm94Qnl0ZVsgMV07IFxyXG4gcEJveFBlcm11dGVbMTddID0gc0JveEJ5dGVbIDddOyBcclxuIHBCb3hQZXJtdXRlWzE4XSA9IHNCb3hCeXRlWzIzXTsgXHJcbiBwQm94UGVybXV0ZVsxOV0gPSBzQm94Qnl0ZVsxM107IFxyXG4gcEJveFBlcm11dGVbMjBdID0gc0JveEJ5dGVbMzFdOyBcclxuIHBCb3hQZXJtdXRlWzIxXSA9IHNCb3hCeXRlWzI2XTsgXHJcbiBwQm94UGVybXV0ZVsyMl0gPSBzQm94Qnl0ZVsgMl07IFxyXG4gcEJveFBlcm11dGVbMjNdID0gc0JveEJ5dGVbIDhdOyBcclxuIHBCb3hQZXJtdXRlWzI0XSA9IHNCb3hCeXRlWzE4XTsgXHJcbiBwQm94UGVybXV0ZVsyNV0gPSBzQm94Qnl0ZVsxMl07IFxyXG4gcEJveFBlcm11dGVbMjZdID0gc0JveEJ5dGVbMjldOyBcclxuIHBCb3hQZXJtdXRlWzI3XSA9IHNCb3hCeXRlWyA1XTsgXHJcbiBwQm94UGVybXV0ZVsyOF0gPSBzQm94Qnl0ZVsyMV07IFxyXG4gcEJveFBlcm11dGVbMjldID0gc0JveEJ5dGVbMTBdOyBcclxuIHBCb3hQZXJtdXRlWzMwXSA9IHNCb3hCeXRlWyAzXTsgXHJcbiBwQm94UGVybXV0ZVszMV0gPSBzQm94Qnl0ZVsyNF07ICAgIFxyXG4gcmV0dXJuIHBCb3hQZXJtdXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5hbGx5UGVybXV0ZShlbmRCeXRlKXsgICAgXHJcbiB2YXIgZnBCeXRlID0gbmV3IEFycmF5KDY0KTsgIFxyXG4gZnBCeXRlWyAwXSA9IGVuZEJ5dGVbMzldOyBcclxuIGZwQnl0ZVsgMV0gPSBlbmRCeXRlWyA3XTsgXHJcbiBmcEJ5dGVbIDJdID0gZW5kQnl0ZVs0N107IFxyXG4gZnBCeXRlWyAzXSA9IGVuZEJ5dGVbMTVdOyBcclxuIGZwQnl0ZVsgNF0gPSBlbmRCeXRlWzU1XTsgXHJcbiBmcEJ5dGVbIDVdID0gZW5kQnl0ZVsyM107IFxyXG4gZnBCeXRlWyA2XSA9IGVuZEJ5dGVbNjNdOyBcclxuIGZwQnl0ZVsgN10gPSBlbmRCeXRlWzMxXTsgXHJcbiBmcEJ5dGVbIDhdID0gZW5kQnl0ZVszOF07IFxyXG4gZnBCeXRlWyA5XSA9IGVuZEJ5dGVbIDZdOyBcclxuIGZwQnl0ZVsxMF0gPSBlbmRCeXRlWzQ2XTsgXHJcbiBmcEJ5dGVbMTFdID0gZW5kQnl0ZVsxNF07IFxyXG4gZnBCeXRlWzEyXSA9IGVuZEJ5dGVbNTRdOyBcclxuIGZwQnl0ZVsxM10gPSBlbmRCeXRlWzIyXTsgXHJcbiBmcEJ5dGVbMTRdID0gZW5kQnl0ZVs2Ml07IFxyXG4gZnBCeXRlWzE1XSA9IGVuZEJ5dGVbMzBdOyBcclxuIGZwQnl0ZVsxNl0gPSBlbmRCeXRlWzM3XTsgXHJcbiBmcEJ5dGVbMTddID0gZW5kQnl0ZVsgNV07IFxyXG4gZnBCeXRlWzE4XSA9IGVuZEJ5dGVbNDVdOyBcclxuIGZwQnl0ZVsxOV0gPSBlbmRCeXRlWzEzXTsgXHJcbiBmcEJ5dGVbMjBdID0gZW5kQnl0ZVs1M107IFxyXG4gZnBCeXRlWzIxXSA9IGVuZEJ5dGVbMjFdOyBcclxuIGZwQnl0ZVsyMl0gPSBlbmRCeXRlWzYxXTsgXHJcbiBmcEJ5dGVbMjNdID0gZW5kQnl0ZVsyOV07IFxyXG4gZnBCeXRlWzI0XSA9IGVuZEJ5dGVbMzZdOyBcclxuIGZwQnl0ZVsyNV0gPSBlbmRCeXRlWyA0XTsgXHJcbiBmcEJ5dGVbMjZdID0gZW5kQnl0ZVs0NF07IFxyXG4gZnBCeXRlWzI3XSA9IGVuZEJ5dGVbMTJdOyBcclxuIGZwQnl0ZVsyOF0gPSBlbmRCeXRlWzUyXTsgXHJcbiBmcEJ5dGVbMjldID0gZW5kQnl0ZVsyMF07IFxyXG4gZnBCeXRlWzMwXSA9IGVuZEJ5dGVbNjBdOyBcclxuIGZwQnl0ZVszMV0gPSBlbmRCeXRlWzI4XTsgXHJcbiBmcEJ5dGVbMzJdID0gZW5kQnl0ZVszNV07IFxyXG4gZnBCeXRlWzMzXSA9IGVuZEJ5dGVbIDNdOyBcclxuIGZwQnl0ZVszNF0gPSBlbmRCeXRlWzQzXTsgXHJcbiBmcEJ5dGVbMzVdID0gZW5kQnl0ZVsxMV07IFxyXG4gZnBCeXRlWzM2XSA9IGVuZEJ5dGVbNTFdOyBcclxuIGZwQnl0ZVszN10gPSBlbmRCeXRlWzE5XTsgXHJcbiBmcEJ5dGVbMzhdID0gZW5kQnl0ZVs1OV07IFxyXG4gZnBCeXRlWzM5XSA9IGVuZEJ5dGVbMjddOyBcclxuIGZwQnl0ZVs0MF0gPSBlbmRCeXRlWzM0XTsgXHJcbiBmcEJ5dGVbNDFdID0gZW5kQnl0ZVsgMl07IFxyXG4gZnBCeXRlWzQyXSA9IGVuZEJ5dGVbNDJdOyBcclxuIGZwQnl0ZVs0M10gPSBlbmRCeXRlWzEwXTsgXHJcbiBmcEJ5dGVbNDRdID0gZW5kQnl0ZVs1MF07IFxyXG4gZnBCeXRlWzQ1XSA9IGVuZEJ5dGVbMThdOyBcclxuIGZwQnl0ZVs0Nl0gPSBlbmRCeXRlWzU4XTsgXHJcbiBmcEJ5dGVbNDddID0gZW5kQnl0ZVsyNl07IFxyXG4gZnBCeXRlWzQ4XSA9IGVuZEJ5dGVbMzNdOyBcclxuIGZwQnl0ZVs0OV0gPSBlbmRCeXRlWyAxXTsgXHJcbiBmcEJ5dGVbNTBdID0gZW5kQnl0ZVs0MV07IFxyXG4gZnBCeXRlWzUxXSA9IGVuZEJ5dGVbIDldOyBcclxuIGZwQnl0ZVs1Ml0gPSBlbmRCeXRlWzQ5XTsgXHJcbiBmcEJ5dGVbNTNdID0gZW5kQnl0ZVsxN107IFxyXG4gZnBCeXRlWzU0XSA9IGVuZEJ5dGVbNTddOyBcclxuIGZwQnl0ZVs1NV0gPSBlbmRCeXRlWzI1XTsgXHJcbiBmcEJ5dGVbNTZdID0gZW5kQnl0ZVszMl07IFxyXG4gZnBCeXRlWzU3XSA9IGVuZEJ5dGVbIDBdOyBcclxuIGZwQnl0ZVs1OF0gPSBlbmRCeXRlWzQwXTsgXHJcbiBmcEJ5dGVbNTldID0gZW5kQnl0ZVsgOF07IFxyXG4gZnBCeXRlWzYwXSA9IGVuZEJ5dGVbNDhdOyBcclxuIGZwQnl0ZVs2MV0gPSBlbmRCeXRlWzE2XTsgXHJcbiBmcEJ5dGVbNjJdID0gZW5kQnl0ZVs1Nl07IFxyXG4gZnBCeXRlWzYzXSA9IGVuZEJ5dGVbMjRdO1xyXG4gcmV0dXJuIGZwQnl0ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Qm94QmluYXJ5KGkpIHtcclxuIHZhciBiaW5hcnkgPSBcIlwiO1xyXG4gc3dpdGNoIChpKSB7XHJcbiAgIGNhc2UgMCA6YmluYXJ5ID0gXCIwMDAwXCI7YnJlYWs7XHJcbiAgIGNhc2UgMSA6YmluYXJ5ID0gXCIwMDAxXCI7YnJlYWs7XHJcbiAgIGNhc2UgMiA6YmluYXJ5ID0gXCIwMDEwXCI7YnJlYWs7XHJcbiAgIGNhc2UgMyA6YmluYXJ5ID0gXCIwMDExXCI7YnJlYWs7XHJcbiAgIGNhc2UgNCA6YmluYXJ5ID0gXCIwMTAwXCI7YnJlYWs7XHJcbiAgIGNhc2UgNSA6YmluYXJ5ID0gXCIwMTAxXCI7YnJlYWs7XHJcbiAgIGNhc2UgNiA6YmluYXJ5ID0gXCIwMTEwXCI7YnJlYWs7XHJcbiAgIGNhc2UgNyA6YmluYXJ5ID0gXCIwMTExXCI7YnJlYWs7XHJcbiAgIGNhc2UgOCA6YmluYXJ5ID0gXCIxMDAwXCI7YnJlYWs7XHJcbiAgIGNhc2UgOSA6YmluYXJ5ID0gXCIxMDAxXCI7YnJlYWs7XHJcbiAgIGNhc2UgMTAgOmJpbmFyeSA9IFwiMTAxMFwiO2JyZWFrO1xyXG4gICBjYXNlIDExIDpiaW5hcnkgPSBcIjEwMTFcIjticmVhaztcclxuICAgY2FzZSAxMiA6YmluYXJ5ID0gXCIxMTAwXCI7YnJlYWs7XHJcbiAgIGNhc2UgMTMgOmJpbmFyeSA9IFwiMTEwMVwiO2JyZWFrO1xyXG4gICBjYXNlIDE0IDpiaW5hcnkgPSBcIjExMTBcIjticmVhaztcclxuICAgY2FzZSAxNSA6YmluYXJ5ID0gXCIxMTExXCI7YnJlYWs7XHJcbiB9XHJcbiByZXR1cm4gYmluYXJ5O1xyXG59XHJcbi8qXHJcbiogZ2VuZXJhdGUgMTYga2V5cyBmb3IgeG9yXHJcbipcclxuKi9cclxuZnVuY3Rpb24gZ2VuZXJhdGVLZXlzKGtleUJ5dGUpeyAgICBcclxuIHZhciBrZXkgICA9IG5ldyBBcnJheSg1Nik7XHJcbiB2YXIga2V5cyA9IG5ldyBBcnJheSgpOyAgXHJcbiBcclxuIGtleXNbIDBdID0gbmV3IEFycmF5KCk7XHJcbiBrZXlzWyAxXSA9IG5ldyBBcnJheSgpO1xyXG4ga2V5c1sgMl0gPSBuZXcgQXJyYXkoKTtcclxuIGtleXNbIDNdID0gbmV3IEFycmF5KCk7XHJcbiBrZXlzWyA0XSA9IG5ldyBBcnJheSgpO1xyXG4ga2V5c1sgNV0gPSBuZXcgQXJyYXkoKTtcclxuIGtleXNbIDZdID0gbmV3IEFycmF5KCk7XHJcbiBrZXlzWyA3XSA9IG5ldyBBcnJheSgpO1xyXG4ga2V5c1sgOF0gPSBuZXcgQXJyYXkoKTtcclxuIGtleXNbIDldID0gbmV3IEFycmF5KCk7XHJcbiBrZXlzWzEwXSA9IG5ldyBBcnJheSgpO1xyXG4ga2V5c1sxMV0gPSBuZXcgQXJyYXkoKTtcclxuIGtleXNbMTJdID0gbmV3IEFycmF5KCk7XHJcbiBrZXlzWzEzXSA9IG5ldyBBcnJheSgpO1xyXG4ga2V5c1sxNF0gPSBuZXcgQXJyYXkoKTtcclxuIGtleXNbMTVdID0gbmV3IEFycmF5KCk7ICBcclxuIHZhciBsb29wID0gWzEsMSwyLDIsMiwyLDIsMiwxLDIsMiwyLDIsMiwyLDFdO1xyXG5cclxuIGZvcih2YXIgaT0wO2k8NztpKyspe1xyXG4gICBmb3IodmFyIGo9MCxrPTc7ajw4O2orKyxrLS0pe1xyXG4gICAgIGtleVtpKjgral09a2V5Qnl0ZVs4KmsraV07XHJcbiAgIH1cclxuIH0gICAgXHJcbiBcclxuIHZhciBpID0gMDtcclxuIGZvcihpID0gMDtpIDwgMTY7aSArKyl7XHJcbiAgIHZhciB0ZW1wTGVmdD0wO1xyXG4gICB2YXIgdGVtcFJpZ2h0PTA7XHJcbiAgIGZvcihqID0gMDsgaiA8IGxvb3BbaV07aiArKyl7ICAgICAgICAgIFxyXG4gICAgIHRlbXBMZWZ0ID0ga2V5WzBdO1xyXG4gICAgIHRlbXBSaWdodCA9IGtleVsyOF07XHJcbiAgICAgZm9yKGsgPSAwO2sgPCAyNyA7ayArKyl7XHJcbiAgICAgICBrZXlba10gPSBrZXlbaysxXTtcclxuICAgICAgIGtleVsyOCtrXSA9IGtleVsyOStrXTtcclxuICAgICB9ICBcclxuICAgICBrZXlbMjddPXRlbXBMZWZ0O1xyXG4gICAgIGtleVs1NV09dGVtcFJpZ2h0O1xyXG4gICB9XHJcbiAgIHZhciB0ZW1wS2V5ID0gbmV3IEFycmF5KDQ4KTtcclxuICAgdGVtcEtleVsgMF0gPSBrZXlbMTNdO1xyXG4gICB0ZW1wS2V5WyAxXSA9IGtleVsxNl07XHJcbiAgIHRlbXBLZXlbIDJdID0ga2V5WzEwXTtcclxuICAgdGVtcEtleVsgM10gPSBrZXlbMjNdO1xyXG4gICB0ZW1wS2V5WyA0XSA9IGtleVsgMF07XHJcbiAgIHRlbXBLZXlbIDVdID0ga2V5WyA0XTtcclxuICAgdGVtcEtleVsgNl0gPSBrZXlbIDJdO1xyXG4gICB0ZW1wS2V5WyA3XSA9IGtleVsyN107XHJcbiAgIHRlbXBLZXlbIDhdID0ga2V5WzE0XTtcclxuICAgdGVtcEtleVsgOV0gPSBrZXlbIDVdO1xyXG4gICB0ZW1wS2V5WzEwXSA9IGtleVsyMF07XHJcbiAgIHRlbXBLZXlbMTFdID0ga2V5WyA5XTtcclxuICAgdGVtcEtleVsxMl0gPSBrZXlbMjJdO1xyXG4gICB0ZW1wS2V5WzEzXSA9IGtleVsxOF07XHJcbiAgIHRlbXBLZXlbMTRdID0ga2V5WzExXTtcclxuICAgdGVtcEtleVsxNV0gPSBrZXlbIDNdO1xyXG4gICB0ZW1wS2V5WzE2XSA9IGtleVsyNV07XHJcbiAgIHRlbXBLZXlbMTddID0ga2V5WyA3XTtcclxuICAgdGVtcEtleVsxOF0gPSBrZXlbMTVdO1xyXG4gICB0ZW1wS2V5WzE5XSA9IGtleVsgNl07XHJcbiAgIHRlbXBLZXlbMjBdID0ga2V5WzI2XTtcclxuICAgdGVtcEtleVsyMV0gPSBrZXlbMTldO1xyXG4gICB0ZW1wS2V5WzIyXSA9IGtleVsxMl07XHJcbiAgIHRlbXBLZXlbMjNdID0ga2V5WyAxXTtcclxuICAgdGVtcEtleVsyNF0gPSBrZXlbNDBdO1xyXG4gICB0ZW1wS2V5WzI1XSA9IGtleVs1MV07XHJcbiAgIHRlbXBLZXlbMjZdID0ga2V5WzMwXTtcclxuICAgdGVtcEtleVsyN10gPSBrZXlbMzZdO1xyXG4gICB0ZW1wS2V5WzI4XSA9IGtleVs0Nl07XHJcbiAgIHRlbXBLZXlbMjldID0ga2V5WzU0XTtcclxuICAgdGVtcEtleVszMF0gPSBrZXlbMjldO1xyXG4gICB0ZW1wS2V5WzMxXSA9IGtleVszOV07XHJcbiAgIHRlbXBLZXlbMzJdID0ga2V5WzUwXTtcclxuICAgdGVtcEtleVszM10gPSBrZXlbNDRdO1xyXG4gICB0ZW1wS2V5WzM0XSA9IGtleVszMl07XHJcbiAgIHRlbXBLZXlbMzVdID0ga2V5WzQ3XTtcclxuICAgdGVtcEtleVszNl0gPSBrZXlbNDNdO1xyXG4gICB0ZW1wS2V5WzM3XSA9IGtleVs0OF07XHJcbiAgIHRlbXBLZXlbMzhdID0ga2V5WzM4XTtcclxuICAgdGVtcEtleVszOV0gPSBrZXlbNTVdO1xyXG4gICB0ZW1wS2V5WzQwXSA9IGtleVszM107XHJcbiAgIHRlbXBLZXlbNDFdID0ga2V5WzUyXTtcclxuICAgdGVtcEtleVs0Ml0gPSBrZXlbNDVdO1xyXG4gICB0ZW1wS2V5WzQzXSA9IGtleVs0MV07XHJcbiAgIHRlbXBLZXlbNDRdID0ga2V5WzQ5XTtcclxuICAgdGVtcEtleVs0NV0gPSBrZXlbMzVdO1xyXG4gICB0ZW1wS2V5WzQ2XSA9IGtleVsyOF07XHJcbiAgIHRlbXBLZXlbNDddID0ga2V5WzMxXTtcclxuICAgc3dpdGNoKGkpe1xyXG4gICAgIGNhc2UgMDogZm9yKHZhciBtPTA7bSA8IDQ4IDttKyspeyBrZXlzWyAwXVttXSA9IHRlbXBLZXlbbV07IH0gYnJlYWs7XHJcbiAgICAgY2FzZSAxOiBmb3IodmFyIG09MDttIDwgNDggO20rKyl7IGtleXNbIDFdW21dID0gdGVtcEtleVttXTsgfSBicmVhaztcclxuICAgICBjYXNlIDI6IGZvcih2YXIgbT0wO20gPCA0OCA7bSsrKXsga2V5c1sgMl1bbV0gPSB0ZW1wS2V5W21dOyB9IGJyZWFrO1xyXG4gICAgIGNhc2UgMzogZm9yKHZhciBtPTA7bSA8IDQ4IDttKyspeyBrZXlzWyAzXVttXSA9IHRlbXBLZXlbbV07IH0gYnJlYWs7XHJcbiAgICAgY2FzZSA0OiBmb3IodmFyIG09MDttIDwgNDggO20rKyl7IGtleXNbIDRdW21dID0gdGVtcEtleVttXTsgfSBicmVhaztcclxuICAgICBjYXNlIDU6IGZvcih2YXIgbT0wO20gPCA0OCA7bSsrKXsga2V5c1sgNV1bbV0gPSB0ZW1wS2V5W21dOyB9IGJyZWFrO1xyXG4gICAgIGNhc2UgNjogZm9yKHZhciBtPTA7bSA8IDQ4IDttKyspeyBrZXlzWyA2XVttXSA9IHRlbXBLZXlbbV07IH0gYnJlYWs7XHJcbiAgICAgY2FzZSA3OiBmb3IodmFyIG09MDttIDwgNDggO20rKyl7IGtleXNbIDddW21dID0gdGVtcEtleVttXTsgfSBicmVhaztcclxuICAgICBjYXNlIDg6IGZvcih2YXIgbT0wO20gPCA0OCA7bSsrKXsga2V5c1sgOF1bbV0gPSB0ZW1wS2V5W21dOyB9IGJyZWFrO1xyXG4gICAgIGNhc2UgOTogZm9yKHZhciBtPTA7bSA8IDQ4IDttKyspeyBrZXlzWyA5XVttXSA9IHRlbXBLZXlbbV07IH0gYnJlYWs7XHJcbiAgICAgY2FzZSAxMDogZm9yKHZhciBtPTA7bSA8IDQ4IDttKyspeyBrZXlzWzEwXVttXSA9IHRlbXBLZXlbbV07IH0gYnJlYWs7XHJcbiAgICAgY2FzZSAxMTogZm9yKHZhciBtPTA7bSA8IDQ4IDttKyspeyBrZXlzWzExXVttXSA9IHRlbXBLZXlbbV07IH0gYnJlYWs7XHJcbiAgICAgY2FzZSAxMjogZm9yKHZhciBtPTA7bSA8IDQ4IDttKyspeyBrZXlzWzEyXVttXSA9IHRlbXBLZXlbbV07IH0gYnJlYWs7XHJcbiAgICAgY2FzZSAxMzogZm9yKHZhciBtPTA7bSA8IDQ4IDttKyspeyBrZXlzWzEzXVttXSA9IHRlbXBLZXlbbV07IH0gYnJlYWs7XHJcbiAgICAgY2FzZSAxNDogZm9yKHZhciBtPTA7bSA8IDQ4IDttKyspeyBrZXlzWzE0XVttXSA9IHRlbXBLZXlbbV07IH0gYnJlYWs7XHJcbiAgICAgY2FzZSAxNTogZm9yKHZhciBtPTA7bSA8IDQ4IDttKyspeyBrZXlzWzE1XVttXSA9IHRlbXBLZXlbbV07IH0gYnJlYWs7XHJcbiAgIH1cclxuIH1cclxuIHJldHVybiBrZXlzOyAgXHJcbn1cclxuLy9lbmQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8qXHJcbmZ1bmN0aW9uIHRlc3QoKSB7XHJcbiBcclxuIHZhciBtc2cgPSBcImFiY2RlZmdoXCI7XHJcbiB2YXIgYnQgPSBzdHJUb0J0KG1zZyk7XHJcbiBcclxuIHZhciBrZXkgPSBcIjEyMzQ1Njc4XCI7XHJcbiB2YXIga2V5QiA9IHN0clRvQnQoa2V5KTtcclxuICAgXHJcbiB2YXIgZW5jQnl0ZSA9IGVuYyhidCxrZXlCKTtcclxuICAgICBcclxuIHZhciBlbmNoZXggID0gYnQ2NFRvSGV4KGVuY0J5dGUpOyAgXHJcbiBlbmRhdGEudmFsdWU9ZW5jaGV4O1xyXG4gXHJcbiB2YXIgZW5jU3RyID0gaGV4VG9CdDY0KGVuY2hleCk7XHJcbiBhbGVydChcImVuY1N0cj1cIitlbmNTdHIpO1xyXG4gdmFyIGVCeXRlID0gbmV3IEFycmF5KCk7XHJcbiBmb3IobT0wO208ZW5jU3RyLmxlbmd0aDttKyspe1xyXG4gICBlQnl0ZVttXSA9IHBhcnNlSW50KGVuY1N0ci5zdWJzdHJpbmcobSxtKzEpKTtcclxuIH1cclxuIHZhciBkZWNieXRlPSBkZWMoZUJ5dGUsa2V5QilcclxuIHZhciBkZWNtc2c9IGJ5dGVUb1N0cmluZyhkZWNieXRlKTtcclxuIGFsZXJ0KFwiZGVjYnl0ZT1cIitkZWNieXRlKTtcclxuIGFsZXJ0KFwiZGVjbXNnPVwiK2RlY21zZyk7ICBcclxufSovXHJcblxyXG5leHBvcnQge1xyXG4gIHN0ckVuYyxcclxuICBzdHJEZWMsXHJcbiAgZ2V0S2V5Qnl0ZXMsXHJcbiAgc3RyVG9CdCxcclxuICBidDRUb0hleCxcclxuICBoZXhUb0J0NCxcclxuICBieXRlVG9TdHJpbmcsXHJcbiAgYnQ2NFRvSGV4LFxyXG4gIGhleFRvQnQ2NCxcclxuICBlbmMsXHJcbiAgZGVjLFxyXG4gIGluaXRQZXJtdXRlLFxyXG4gIGV4cGFuZFBlcm11dGUsXHJcbiAgeG9yLFxyXG4gIHNCb3hQZXJtdXRlLFxyXG4gIHBQZXJtdXRlLFxyXG4gIGZpbmFsbHlQZXJtdXRlLFxyXG4gIGdldEJveEJpbmFyeSxcclxuICBnZW5lcmF0ZUtleXNcclxufVxyXG5cclxuICJdfQ==