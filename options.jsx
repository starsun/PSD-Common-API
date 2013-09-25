if(!OPTIONS){
    var OPTIONS = {};
}
OPTIONS.config = {
    output:'d:/psd2html/',
    upload:'upload',
    host:'127.0.0.1',
    port:2000,
    server:'preview.xxx.com',
    preview:'preview',
    image:{
        extension:'jpg',
        quality:60,
        format:SaveDocumentType.JPEG,
        PNG8:false
    },
    author:'sasa',
    pageType:0,  //0: 普通页面 1：盒子页面 2:table布局
    getExtension : function(op){
        switch(op.format){
            case SaveDocumentType.JPEG:
                return 'jpg';
            case SaveDocumentType.PNG:
                return 'png';
            default:
                return 'gif';
        }
    },
    getExportConfig : function(){
        var exportConfig = new ExportOptionsSaveForWeb();
        exportConfig.format = this.image.format;
        exportConfig.quality = this.image.quality;
        exportConfig.PNG8 = this.image.PNG8;
        return exportConfig;
    }
};
