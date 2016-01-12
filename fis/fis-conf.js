//Step 1. 取消下面的注释开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
// fis.config.set('modules.postpackager', 'simple');

//通过pack设置干预自动合并结果，将公用资源合并成一个文件，更加利于页面间的共用

//Step 2. 取消下面的注释开启pack人工干预
// fis.config.set('pack', {
//     'pkg/lib.js': [
//         '/lib/mod.js',
//         '/modules/underscore/**.js',
//         '/modules/backbone/**.js',
//         '/modules/jquery/**.js',
//         '/modules/vendor/**.js',
//         '/modules/common/**.js'
//     ]
// });

//Step 3. 取消下面的注释可以开启simple对零散资源的自动合并
// fis.config.set('settings.postpackager.simple.autoCombine', true);


//Step 4. 取消下面的注释开启图片合并功能
// fis.config.set('roadmap.path', [{
//     reg: '**.css',
//     useSprite: true
// }]);
// fis.config.set('settings.spriter.csssprites.margin', 20);


// project ignores
fis.set('project.ignore', [
	'package.json',
	'fis-conf.js',
	'.gitignore',
	'css/libs-css/**',
	'css/tpl-css/**',
	'config/**',
	'php/**',
	'api/**'
]);


// 所有CSS
// fis.match('/css/(**.css)', {
// 发布到
// 	release: '/app/assets/stylesheets/$1'
// });
// fis.match('js/(**.js)', {
//     release: '/app/assets/javascripts/$1'
// });
// 所有images下的图片
// fis.match('/images/(**)', {
// 发布到
// 	release: '/app/assets/images/$1',
// 访问url
// 	url: '/assets/$1'
// });


// 不需要编译的文件
fis.match('{/css/tpl-css/**,/css/libs-css/**}', {
	release: false
});


// 启用插件相对路径
// 需要安装releative插件
fis.hook('relative');
// 让所有文件，都使用相对路径。
fis.match('**', {
	relative: true
});
// fis.match('/tpl/(**.html)', {
// 	relative: '../../assets/'
// });


// 对 js、css、png 图片引用 URL 添加 md5 戳
// fis.match('*.{js,css,png}', {
//   useHash: true
// });


// 文件压缩
// fis.match('*.js', {
//   // fis-optimizer-uglify-js 插件进行压缩，已内置
//   optimizer: fis.plugin('uglify-js')
// });


// fis.match('*.css', {
//   // fis-optimizer-clean-css 插件进行压缩，已内置
//   optimizer: fis.plugin('clean-css')
// });


// fis.match('*.png', {
//   // fis-optimizer-png-compressor 插件进行压缩，已内置
//   optimizer: fis.plugin('png-compressor')
// });