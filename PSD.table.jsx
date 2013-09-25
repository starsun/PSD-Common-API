/**
 * Created with JetBrains WebStorm.
 * User: sapphire.shand
 * Date: 13-9-11
 * Time: 下午2:56
 * To change this template use File | Settings | File Templates.
 */

#include "PSD.jsx"
#include "PSD.selection.jsx"

PSD.Tabel = {

	/**
	 * 根据文档属性获取表格大小等信息
	 * @param doc app.activeDocument   this.activeDoc
	 */
	getTableBounds: function(doc) {
		var bounds = {
			left:0,
			top:0,
			bottom:doc.height.value,
			right:doc.width.value,
			width:doc.width.value,
			height:doc.height.value
		}
		return bounds;
	},

	/**
	 * 根据图层列表获取表格的横向或者纵向的坐标的列表 [0,20,107,120,241,253,351,382,460,600]
	 * @param clist Array functionArtLayerInfos + getTableBouns
	 */
	getFieldList: function(clist, field, sortBy) {
		var list = [], i, f = {}, by, offset = {left:'right', top:'bottom'}, off =  offset[field];

		for (i = 0; i < clist.length; i ++) {
			if (!f[clist[i][field]]) {
				list.push(clist[i][field]);
				f[clist[i][field]] = true;
			}

			if (!f[clist[i][off]]) {
				list.push(clist[i][off]);
				f[clist[i][off]] = true;
			}
		}
		if (sortBy) {
			by = function(a,b){return b - a;}
		} else {
			by = function(a,b){return a - b;}
		}

		return list.sort(by);

	},

	/**
	 * 根据横向坐标获取表格thead头信息 主要是每个td的宽度
	 * @param cols Array
	 * @return data = {height: 0; td:[{width:20},{width:87},{width:13}]}
	 */
	getTheadData: function (cols) {
		var data = {height:0}, ths = [], i, width, leng = cols.length-1;
		for (i = 0; i < leng; i++) {
			width = cols[i + 1] - cols[i];
			ths[i] = {width:width};
		}
		data.ths = ths;
		return data;
	},



	/**
	 * 根据文档和内容图层获取表格body数据
	 * @param doc
	 * @param flist 内容图层
	 * TODo 边界值检测 重构
	 */
	getTableData: function(doc, flist) {
		var clist = flist.concat([this.getTableBounds(doc)]);
		var rows = this.getFieldList(clist, 'top');
		var cols = this.getFieldList(clist, 'left');
		var head = this.getTheadData(cols);
		var slist = this.sort(flist, ['top','left']);
		var table = {}
		,	trs = []
		,	i = 0
		,	j = 0
		,	height
		,	rleng = rows.length
		,	cleng = cols.length
		,	sleng = slist.length
		,	colspan = 0
		,	tmpcols
		,	left
		,	top
		,	info
		;

		for(n = 0; n < sleng; n++) {
			top = slist[n].top;
			left = slist[n].left;

			for (; i < rleng; i++) {

				if (!trs[i]) {
					height = rows[i + 1] - rows[i];
					trs[i] = {height:height};
				}
				if (!trs[i].tds){
					trs[i].tds = [];
				}
//				tds = [];
				if (top == rows[i]) {
					colspan = 0;
					for (; j < cleng; j ++) {

						if (left == cols[j]) {
							if (colspan != 0 ) {
								info = {
									colspan:colspan,
									name:slist[n].name,
									layer:slist[n],
									x:cols[j-colspan],
									y:rows[i],
									width:cols[j] - cols[j-colspan],
									height:rows[i+1] - rows[i]
								};
								trs[i].tds.push(info);
							}
							tmpcols = cols.indexOf(slist[n].right)-j;
							info = {
									colspan:tmpcols,
									name:slist[n].name,
									layer:slist[n],
									x:cols[j],
									y:rows[i],
									width:cols[j+tmpcols] - cols[j],
									height:rows[i+1] - rows[i]
							};
							//插入layer数据
							trs[i].tds.push(info);
							j += tmpcols;
							if (j >= cleng-1) {
								j = 0;
                                    
							}
							colspan = 0;
							break;
						} else {
							colspan++;
						}
					}
					if (colspan > 0) {
						info = {
							colspan:colspan,
							x:cols[j-colspan],
							y:rows[i],
							width:cols[j] - cols[j-colspan],
							height:rows[i+1] - rows[i]
						};
						trs[i].tds.push(info);
					} else{
						if (j == 0) {
							i++;
						}
						break;
					}

				} else {
					info = {
						colspan:cleng-1-j,
						x:cols[j],
						y:rows[i],
						width:cols[cleng-1] - cols[j],
						height:rows[i+1] - rows[i]
					};
					trs[i].tds.push(info);
					j = 0;
				}

			}

		}
    

		if (i < rleng-1) {//没有内容图层的尾部处理


			if (j < cleng-1 && j > 0) {
				info = {
					colspan:cleng-1-j,
					x:cols[j],
					y:rows[i],
					width:cols[cleng-1] - cols[j],
					height:rows[i+1] - rows[i]
				};
				trs[i].tds.push(info);
				j = 0;
				i++;
			}
			if (i < rleng -1) {
				if (!trs[i]) {
					height = rows[i + 1] - rows[i];
					trs[i] = {height:height};
				}
				if (!trs[i].tds){
					trs[i].tds = [];
				}
				info = {
					colspan:cleng-1-j,
					x:cols[j],
					y:rows[i],
					width:cols[cleng-1] - cols[j],
					height:rows[i+1] - rows[i]
				};
				trs[i].tds.push(info);
			}
		}

		table.body = trs;
		table.head = [head];
		return table;
	},



	/**
	 * 对图层按属性排序
	 * @param cList 图层列表
	 * @param field [2] 根据此属性排序
	 * @param sortBy 升序还是降序
	 * @return {*} 排序后的数据 原数据不变
	 */
	sort: function(clist, field, sortBy) {
		var list=[], i, by;
		for(i = 0; i < clist.length; i++){
			list.push(clist[i]);
		}
		if (sortBy) {
			by = function(a,b){
				if (b[field[0]] !== a[field[0]]) {
					return b[field[0]] - a[field[0]];
				} else {
					return b[field[1]]-a[field[1]];
				}
			}
		} else {
			by = function(a,b){
				if (b[field[0]] !== a[field[0]]) {
					return a[field[0]] - b[field[0]];
				} else {
					return a[field[1]]-b[field[1]];
				}
			}
		}

		return list.sort(by);
	}

};

if (!Array.prototype.indexOf){
	Array.prototype.indexOf = function(item, i){
		i || (i = 0);
		var length = this.length;
		if (i < 0) {i = length + i;}
		for (; i < length; i++)
			if (this[i] === item) return i;
		return -1;
	};
}
