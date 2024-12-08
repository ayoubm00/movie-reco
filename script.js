document.addEventListener("DOMContentLoaded", function() {
    loadRecommendedMovies(); // تحميل الأفلام الموصى بها عند فتح الصفحة
});

// عندما يتم الضغط على زر البحث
document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-bar').value;
    if (query) {
        searchMovies(query); // إذا تم إدخال نص في شريط البحث
    }
});
document.getElementById('form-signup').addEventListener('submit', function(event) {
    event.preventDefault(); // منع الإرسال الافتراضي للنموذج

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('كلمتا المرور غير متطابقتين!');
    } else {
        alert('تم التسجيل بنجاح!');
        // هنا يمكنك إرسال البيانات إلى الخادم باستخدام fetch أو XMLHttpRequest
    }
});

// تحميل الأفلام الموصى بها عند فتح الصفحة أو الضغط على "Home"
function loadRecommendedMovies() {
    const apiKey = 'YOUR_API_KEY'; // استبدل بـ API Key الخاص بك
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => displayMovies(data.results))
        .catch(error => console.error('Error:', error));
}

// عرض الأفلام في قسم "Recommended for You"
function displayMovies(movies) {
    const recommendations = document.getElementById('recommendations');
    recommendations.innerHTML = ''; // مسح المحتوى القديم
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Rating: ${movie.vote_average}</p>
        `;
        recommendations.appendChild(movieCard);
    }); // وظيفة البحث عن الأفلام
    function searchMovies(query) {
        const apiKey = '8cfa73c7'; // استبدل بـ API Key الخاص بك
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
            .then(response => response.json())
            .then(data => displayMovies(data.results))
            .catch(error => console.error('Error:', error));
    }

    // وظيفة لعرض الأفلام
    function displayMovies(movies) {
        const resultsContainer = document.getElementById('movie-results');
        resultsContainer.innerHTML = ''; // مسح النتائج القديمة

        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>السنة: ${movie.release_date}</p>
            <p>التقييم: ${movie.vote_average}</p>
        `;
            resultsContainer.appendChild(movieCard);
        });
    }