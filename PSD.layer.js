/**
 * @author shandan.com@gmail.com
 * @20130707
 * PSD 图层操作
 */
 
PSD.layer = {
  /**
	 * 创建图层
	 */
	createLayer: function() {
        var idMk = charIDToTypeID("Mk  ");
        var desc2 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref1 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        ref1.putClass(idLyr);
        desc2.putReference(idnull, ref1);
        executeAction(idMk, desc2, DialogModes.NO);	
	},
	
	/**
	 * 创建文本图层
	 */
	createTxtLayer: function(){
	    var idMk = charIDToTypeID( "Mk  " );
	    var desc193 = new ActionDescriptor();
	    var idnull = charIDToTypeID( "null" );
	    var ref83 = new ActionReference();
	    var idTxLr = charIDToTypeID( "TxLr" );
	    ref83.putClass( idTxLr );
	    desc193.putReference( idnull, ref83 );
	    var idUsng = charIDToTypeID( "Usng" );
	    var desc194 = new ActionDescriptor();
	    var idTxt = charIDToTypeID( "Txt " );
	    desc194.putString( idTxt, "" );
	    var idwarp = stringIDToTypeID( "warp" );
	    var desc195 = new ActionDescriptor();
	    var idwarpStyle = stringIDToTypeID( "warpStyle" );
	    var idwarpStyle = stringIDToTypeID( "warpStyle" );
	    var idwarpNone = stringIDToTypeID( "warpNone" );
	    desc195.putEnumerated( idwarpStyle, idwarpStyle, idwarpNone );
	    var idwarpValue = stringIDToTypeID( "warpValue" );
	    desc195.putDouble( idwarpValue, 0.000000 );
	    var idwarpPerspective = stringIDToTypeID( "warpPerspective" );
	    desc195.putDouble( idwarpPerspective, 0.000000 );
	    var idwarpPerspectiveOther = stringIDToTypeID( "warpPerspectiveOther" );
	    desc195.putDouble( idwarpPerspectiveOther, 0.000000 );
	    var idwarpRotate = stringIDToTypeID( "warpRotate" );
	    var idOrnt = charIDToTypeID( "Ornt" );
	    var idHrzn = charIDToTypeID( "Hrzn" );
	    desc195.putEnumerated( idwarpRotate, idOrnt, idHrzn );
	    var idwarp = stringIDToTypeID( "warp" );
	    desc194.putObject( idwarp, idwarp, desc195 );
	    var idTxtC = charIDToTypeID( "TxtC" );
	    var desc196 = new ActionDescriptor();
	    var idHrzn = charIDToTypeID( "Hrzn" );
	    var idPrc = charIDToTypeID( "#Prc" );
	    desc196.putUnitDouble( idHrzn, idPrc, 3.833333 );
	    var idVrtc = charIDToTypeID( "Vrtc" );
	    var idPrc = charIDToTypeID( "#Prc" );
	    desc196.putUnitDouble( idVrtc, idPrc, 32.810458 );
	    var idPnt = charIDToTypeID( "Pnt " );
	    desc194.putObject( idTxtC, idPnt, desc196 );
	    var idtextGridding = stringIDToTypeID( "textGridding" );
	    var idtextGridding = stringIDToTypeID( "textGridding" );
	    var idNone = charIDToTypeID( "None" );
	    desc194.putEnumerated( idtextGridding, idtextGridding, idNone );
	    var idOrnt = charIDToTypeID( "Ornt" );
	    var idOrnt = charIDToTypeID( "Ornt" );
	    var idHrzn = charIDToTypeID( "Hrzn" );
	    desc194.putEnumerated( idOrnt, idOrnt, idHrzn );
	    var idAntA = charIDToTypeID( "AntA" );
	    var idAnnt = charIDToTypeID( "Annt" );
	    var idantiAliasSharp = stringIDToTypeID( "antiAliasSharp" );
	    desc194.putEnumerated( idAntA, idAnnt, idantiAliasSharp );
	    var idtextShape = stringIDToTypeID( "textShape" );
	    var list31 = new ActionList();
	    var desc197 = new ActionDescriptor();
	    var idTEXT = charIDToTypeID( "TEXT" );
	    var idTEXT = charIDToTypeID( "TEXT" );
	    var idPnt = charIDToTypeID( "Pnt " );
	    desc197.putEnumerated( idTEXT, idTEXT, idPnt );
	    var idOrnt = charIDToTypeID( "Ornt" );
	    var idOrnt = charIDToTypeID( "Ornt" );
	    var idHrzn = charIDToTypeID( "Hrzn" );
	    desc197.putEnumerated( idOrnt, idOrnt, idHrzn );
	    var idTrnf = charIDToTypeID( "Trnf" );
	    var desc198 = new ActionDescriptor();
	    var idxx = stringIDToTypeID( "xx" );
	    desc198.putDouble( idxx, 1.000000 );
	    var idxy = stringIDToTypeID( "xy" );
	    desc198.putDouble( idxy, 0.000000 );
	    var idyx = stringIDToTypeID( "yx" );
	    desc198.putDouble( idyx, 0.000000 );
	    var idyy = stringIDToTypeID( "yy" );
	    desc198.putDouble( idyy, 1.000000 );
	    var idtx = stringIDToTypeID( "tx" );
	    desc198.putDouble( idtx, 0.000000 );
	    var idty = stringIDToTypeID( "ty" );
	    desc198.putDouble( idty, 0.000000 );
	    var idTrnf = charIDToTypeID( "Trnf" );
	    desc197.putObject( idTrnf, idTrnf, desc198 );
	    var idrowCount = stringIDToTypeID( "rowCount" );
	    desc197.putInteger( idrowCount, 1 );
	    var idcolumnCount = stringIDToTypeID( "columnCount" );
	    desc197.putInteger( idcolumnCount, 1 );
	    var idrowMajorOrder = stringIDToTypeID( "rowMajorOrder" );
	    desc197.putBoolean( idrowMajorOrder, true );
	    var idrowGutter = stringIDToTypeID( "rowGutter" );
	    var idPxl = charIDToTypeID( "#Pxl" );
	    desc197.putUnitDouble( idrowGutter, idPxl, 0.000000 );
	    var idcolumnGutter = stringIDToTypeID( "columnGutter" );
	    var idPxl = charIDToTypeID( "#Pxl" );
	    desc197.putUnitDouble( idcolumnGutter, idPxl, 0.000000 );
	    var idSpcn = charIDToTypeID( "Spcn" );
	    var idPxl = charIDToTypeID( "#Pxl" );
	    desc197.putUnitDouble( idSpcn, idPxl, 0.000000 );
	    var idframeBaselineAlignment = stringIDToTypeID( "frameBaselineAlignment" );
	    var idframeBaselineAlignment = stringIDToTypeID( "frameBaselineAlignment" );
	    var idalignByAscent = stringIDToTypeID( "alignByAscent" );
	    desc197.putEnumerated( idframeBaselineAlignment, idframeBaselineAlignment, idalignByAscent );
	    var idfirstBaselineMinimum = stringIDToTypeID( "firstBaselineMinimum" );
	    var idPxl = charIDToTypeID( "#Pxl" );
	    desc197.putUnitDouble( idfirstBaselineMinimum, idPxl, 0.000000 );
	    var idbase = stringIDToTypeID( "base" );
	    var desc199 = new ActionDescriptor();
	    var idHrzn = charIDToTypeID( "Hrzn" );
	    desc199.putDouble( idHrzn, 0.000000 );
	    var idVrtc = charIDToTypeID( "Vrtc" );
	    desc199.putDouble( idVrtc, 0.000000 );
	    var idPnt = charIDToTypeID( "Pnt " );
	    desc197.putObject( idbase, idPnt, desc199 );
	    var idtextShape = stringIDToTypeID( "textShape" );
	    list31.putObject( idtextShape, desc197 );
	    desc194.putList( idtextShape, list31 );
	    var idTxtt = charIDToTypeID( "Txtt" );
	    var list32 = new ActionList();
	    desc194.putList( idTxtt, list32 );
	    var idTxLr = charIDToTypeID( "TxLr" );
	    desc193.putObject( idUsng, idTxLr, desc194 );
	    executeAction( idMk, desc193, DialogModes.NO );		
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
	isLayerHere: function(name) {
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
                indent: 0,//(textItem.firstLineIndent&&textItem.firstLineIndent.value)? Math.round(textItem.firstLineIndent.value):0,
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
	 * 获取当前文本图层样式
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
	}
};
