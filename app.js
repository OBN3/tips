let topics = [];

async function fetchTopics() {
    try {
        const response = await fetch('https://obn3.github.io/tips/topics.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        topics = await response.json();
        displayTopics();
        createKeywords();
    } catch (error) {
        console.error('Error fetching topics:', error);
    }
}

function displayTopics() {
    const topicsDiv = document.getElementById('topics');
    topicsDiv.innerHTML = '';
    topics.forEach((topic, index) => {
        const topicDiv = document.createElement('div');
        topicDiv.className = 'topic';
        topicDiv.textContent = topic.title;
        topicDiv.dataset.index = index;
        topicDiv.onclick = () => toggleContent(index);
        topicsDiv.appendChild(topicDiv);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'content';
        contentDiv.id = `content-${index}`;
        contentDiv.innerHTML = topic.content;
        topicsDiv.appendChild(contentDiv);
    });
}

function toggleContent(index) {
    const allTopics = document.querySelectorAll('.topic');
    const allContents = document.querySelectorAll('.content');
    
    allTopics.forEach((topic) => {
        if (topic.dataset.index === index.toString()) {
            topic.classList.add('active');
        } else {
            topic.classList.remove('active');
        }
    });

    allContents.forEach((content) => {
        if (content.id === `content-${index}`) {
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        } else {
            content.style.display = 'none';
        }
    });
}

function searchTopics() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const topicsDiv = document.getElementById('topics');
    topicsDiv.innerHTML = '';
    topics.forEach((topic, index) => {
        if (topic.title.toLowerCase().includes(searchTerm) || topic.content.toLowerCase().includes(searchTerm)) {
            const topicDiv = document.createElement('div');
            topicDiv.className = 'topic';
            topicDiv.textContent = topic.title;
            topicDiv.dataset.index = index;
            topicDiv.onclick = () => toggleContent(index);
            topicsDiv.appendChild(topicDiv);

            const contentDiv = document.createElement('div');
            contentDiv.className = 'content';
            contentDiv.id = `content-${index}`;
            contentDiv.innerHTML = topic.content;
            topicsDiv.appendChild(contentDiv);
        }
    });
}

function clearSearch() {
    document.getElementById('search').value = '';
    displayTopics();
    resetKeywords();
}

function createKeywords() {
    const keywordsDiv = document.getElementById('keywords');
    keywordsDiv.innerHTML = '';
    
            const predefinedKeywords = [
                "צילום", "מצלמה", "עדשה", "תאורה", "קומפוזיציה",
                "חשיפה", "מיקוד", "זום", "פנורמה", "דיוקן", "רצף",
                "פלאש", "עריכה", "אפקטים", "טשטוש", "רקע", "פוקוס",
                "אייפון", "אנדרואיד", "ניקוי", "סמארטפון", "סלפי"
            ];
    
    predefinedKeywords.forEach(keyword => {
        const keywordSpan = document.createElement('span');
        keywordSpan.className = 'keyword';
        keywordSpan.textContent = keyword;
        keywordSpan.onclick = () => {
            document.getElementById('search').value = keyword;
            searchTopics();
            highlightKeyword(keywordSpan);
        };
        keywordsDiv.appendChild(keywordSpan);
    });
}

function highlightKeyword(element) {
    document.querySelectorAll('.keyword').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
}

function resetKeywords() {
    document.querySelectorAll('.keyword').forEach(el => el.classList.remove('selected'));
}

const help = `
<b>ברוכים הבאים לאפליקצייה שתשפר את הצילום שלכם!</b><br><br>
כדי להשתמש באפליקציה:<br>
1. ניתן ללחוץ על נושא ולקרוא את תוכנו<br>
2. ניתן ללחוץ על מילת מפתח ולקבל רשימת נושאים<br>
3. ניתן לערוך חיפוש אחר מושג<br>
<br><br>
שאלות? דברו איתי <a href="mailto:ofirbn@post.com">במייל</a>
`;

document.getElementById('search').addEventListener('input', searchTopics);
document.getElementById('clear-search').addEventListener('click', clearSearch);

document.body.style.userSelect = 'none';
document.body.style.webkitUserSelect = 'none';
document.body.style.msUserSelect = 'none';
document.body.style.mozUserSelect = 'none';

const modal = document.getElementById("helpModal");
const helpButton = document.getElementById("help-button");
const closeBtn = document.getElementsByClassName("close")[0];
const helpContent = document.getElementById("helpContent");

helpButton.onclick = function() {
    modal.style.display = "block";
    helpContent.innerHTML = help;
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

fetchTopics();
