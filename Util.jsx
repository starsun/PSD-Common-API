/**
 * @authors jiaping.shenjp
 * @date    2013-08-07 14:51:55
 * @version 1.0
 */
var Util = {
    uid:0,
    getUID:function(){
        return this.uid++;
    },
	log: function(){
		var now = new Date();
		var today = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
		var f = File(app.path+"/Plug-ins/Panels/log/log-"+today+".txt");
		f.open("a");
		f.write(Array.prototype.join.call(arguments, "#")+"\n");
		f.close();
	}
};
