
PSD.selection = {
  /**
	 * 选择选区
	 * @param {Array} region 选区的四点坐标，例如： [[0, 0], [200, 0], [200, 50], [0,50]]
	 */
	activeSelection: function(region) {
        if (!region) return;
        var selection = app.activeDocument.selection;
        selection.select(region);	
	},
	
	/**
	 * 取消选区
	 */
	inActiveSelection: function() {
        var selection = app.activeDocument.selection;
        selection.select();	
	},
	
	/**
	 * 判断选区是否单色
	 */
	
	isSelectionMonochrome: function(region) {
		var	selection = app.activeDocument.selection
		,	cs = app.activeDocument.channels
		;
			
		selection.select(region);
		for(var i = 0, l = cs.length; i < l; i++){
			var histogram = cs[i].histogram.concat();
			histogram.sort().reverse();
			if (histogram[1] != 0) {
				return false;
			}
		}
		return true;		
	},		
	
	/**
	 * 选区生成新图层
	 */
	
	selToNewLayer: function() {
	    var idCpTL = charIDToTypeID( "CpTL" );
	    executeAction( idCpTL, undefined, DialogModes.NO );		
	},
	
	/**
	 * 选区导出图片
	 */
	
	exportSelectionToImg: function() {
		
	}
	
};
