let Base64 = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        let output = "";
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function (input) {
        let output = "";
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        let utftext = "";

        for (let n = 0; n < string.length; n++) {

            let c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        let string = "", c1 = null, c2 = null, c3 = null;
        let i = 0;
        let c = c1 = c2 = 0;

        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}
let KEY_64 = Base64.encode('myToken');
let expTime = Base64.encode('expires_in');

let Verify = {
    /**
     * 是否为空
     * @param str
     * @returns {boolean}
     */
    isEmpty(val) {
        if (val == undefined || val == 'undefined' || val == null) {
            return false;
        }
        let str = val.replace(/(^\s*)|(\s*$)/g, '');
        if (str == '') {
            return true;
        } 
        return false;
    },
    /**
     * 是否为手机号
     * @param str
     * @returns {boolean}
     */
    isMobile: str => /^[1][3,4,5,6,7,8,9][0-9]+$/.test(str) && str.length == 11,
    /**
     * 验证码长度
     * @param str
     * @returns {boolean}
     */
    isVerifyCode: str => /^[0-9]{6}$/.test(str),
    /**
     * 是否为姓名（支持中英文）
     * @param str
     * @returns {boolean}
     */
    isName: str => str.length >= 2 && str.length <= 25,
};

let Auth = {
    delToken() {
        wx.removeStorage({key: KEY_64})
    },
    setToken(token) {
        wx.setStorage({key: KEY_64, data: token})
    },
    getToken() {
        wx.getStorage({
            key: KEY_64,
            success: res => {
                return res.data
            } 
        })
    }
}
let DateHandle = {
    /**
     * 格式化日期
    */
    Format: function (date, format = 'YYYY-MM-DD HH:mm:ss') {
        if (!date) {
            return ''
        }
        if (typeof date === 'string') {
            date = new Date(date.replace(/-/g, '/'))
        }
        if (typeof date === 'number') {
            date = new Date(date)
        }
        let o = {
            "M+": date.getMonth() + 1, //month
            "D+": date.getDate(),    //day
            'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
            'H+': date.getHours(),
            "m+": date.getMinutes(), //minute
            "s+": date.getSeconds(), //second
            "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
            "S": date.getMilliseconds() //millisecond
        };
        if (/(Y+)/.test(format)) {
            format = format.replace(RegExp.$1,
                (date.getFullYear() + "").substr(4 - RegExp.$1.length))
        };
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1,
                    RegExp.$1.length === 1 ? o[k] :
                        ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    },

    /**
     * 获得当天日期
    */
    GetToday: function () {
        return this.Format(new Date(), 'YYYY-MM-DD');
    }
}
export {
    Base64,
    Auth,
    Verify,
    DateHandle
}

