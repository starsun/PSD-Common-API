/**
 * @author shandan.com@gmail.com
 * @20130707
 * PSD 常用动作接口
 */
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
		var sName = "PSD2HTML "+ dateStr;
		this.lastSnapshotName = sName;
		
		desc.putString( charIDToTypeID( "Nm  " ), sName);
		executeAction(charIDToTypeID("Mk  "), desc, DialogModes.NO ); 		
	},	
	
	/**
	 * 创建对话框
	 */
	showDialog: function() {
		
	}
};
