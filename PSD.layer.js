/**
 * @author shandan.com@gmail.com
 * @20130707 PSD 图层操作
 */

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
        var textInfo = {};
        
        if (!layer.kind || (layer.kind && layer.kind.toString() !== "LayerKind.TEXT")) return null;
        var textItem = layer.textItem;
        
        try {
            textInfo = {
                color: textItem.color.rgb.hexValue,
                contents: textItem.contents,
                font: WEBFONTS.getWebFont(textItem.font),
                size: Math.round(textItem.size.value),
                textType: textItem.kind.toString(),
                bold: textItem.fauxBold,
                italic: textItem.fauxItalic,
                indent: 0,// (textItem.firstLineIndent&&textItem.firstLineIndent.value)?
							// Math.round(textItem.firstLineIndent.value):0,
                underline: textItem.underline == UnderlineType.UNDERLINEOFF ? false : true,
                textRange: this.getTextRange(),
                position: {
                    x: textItem.position[0].value,
                    y: textItem.position[1].value
                },
            };
            
            if (textItem.kind == TextType.PARAGRAPHTEXT) {
                textInfo.width = layer.textItem.width.value;
                textInfo.height = layer.textItem.height.value;
                
                // text justification
                switch (textItem.justification.toString()) {
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
            // line height
            if (!textItem.useAutoLeading) {
                textInfo.lineHeight = Math.round(textItem.leading.value);
            } else {
                try {
                    textInfo.lineHeight = Math.round(textItem.autoLeadingAmount) + '%';
                } catch (e) {
					console.dir("error message on layer " + layer.name + ":")
					console.dir(e);
                    return null;
                }
            }
        } catch (e) {
			console.dir("error message on layer " + layer.name + ":")
			console.dir(e);
            return null;
        }
        return textInfo;		
	},	
	
	/**
	 * 选中图层
	 */
	setActiveLayer: function(name) {
	    var idslct = charIDToTypeID( "slct" );
	    var desc323 = new ActionDescriptor();
	    var idnull = charIDToTypeID( "null" );
	    var ref116 = new ActionReference();
	    var idLyr = charIDToTypeID( "Lyr " );
	    ref116.putName( idLyr, name );
	    desc323.putReference( idnull, ref116 );
	    var idMkVs = charIDToTypeID( "MkVs" );
	    desc323.putBoolean( idMkVs, false );
	    executeAction( idslct, desc323, DialogModes.NO );		
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
	
	getTextRange: function(){
		var desc = (function(){
			var ref = new ActionReference();
			ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
			return executeActionGet(ref);
		})();
		
		var list =  desc.getObjectValue(charIDToTypeID("Txt "));
        var tsr =  list.getList(charIDToTypeID("Txtt"));
        var info = [];
		
        for(var i = 0, l = tsr.count;i < l; i++){
			var tsr0 =  tsr.getObjectValue(i) ;
			var from = tsr0.getInteger(charIDToTypeID("From"));
			var to = tsr0.getInteger(charIDToTypeID("T   "));
			var range = [from, to];
			var textStyle = tsr0.getObjectValue(charIDToTypeID("TxtS"));
			var font = textStyle.getString(charIDToTypeID("FntN" )); 
			var size = textStyle.getDouble(charIDToTypeID("Sz  " ));
			var color = textStyle.getObjectValue(charIDToTypeID('Clr '));
			var bold = textStyle.getBoolean(stringIDToTypeID('syntheticBold'));
			var italic = textStyle.getBoolean(stringIDToTypeID('syntheticItalic'));
			var underlineValue = textStyle.getEnumerationValue(stringIDToTypeID( "underline" ));
			var underline = underlineValue == 1647 ? true : false;
			var autoLeading = textStyle.getBoolean(stringIDToTypeID( "autoLeading" ));
			var textColor = new SolidColor;
			
			textColor.rgb.red = color.getDouble(charIDToTypeID('Rd  '));
			textColor.rgb.green = color.getDouble(charIDToTypeID('Grn '));
			textColor.rgb.blue = color.getDouble(charIDToTypeID('Bl  '));
			var o = {range:range, font:font, size:size, color:textColor.rgb.hexValue, bold:bold, italic:italic, underline:underline};
			if(!autoLeading) o.lineHeight = textStyle.getUnitDoubleValue(charIDToTypeID( "Ldng" ));
			info.push(o);
		}
        return info;       
	}
	
};
