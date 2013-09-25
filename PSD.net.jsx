/**
 * @author shandan.com@gmail.com
 * @20130805 PSD net socket
 * @depands:PSD.jsx
 * options = {
 * 			dataType:"POST",
 *			url:"http://preview.alibaba-inc.com/upload",
 *			port:3000,
 *			data:{},
 *			files:files
 * }
 * 
 */
#include "PSD.jsx"
#include "options.jsx"

PSD.net = {
	
    connect: function(options){
		
		var data
		,	dataStr
		,	dataList
		,	conn
		,	host
		,	reply
		,	url
		;
    	
		this.sp = this.getSeparator();
		
		data = this.getDataObj(options);
		dataList = this.getDataList(data);

//        dataList.push(this.sp+"\r\n");
		dataStr = dataList.join('');



		url = data.url;

		host = url.split("/")[0] + ":" + options.port;
        conn = new Socket();	
		conn.encoding = "binary";
        if (conn.open(host, "binary")) {
            	   
            conn.write(dataStr);
            reply = conn.read();
            reply = reply.split("\r\n").join("\n");
            reply = reply.split("\r").join("\n");
            
			if (options.after) {
				options.after(reply);
			} else {
				//$.write(replay);
			}
			
            conn.close();
        } else {
			this.err();
        }
    },
	
	err: function() {
	    alert("CONNECTION TO DATABASE FAILED");
	},
	
	
	getSeparator: function() {

		return "-psd2json" + (Math.random() * 10000 | 0) + +new Date();
	},
	
	getHeaderList: function(header, length) {
	  	var sp = this.sp
		,	list = []
		,	key
		;

        for (key in header) {
            list.push(key);
            list.push(": ");
            if (key == 'Content-Length') {
                list.push(length);
            } else {
                list.push(header[key]);
            }

            if (key == "Content-Type") {
				list.push("; boundary=" + sp);
			}
            list.push("\r\n");
        }
        list.push("\r\n");		
		return list;
	},
	
	getFormDataList: function(data) {
	  	var sp = '--' + this.sp
		,	list = []
		,	key
		;	
		
		for (key in data) {
			list.push(sp + "\r\n");
			list.push("Content-Disposition: form-data; ");
			list.push('name="' + key + '"');
			list.push("\r\n\r\n");
			list.push(data[key] + "\r\n");
		}				
		
		return list;
	},
	
	getFileList: function(files) {
	  	var sp = '--' + this.sp
		,	list = []
		,	key
		,	aFile
		,	fileStr
		;	
			
        for (key in files) {
            list.push(sp + "\r\n");
            list.push("Content-Disposition: form-data; ");
            list.push('name="' + key + '";');
            list.push('filename="' + (files[key].fsName.replace(/([^\x00-\xff])/g, function(s){
                return encodeURI(s);
            })) + '"');
			
            list.push("\r\n\r\n");
            aFile = files[key];
            aFile.encoding = "BINARY";
            aFile.open('r');  
			if (aFile.exists){
	            fileStr = aFile.read();
			}    
            aFile.close();
			if (fileStr) {
	            list.push(fileStr + "\r\n");
			}
        }		
		return list;
		
	},
	
	/**
	 * 
	 * @param {Object} dataObj
	 */
	getDataList: function(dataObj) {
		
		var list = []
		,	headerList
		,	dataList
		,	fileList
		,	sp = '--' + this.sp
		;

		//协议
        list.push(dataObj.dataType);
        list.push(" ");

        if (dataObj.url.indexOf("/") < 0) {
            list.push("/");
        } else {
            list.push(dataObj.url.substr(dataObj.url.indexOf("/")));
        }
        list.push(" HTTP/1.1\r\n");



		
		if (dataObj.data) {			// 数据
			dataList = this.getFormDataList(dataObj.data);
//			list = list.concat(dataList);
		}
		
		if ( dataObj.files){        // 文件
			fileList = this.getFileList(dataObj.files);
//			list = list.concat(fileList);
		}

        var length = dataList.concat(fileList).join('').length + (sp + "--\n").length;
        if (dataObj.header) {		// 头
            headerList = this.getHeaderList(dataObj.header, length);
			list = list.concat(headerList);
        }

        list = list.concat(dataList);
        list = list.concat(fileList);


        list.push(sp + "--\n");
		
		return list;

	},
	
	
	/**
	 * 组装数据
	 */
	getDataObj: function(options) {
		
        var dataObj = {}
		,	key
		;
        
        dataObj = {
            dataType: "POST",
            data: {},
            files: {},
            url: "",
            port: 80,
            header: {
                "Content-Type": "multipart/form-data",
                "Content-Length": 9999999,
                "Accept": "*/*",
                "User-Agent": "PSD2CMS",
                "Connection": "Keep-Alive",
                "Cache-Control": "no-cache",
                "Host":OPTIONS.config.host
            }
        };        
        
        if (options.constructor == Object) {
            for (key in options) {
                dataObj[key] = options[key];
            }
        }
		
        if (dataObj.url.substr(0, 7) == "http://") {
			dataObj.url = dataObj.url.substr(7);
		}
		
		return dataObj;
	},
	
	/**
	 * 连接前处理
	 */
	before: function() {
		
		
	},
	
	/**
	 * 返回数据后的处理
	 */
	after: function(data) {		
		alert(data);	
	}
    
};

//文件上传 example (引入"PSD.net.jsx")
//var op = {
//			dataType:"POST",
//			url:"http://preview.alibaba-inc.com/upload",
//			port:3000,
//			data:{},
//			files:{'json.txt': File("d:\\psd2html\\original\\json.txt")}
//		}
//PSD.net.connect(op);


