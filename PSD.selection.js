/**
 * @author shandan.com@gmail.com
 * @20130707
 * PSD 选区操作
 */
#include "PSD.jsx"
#include "options.jsx"

PSD.selection = {
	/**
	 * 选择选区
	 * @param {Array} region 选区的四点坐标，例如： [[0, 0], [200, 0], [200, 50], [0,50]]
	 */
	activeSelection: function(region) {
		var selection = app.activeDocument.selection;
		var b = selection.bounds;
		var rg = region;
        if (!region) {
			rg = [[b[0],b[1]],[b[2],b[1]],[b[2],b[3]],[b[0],b[3]]];
		}

        selection.select(rg);
	},

	/**
	 * 根据bounds值获取选区四点坐标
	 * @param bounds [a,b,c,d]左上角 右下角坐标值
	 * @return {Array}
	 */
	getRegion: function(bounds) {
		var region = [[bounds[0],bounds[1]],[bounds[2],bounds[1]],[bounds[2],bounds[3]],[bounds[0],bounds[3]]];
		return region;
	},
	
	/**
	 * 取消选区
	 */
	inActiveSelection: function() {
        var selection = app.activeDocument.selection;
        selection.deselect();	
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
	 *选区导出图片
	 * @param region
	 * @param imgInfo {resolution:分辨率， name: 名称}
	 * @return {*}
	 */
    exportSelectionToImg: function(region, imgInfo){
        if(!region){
        	return;
        }
        var exportConfig = OPTIONS.config.getExportConfig();
        var extension = OPTIONS.config.getExtension(exportConfig);
        // copy selected area
        var selection = app.activeDocument.selection, xset = [], yset = [];
        selection.select(region);

        //若复制区域为空，会报错
        try{
            selection.copy(true);
        }catch(e){
            return;
        }

        for(var i = 0, l = region.length; i < l; i++){
            xset.push(region[i][0]);
            yset.push(region[i][1]);
        }
        
        xset.sort(function(a,b){return a-b;});
        yset.sort(function(a,b){return a-b;});
        var width = xset[xset.length-1] - xset[0],
            height = yset[yset.length-1] - yset[0];
        
        // export image
		var resolution = imgInfo.resolution ? imgInfo.resolution : 72;
        var newDoc = app.documents.add(width, height, resolution ,imgInfo.name);
        newDoc.paste();
        newDoc.layers[newDoc.layers.length - 1].remove();
        
        var slicesFolder = new Folder(OPTIONS.config.output);
        !slicesFolder.exists && slicesFolder.create();
        
        var outputImgName = imgInfo.name+"."+extension;
        var img = new File(slicesFolder + "/" + outputImgName);
        newDoc.exportDocument (img, ExportType.SAVEFORWEB, exportConfig);
        newDoc.close(SaveOptions.DONOTSAVECHANGES);
        selection.deselect();
        return {name:outputImgName};
    }
};
