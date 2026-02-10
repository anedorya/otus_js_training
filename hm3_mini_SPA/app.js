const LOCAL_STORAGE_KEY = 'miniSPASettings';

// Функция для получения настроек по умолчанию
const getDefaultSettings = () => ({
    userName: 'Гость',
    theme: 'light',
    notificationsEnabled: true,
});

const loadSettingsFromStorage = () => {
    try {
        const storedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedSettings ? JSON.parse(storedSettings) : {};
    } catch (error) {
        console.error("Error loading settings from localStorage:", error);
        return {};
    }
};


const initialState = {
    // currentPage: '/',
    settings: {
        userName: 'Гость', 
        theme: 'light',
        notificationsEnabled: true,
        ...getDefaultSettings(),
        ...loadSettingsFromStorage() 
    }
};

const store = {
    state: initialState,
    setState(newState) {
        Object.assign(this.state, newState);
        console.log('State updated:', this.state);
        
        // Если обновились настройки, сохраняем их в localStorage
        if (newState.settings) {
            this.saveSettingsToStorage();
        }

        // При изменении состояния, автоматически обновляем UI
        handleLocation();
    },
    saveSettingsToStorage() {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state.settings));
        } catch (error) {
            console.error("Error saving settings to localStorage:", error);
        }
    },
    clearSettings() {
        // Сброс настроек до значений по умолчанию и удаление из localStorage
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        this.setState({ settings: getDefaultSettings() });
        console.log('Settings cleared.');
    }
};

// --- 2. Определения страниц (Page Definitions) ---

// Наполняем страницы контентом
const getSettingsPageHTML = () => `
    <h1>Настройки</h1>
    <p>Управление состоянием, которое сохраняется в вашем браузере.</p>
    <form id="settingsForm">
        <div>
            <label for="userName">Ваше имя:</label>
            <input type="text" id="userName" value="${store.state.settings.userName}" oninput="handleSettingChange(event)" placeholder="Введите ваше имя">
        </div>
        <div>
            <label for="theme">Тема:</label>
            <select id="theme" onchange="handleSettingChange(event)">
                <option value="light" ${store.state.settings.theme === 'light' ? 'selected' : ''}>Светлая</option>
                <option value="dark" ${store.state.settings.theme === 'dark' ? 'selected' : ''}>Темная</option>
            </select>
        </div>
        <div>
            <label>
                <input type="checkbox" id="notificationsEnabled" onchange="handleSettingChange(event)" 
                       ${store.state.settings.notificationsEnabled ? 'checked' : ''}>
                Включить уведомления
            </label>
        </div>
    </form>
`;


const pages = {
    '/': () => {
        // Определяем имя для отображения
        const displayUserName = store.state.settings.userName;
        return `
            <h1>Главная страница</h1>
            <p>Привет, ${displayUserName}!</p>
            <p>Текущая тема: ${store.state.settings.theme === 'dark' ? 'Темная 🌙' : 'Светлая ☀️'}</p>
            <p>Уведомления: ${store.state.settings.notificationsEnabled ? 'Включены' : 'Выключены'}</p>
            <button onclick="clearSettings()">Очистить настройки</button>
        `;
    },
    '/about': `
        <h1>О нас</h1>
        <p>Это страница с информацией о приложении.</p>
    `,
    '/news': `
        <h1>Новости</h1>
        <p>${store.state.settings.userName}, хотите почитать новости?</p>
        
    `,
    '/settings': getSettingsPageHTML,
    '404': `<h1>404 Страница не найдена</h1>
    `,
    '/contacts': `
        <h1>Наши контакты</h1>
        <p>Здесь должно быть указано, как нас найти.</p>
    `
};


function handleSettingChange(event) {
    const { id, value, type, checked } = event.target;
    
    // Определяем новое значение в зависимости от типа элемента формы (checkbox, select, input[text])
    const newValue = type === 'checkbox' ? checked : value;

    // Обновляем нужную часть объекта settings в глобальном сторе
    store.setState({
        settings: {
            ...store.state.settings,
            [id]: newValue
        }
    });
}

function clearSettings() {
    store.clearSettings();
    alert("Настройки очищены и сброшены до значений по умолчанию.");
}

// --- 4. Логика роутинга (Routing Logic) ---

const appDiv = document.getElementById('app');

const handleLocation = async () => {
    let path = window.location.pathname;

    if (path === "" || path.endsWith("index.html")) {
        path = '/';
    }
    // Если страница — функция (например, '/settings' или '/'), вызываем ее для получения актуального HTML
    const content = typeof pages[path] === 'function' ? pages[path]() : pages[path] || pages['404'];
    
    appDiv.innerHTML = content;
    store.setState({ currentPage: path });
};

const route = (event) => {
    event.preventDefault();
    let url = event.target.getAttribute('href');
    window.history.pushState({}, "", url);
    handleLocation();
};

window.onpopstate = handleLocation;
// document.addEventListener('DOMContentLoaded', handleLocation);


window.route = route;
window.handleSettingChange = handleSettingChange;
window.clearSettings = clearSettings;

