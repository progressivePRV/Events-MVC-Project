const {DateTime} = require("luxon");
const {v4:uuidv4} = require("uuid");

//DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
//DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)
//DateTime.now().toLocaleString(DateTime.DATE_MED)
//https://moment.github.io/luxon/docs/manual/formatting.html

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getFutureDate(){
    let future = {
        months:getRandomInt(3),
        days:getRandomInt(10),
    }
    return future;
}

function getFutureTime(start=0){
    let future = {
        hours:getRandomInt(start+2),
        minutes:getRandomInt(10),
    }
    return future;
}

const connections = [
    {
        id:uuidv4(),
        title:'Learning Photoshop',
        category:'WorkShops',
        details:'numquam dicta possimus ad tenetur libero quae ipsum perspiciatis maxime ab necessitatibus ipsam, earum blanditiis voluptatem repudiandae? Optio illo porro minima aliquam soluta hic pariatur, et rerum, ipsum harum est saepe cumque vel facilis aspernatur at amet inventore',
        date:DateTime.now().plus(getFutureDate()).toFormat('yyyy-MM-dd'),
        startTime: DateTime.now().plus(getFutureTime()).toLocaleString(DateTime.TIME_24_SIMPLE),
        endTime: DateTime.now().plus(getFutureTime(2)).toLocaleString(DateTime.TIME_24_SIMPLE),
        hostName:'Tom',
        location:'Woodwards 130',
        image:'https://picsum.photos/id/300/300',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id:uuidv4(),
        title:'Basics of AWS',
        category:'WorkShops',
        details:'numquam dicta possimus ad tenetur libero quae ipsum perspiciatis maxime ab necessitatibus ipsam, earum blanditiis voluptatem repudiandae? Optio illo porro minima aliquam soluta hic pariatur, et rerum, ipsum harum est saepe cumque vel facilis aspernatur at amet inventore',
        date:DateTime.now().plus(getFutureDate()).toFormat('yyyy-MM-dd'),
        startTime: DateTime.now().plus(getFutureTime()).toLocaleString(DateTime.TIME_24_SIMPLE),
        endTime: DateTime.now().plus(getFutureTime(2)).toLocaleString(DateTime.TIME_24_SIMPLE),
        hostName:'Tom',
        location:'Woodwards 180',
        image:'https://picsum.photos/id/301/300',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id:uuidv4(),
        title:'Basics of Google Cloud',
        category:'WorkShops',
        details:'numquam dicta possimus ad tenetur libero quae ipsum perspiciatis maxime ab necessitatibus ipsam, earum blanditiis voluptatem repudiandae? Optio illo porro minima aliquam soluta hic pariatur, et rerum, ipsum harum est saepe cumque vel facilis aspernatur at amet inventore',
        date:DateTime.now().plus(getFutureDate()).toFormat('yyyy-MM-dd'),
        startTime: DateTime.now().plus(getFutureTime()).toLocaleString(DateTime.TIME_24_SIMPLE),
        endTime: DateTime.now().plus(getFutureTime(2)).toLocaleString(DateTime.TIME_24_SIMPLE),
        hostName:'Tom',
        location:'Woodwards 226',
        image:'https://picsum.photos/id/309/300',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id:uuidv4(),
        title:'Coffee Hour',
        category:'Networking',
        details:'numquam dicta possimus ad tenetur libero quae ipsum perspiciatis maxime ab necessitatibus ipsam, earum blanditiis voluptatem repudiandae? Optio illo porro minima aliquam soluta hic pariatur, et rerum, ipsum harum est saepe cumque vel facilis aspernatur at amet inventore',
        date:DateTime.now().plus(getFutureDate()).toFormat('yyyy-MM-dd'),
        startTime: DateTime.now().plus(getFutureTime()).toLocaleString(DateTime.TIME_24_SIMPLE),
        endTime: DateTime.now().plus(getFutureTime(2)).toLocaleString(DateTime.TIME_24_SIMPLE),
        hostName:'Tom',
        location:'BioInformatics 180',
        image:'https://picsum.photos/id/304/300',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id:uuidv4(),
        title:'Game Night',
        category:'Networking',
        details:'numquam dicta possimus ad tenetur libero quae ipsum perspiciatis maxime ab necessitatibus ipsam, earum blanditiis voluptatem repudiandae? Optio illo porro minima aliquam soluta hic pariatur, et rerum, ipsum harum est saepe cumque vel facilis aspernatur at amet inventore',
        date:DateTime.now().plus(getFutureDate()).toFormat('yyyy-MM-dd'),
        startTime: DateTime.now().plus(getFutureTime()).toLocaleString(DateTime.TIME_24_SIMPLE),
        endTime: DateTime.now().plus(getFutureTime(2)).toLocaleString(DateTime.TIME_24_SIMPLE),
        hostName:'Tom',
        location:'BioInformatics 216',
        image:'https://picsum.photos/id/305/300',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id:uuidv4(),
        title:'Mid Semester Networking',
        category:'Networking',
        details:'numquam dicta possimus ad tenetur libero quae ipsum perspiciatis maxime ab necessitatibus ipsam, earum blanditiis voluptatem repudiandae? Optio illo porro minima aliquam soluta hic pariatur, et rerum, ipsum harum est saepe cumque vel facilis aspernatur at amet inventore',
        date:DateTime.now().plus(getFutureDate()).toFormat('yyyy-MM-dd'),
        startTime: DateTime.now().plus(getFutureTime()).toLocaleString(DateTime.TIME_24_SIMPLE),
        endTime: DateTime.now().plus(getFutureTime(2)).toLocaleString(DateTime.TIME_24_SIMPLE),
        hostName:'Tom',
        location:'BioInformatics 310',
        image:'https://picsum.photos/id/306/300',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }
];

exports.allConnections = () => connections;

exports.FindConnectionByID = id => connections.find(conn=> conn.id===id);

exports.UpdateConnectionById = (id,newConnection) => {
    let conn = this.FindConnectionByID(id);
    if(conn){
        conn.title = newConnection.title;
        conn.startTime = newConnection.startTime;
        conn.endTime = newConnection.endTime;
        conn.location = newConnection.location;
        conn.details = newConnection.details;
        conn.date = newConnection.date;
        conn.hostName = newConnection.hostName;
        conn.category = newConnection.category;
        conn.image = newConnection.image;
        // excluding image as it same for all
        return true;
    }else{
        return false;
    }
};

exports.DeleteConnectionById = (id) =>{
    let i = connections.findIndex(con => id===con.id);
    if(i!==-1){
        connections.splice(i,1);
        return true;
    }else{
        return false;
    }
};

exports.save = (conn) =>{
    conn.id=uuidv4();
    conn.createdAt= DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    // replacing the image with default one as saving an image is still left.
    // conn.image= 'AWS-Logo.png';
    console.log("before saving=>",conn);
    connections.push(conn);
};