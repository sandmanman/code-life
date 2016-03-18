/*
 * Example:
 *   - image fill; image should be squared; it will be stretched to SxS size, where S - size of the widget
 *   - fallback color fill (when image is not loaded)
 *   - custom widget size (default is 100px)
 *   - custom circle thickness (default is 1/14 of the size)
 *   - reverse drawing mode
 *   - custom animation start value
 *   - usage of "data-" attributes
 */
$('.fifth.circle').circleProgress({
    startAngle: Math.PI / 1, // Math.PI PI圆周率π属性语法
    //value: 0.1,
    size: 260,
    lineCap: 'round',
    fill: {color: '#f1bc00'}, //填充色
    emptyFill: 'rgba(44, 200, 206, .6)', //底色
    thickness: 18 //弧宽
    // all other config options were taken from "data-" attributes
    // options passed in config object have higher priority than "data-" attributes
    // "data-" attributes are taken into account only on init (not on update/redraw)
    // "data-fill" (and other object options) should be in valid JSON format
}).on('circle-animation-progress', function() {
    value = $('.fifth.circle').circleProgress('value');
    $(this).find('strong').html(parseInt(value * 100));
});
