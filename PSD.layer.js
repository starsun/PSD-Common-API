/**
 * @author shandan.com@gmail.com
 * @20130707 PSD 图层操作
 */
#include "PSD.jsx"
#include "Fonts.jsx"
#include "Util.jsx"

PSD.layer = {
	/**
	 * 创建图层
	 */
	addArtLayer: function() {
        return app.activeDocument.artLayers.add();
	},
	
	/**
	 * 创建文本图层
	 */
	addTxtLayer: function(){
	    var l = this.addArtLayer();
		l.kind = LayerKind.TEXT;
		return l;
	},
	
	/**
	 * 设置(当前)图层名称
	 */
	
	setLayerName: function(name, layer){
		var lyr;
		if (!layer) {
			lyr = app.activeDocument.activeLayer;
		} else {
			lyr = layer;
		}
		lyr.name = name;
	},
	
	/**
	 * 设置(当前)文本图层内容
	 */	
	setTxtLayerContents: function(contents, layer) {
		var lyr;
		if (!layer) {
			lyr = app.activeDocument.activeLayer;
		} else {
			lyr = layer;
		}
		if (lyr.textItem !== undefined) {
			lyr.textItem.contents = contents;
			return contents;
		}else {
			return 'not a text layer';
		}
	},
	
	/**
	 * 追加(当前)文本图层内容
	 */	
	appendTxtLayerContents: function(contents, layer) {
		var lyr;
		if (!layer) {
			lyr = app.activeDocument.activeLayer;
		} else {
			lyr = layer;
		}
		if (lyr.textItem !== undefined) {
			lyr.textItem.contents = '' + lyr.textItem.contents + contents;
			return contents;
		}else {
			return 'not a text layer';
		}
	},	
	
	
	
	/**
	 * 判断名称为name的图层是否存在
	 */
	isLayerExist: function(name) {
        var layers = app.activeDocument.layers;
        var i;
        for (i = 0; i < layers.length; i++) {
            if (layers[i].name == name) {
                return true;
            }
        }
        return false;		
	},
	
	/**
	 * 获取当前活动图层对象
	 */
	
	getActiveLayer: function() {
		var lyr = app.activeDocument.activeLayer;
		return lyr ? lyr : -1;
	},
	
	/**
	 * 获取当前图层ID
	 */
	getLayerId: function(){
		var ref = new ActionReference();
		ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));	
		var desc = executeActionGet(ref);
		
		if (desc.hasKey( charIDToTypeID('LyrI'))){
			var desc = executeActionGet(ref);
			var layerId = desc.getInteger(charIDToTypeID('LyrI'));
			return layerId;
		}else{
			return -1;
		}		
	},
	
	/**
	 * 获取图层名称
	 */
	getLayerName: function(layer){
		var lyr;
		if (!layer) {
			lyr = app.activeDocument.activeLayer;
		} else {
			lyr = layer;
		}
		return lyr.name;		
	},	
	
	/**
	 * 获取文本图层内容
	 */
	getTxtLayerContents: function(layer) {
		var lyr;
		if (!layer) {
			lyr = app.activeDocument.activeLayer;
		} else {
			lyr = layer;
		}
		if (lyr.textItem !== undefined) {
			return lyr.textItem.contents;
		}else {
			return 'not a text layer';
		}		
	},		
	
	/**
	 * 获取图层信息
	 */
	getLayerInfo: function() {
		
		
	},			
	
	/**
	 * 获取文本图层信息
	 */
	getTxtLayerInfo: function(layer) {

		if(!layer.kind || (layer.kind && layer.kind.toString() !== "LayerKind.TEXT")) return null;
		var textItem = layer.textItem;

		var textInfo = {
			textRange: this.getTextRange(layer)
		};

		try {
			if (textItem.color) {
				textInfo.color = textItem.color.rgb.hexValue;
			}
		}catch(e){
			textInfo.color = "#333";
			Util.log($.fileName, $.line, e, " on layer " + layer.name);
		}

		try {
			if (textItem.contents) {
				textInfo.contents = textItem.contents;
			}
		}catch(e){
			textInfo.contents = layer.name;
			Util.log($.fileName, $.line, e, " on layer " + layer.name);
		}

		try {
			if (textItem.font) {
				textInfo.font = WEBFONTS.getWebFont(textItem.font);
			}
		}catch(e){
			textInfo.font = 'Simsun';
			Util.log($.fileName, $.line, e, " on layer " + layer.name);
		}

		try {
			if (textItem.kind) {
				textInfo.textType = textItem.kind.toString();
			}
		}catch(e){
			textInfo.textType = 'Simsun';
			Util.log($.fileName, $.line, e, " on layer " + layer.name);
		}
		try {
			if (textItem.firstLineIndent) {
				textInfo.indent = Math.round(textItem.firstLineIndent.value);
			}
		}catch(e){
			textInfo.indent = 0;
			Util.log($.fileName, $.line, e, " on layer " + layer.name);
		}

		try {
			textInfo.leftIndent = (textItem.leftIndent&&textItem.leftIndent.value)?textItem.leftIndent.value:0;
		}catch(e){
			textInfo.leftIndent = 0;
			Util.log($.fileName, $.line, e, " on layer " + layer.name);
		}

		try {
			textInfo.rightIndent = (textItem.rightIndent&&textItem.rightIndent.value)?textItem.rightIndent.value:0;
		}catch(e){
			textInfo.rightIndent = 0;
			Util.log($.fileName, $.line, e, " on layer " + layer.name);
		}

		try {
			textInfo.position = {x: textItem.position[0].value, y: textItem.position[1].value};
		}catch(e){
			textInfo.position = {x:0, y:0};
			Util.log($.fileName, $.line, e, " on layer " + layer.name);
		}

		try {
			if (textItem.size) {
				textInfo.size = Math.round(textItem.size.value);
			}
		}catch(e){
			textInfo.size = 12;
			Util.log($.fileName, $.line, e, " on layer " + layer.name);
		}

		try {
			if (textItem.fauxBold) {
				textInfo.bold = textItem.fauxBold;
			}
		}catch(e){
			textInfo.bold = false;
			Util.log($.fileName, $.line, e, " on layer " + layer.name);
		}

		try {
			if (textItem.fauxItalic) {
				textInfo.italic = textItem.fauxItalic;
			}
		}catch(e){
			textInfo.italic = false;
			Util.log($.fileName, $.line, e, " on layer " + layer.name);
		}

		try {
			if (textItem.underline) {
				textInfo.underline = (textItem.underline == UnderlineType.UNDERLINEOFF ? false : true);
			}
		}catch(e){
			textInfo.underline = false;
			Util.log($.fileName, $.line, e, " on layer " + layer.name);
		}

		if(textItem.kind == TextType.PARAGRAPHTEXT){
			textInfo.width = layer.textItem.width.value;
			textInfo.height = layer.textItem.height.value;

			// text justification
			switch(textItem.justification.toString()){
				case 'Justification.LEFT':
					textInfo.textAlign = 'left';
					break;
				case 'Justification.RIGHT':
					textInfo.textAlign = 'right';
					break;
				case 'Justification.CENTER':
					textInfo.textAlign = 'center';
					break;
				case 'Justification.CENTERJUSTIFIED':
				case 'Justification.FULLYJUSTIFIED':
				case 'Justification.LEFTJUSTIFIED':
				case 'Justification.RIGHTJUSTIFIED':
					textInfo.textAlign = 'justify';
					break;
				default:
					textInfo.textAlign = 'left';

			}
		}


		try{
			if(!textItem.useAutoLeading){
				textInfo.lineHeight = Math.round(textItem.leading.value);
			}else{
				textInfo.lineHeight = Math.round(textItem.autoLeadingAmount) + '%';
			}
		}catch(e){
			textInfo.lineHeight = '24';
			Util.log($.fileName, $.line, e, " on layer " + layer.name);
		}

		return textInfo;
	},	
	
	/**
	 * 选中图层
	 */
	setActiveLayer: function(name) {
		var layerRef = app.activeDocument.artLayers.getByName(name);
		app.activeDocument.activeLayer = layerRef;
		return layerRef;
	},	
	
	/**
	 * 隐藏图层
	 */
	hideLayers: function(layers) {
		if (layers.length) {
			for (var i = 0, len = layers.length; i < len; i++) {
				if ("visible" in layers[i]) {
					layers[i].visible = false;
				}
			}
		} else if(layers.visible) {
			layers.visible = false;
		}
	},		
	
	/**
	 * 显示图层
	 */
	showLayers: function(layers) {
		if (layers.length) {
			for (var i = 0, len = layers.length; i < len; i++) {
				if ("visible" in layers[i]) {
					layers[i].visible = true;
				}
			}
		}else if(layers.visible) {
			layers.visible = true;
		}
	},
	
	
	/**
	 * 获取当前文本图层特效
	 */
	getTxtEffects: function() {
		
        var ref = new ActionReference();
        var effects = [];
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        
        var desc = executeActionGet(ref);
        if (desc.hasKey(stringIDToTypeID('layerEffects'))) {
            var effectDesc = desc.getObjectValue(stringIDToTypeID('layerEffects'));
            // first key is scale so skip and start with 1
            for (var effect = 1; effect < effectDesc.count; effect++) {
                effects.push(typeIDToStringID(effectDesc.getKey(effect)));
            }
        }
        return effects;
	},
	
	/**
	 * 获取当前多样式的文本图层的样式
	 * @return [{bold:false, color:ff0000, font:SimHei, italic:false, lineHeight:30; range:[0,6],size:48,underline:false},{}]
	 */	
	
	getTextRange: function(layer){
		app.activeDocument.activeLayer = layer;

		var desc = (function(){
			var ref = new ActionReference();
			ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
			return executeActionGet(ref);
		})();

		var list =  desc.getObjectValue(charIDToTypeID("Txt "))
			,	tsr =  list.getList(charIDToTypeID("Txtt"))
			,	info = []
			,	tsr0
			,	from
			,	to
			,	range
			,	textStyle
			,	font
			,	size
			,	bold
			,	italic
			,	underlineValue
			,	underline
			,	color
			,	autoLeading
			,	textColor
			,	o
			;


		for(var i = 0, l = tsr.count;i < l; i++){
			tsr0 =  tsr.getObjectValue(i) ;
			from = tsr0.getInteger(charIDToTypeID("From"));
			to = tsr0.getInteger(charIDToTypeID("T   "));
			range = [from, to];
			textStyle = tsr0.getObjectValue(charIDToTypeID("TxtS"));
			try {
				font = textStyle.getString(charIDToTypeID("FntN"));
			}catch(e){
				font = 'SimSun';
				Util.log($.fileName, $.line, e);
			}
			try {
				size = textStyle.getDouble(charIDToTypeID("Sz  "));
			}catch(e){
				size = 12;
				Util.log($.fileName, $.line, e);
			}

			try {
				bold = textStyle.getBoolean(stringIDToTypeID('syntheticBold'));
			}catch(e){
				bold = false;
				Util.log($.fileName, $.line, e);
			}

			try {
				italic = textStyle.getBoolean(stringIDToTypeID('syntheticItalic'));
			}catch(e){
				italic = false;
				Util.log($.fileName, $.line, e);
			}

			try {
				underlineValue = textStyle.getEnumerationValue(stringIDToTypeID("underline"));
			}catch(e){
				underlineValue = -1;
				Util.log($.fileName, $.line, e);
			}
			underline = (underlineValue == 1647 ? true : false);

			color = textStyle.getObjectValue(charIDToTypeID('Clr '));
			autoLeading = textStyle.getBoolean(stringIDToTypeID( "autoLeading" ));
			textColor = new SolidColor;
			textColor.rgb.red = color.getDouble(charIDToTypeID('Rd  '));
			textColor.rgb.green = color.getDouble(charIDToTypeID('Grn '));
			textColor.rgb.blue = color.getDouble(charIDToTypeID('Bl  '));

			o = {range:range, font:font, size:size, color:textColor.rgb.hexValue, bold:bold, italic:italic, underline:underline};
			if(!autoLeading) o.lineHeight = textStyle.getUnitDoubleValue(charIDToTypeID( "Ldng" ));
			info.push(o);
		}
		return info;
	},

    /**
     * 移动当前图层到顶端
     */
    moveTotop: function(){
        var idmove = charIDToTypeID( "move" );
        var desc37 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
        var ref17 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref17.putEnumerated( idLyr, idOrdn, idTrgt );
        desc37.putReference( idnull, ref17 );
        var idT = charIDToTypeID( "T   " );
        var ref18 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idFrnt = charIDToTypeID( "Frnt" );
        ref18.putEnumerated( idLyr, idOrdn, idFrnt );
        desc37.putReference( idT, ref18 );
        executeAction( idmove, desc37, DialogModes.NO );
    },

    /**
     * 合并当前图层
     */
    merge: function() {
        var idMrgtwo = charIDToTypeID( "Mrg2" );
        executeAction( idMrgtwo, undefined, DialogModes.NO );
    },
    getLayerInfo:function(layer){
    	if(layer){
    		
    	}
    	return {

    	}
    }

};
