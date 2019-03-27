const stream = require('stream');

/** Implementing Readable Stream **/
const readableFeed = () => {
    const readableStream = new stream.Readable({
        objectMode: true
    });

    const updates = [
        { title: 'My Apple Pie' },
        { title: 'The best chorizo ever' }
    ];

    readableStream._read = (size) => {
        if (updates.length) {
            return readableStream.push(updates.shift())
        }

        readableStream.push(null);
    };

    return readableStream;
};


/** Consuming Readable Stream **/
const feed = readableFeed();

feed.on('readable', () => {
    let data = feed.read(); // pulls some data out of the internal buffer and returns it. If no data available to be read, null is returned.

    if (data) {
        console.log(JSON.stringify(data));
    }
});

feed.on('end', () => console.log('No more data!'));