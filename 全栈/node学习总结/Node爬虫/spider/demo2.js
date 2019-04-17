const http = require('http');
const cheerio = require('cheerio');
const url = 'http://www.imooc.com/learn/75';

/*
[{
    chapterTitle: '',
    videos: [
        title: '',
        id: ''
    ]
}]
*/
function filterChapters(html) {
    const $ = cheerio.load(html);
    const chapters = $('.chapter');
    // console.log(chapters.length);
    let courseData = [];

    chapters.each(function(item) {
        const chapter = $(this);
        const chapterTitle = chapter.find('h3').text();
        const chapterDescription = chapter.find('.chapter-description').text();
        const videos = chapter.find('.video').children('li');

        let chapterData = {
            chapterTitle: chapterTitle,
            chapterDescription: chapterDescription,
            videos: []
        };
        videos.each(function(item) {
            let video = $(this).find('.J-media-item');
            const videoTitle = video.text();
            const videoId = video.attr('href').split('video/')[1];

            chapterData.videos.push({
                title: videoTitle,
                id: videoId
            });
        });

        courseData.push(chapterData);
    });

    return courseData;
}

function printCourseInfo(courseData) {
    courseData.forEach(function(item) {
        const chapterTitle = item.chapterTitle;
        const chapterDescription = item.chapterDescription;
        console.log(chapterTitle + '\n');
        console.log(chapterDescription + '\n');
        item.videos.forEach(function(item) {
            console.log('  【' + item.id + '】' + item.title + '\n');
        });
    });
}

http.get(url, function(res) {
    let html = '';
    res.on('data', function(data) {
        html += data;
    });
    res.on('end', function() {
        const courseData = filterChapters(html);
        printCourseInfo(courseData);
    });
}).on('error', function() {
    console.log('获取课程数据出错');
});