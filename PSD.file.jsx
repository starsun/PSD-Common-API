/**
 * @author shandan.com@gmail.com
 * @20130806 PSD 
 * 
 * 导出文件、读取文件等操作
 * @depands:PSD.jsx
 */
#include "PSD.jsx"
PSD.file = {
	
    /**
     *  存储文件
     * path 存储的文件路径
     * text    存储的文件内容
     * encoding  存储的文件编码,可选，当为空是默认 GBK
     */
    write: function(path, text, encoding){
		var f;
		
        if (!encoding) {
            encoding = "GBK";
        }
        f = new File(path);
        f.encoding = encoding;
        f.open('w');
        f.write(text);
        f.close();
		return text;
    },
	
	/**
	 * 获取文件夹中的文件列表,包含子文件夹
     * @path:路径
     * @except []:需排除的文件
	 */
	getFilesList: function(path,except) {
		
        var folder
		,	list = []
		,	leng
		,	p, i
		,	pList = []
		;

		folder  = new Folder(path);
        list = folder.getFiles();
        leng = list.length;
        
        for (i = 0; i < leng; i++) {
            p = list[i];
            if (Folder.prototype.isPrototypeOf(p)){
                pList = pList.concat(this.getFilesList(p.absoluteURI));
            } else {
                pList.push(p);
            }
            
        }       
        if(except && except.length){
            var exceptLoop = except.length;
            var listLoop = pList.length;
            var exceptName,listName;
            for (var i = exceptLoop - 1; i >= 0; i--) {
                exceptName = except[i];
                for (var j = listLoop - 1; j >=0; j--) {
                    listName = pList[j]["name"];
                    if(listName === exceptName){
                        pList.splice(j,1);
                        break;
                    }
                };
            };
        }
        return pList;
    }
};
