const {merge}=require("webpack-merge");
const CopyPlugin=require("copy-webpack-plugin");

const devConfig=require("./webpack.config.js");

delete devConfig.devtool;
module.exports=merge(devConfig,{
    mode:"production",
    output:{
        path:`${__dirname}/release/build`,
        filename:"[name]-build.js"
    },
    plugins:[
        new CopyPlugin({
            patterns:[
                {
                    from:"popup/popup-index.html",
                    to:"../popup/"
                },
                {
                    from:"link-opener/link-open-index.html",
                    to:"../link-opener/"
                },
                {
                    from:"manifest.json",
                    to:".."
                },
            ]
        })
    ]
});