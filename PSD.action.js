/**
 * @author shandan.com@gmail.com
 * @20130707
 * PSD 常用动作接口
 * @depands:PSD.jsx
 */
#include "PSD.jsx"
PSD.action = {
	/**
	 * 创建快照
	 */
	createSnapshot: function() {
		var desc = new ActionDescriptor();
		var sref = new ActionReference();
		sref.putClass(charIDToTypeID("SnpS")); 
		desc.putReference(charIDToTypeID("null"), sref); 
		var fref = new ActionReference(); 
		fref.putProperty(charIDToTypeID("HstS"), charIDToTypeID("CrnH")); 
		desc.putReference(charIDToTypeID("From"), fref ); 
		var now = new Date(),
			month = now.getMonth(),
			date = now.getDate(),
			hour = now.getHours(),
			minute = now.getMinutes(),
			second = now.getSeconds();
		
		var dateStr = (month + 1) + "-" + date + " " + hour + ":" + minute + ":" + second;
		var sName = "histroy-"+ dateStr;
		desc.putString( charIDToTypeID( "Nm  " ), sName);
		executeAction(charIDToTypeID("Mk  "), desc, DialogModes.NO );

		return sName;
	},
	/**
	 * 清除切片
	 */
	clearSlices: function() {
		var idDlt = charIDToTypeID( "Dlt " );
		var desc300 = new ActionDescriptor();
		var idnull = charIDToTypeID( "null" );
		var ref158 = new ActionReference();
		var idslice = stringIDToTypeID( "slice" );
		var idOrdn = charIDToTypeID( "Ordn" );
		var idAl = charIDToTypeID( "Al  " );
		ref158.putEnumerated( idslice, idOrdn, idAl );
		desc300.putReference( idnull, ref158 );
		executeAction( idDlt, desc300, DialogModes.NO );
	},

	/**
	 * 创建对话框
	 */
	showDialog: function() {
		
	}
};
