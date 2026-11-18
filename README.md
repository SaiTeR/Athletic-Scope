# AthleteScope — лендинг

Статический сайт без сборки: один `index.html`, стили и скрипт формы.
Перенесён с Tilda (athletic-test.tilda.ws) и публикуется через GitHub Pages.

## Структура

```
index.html            разметка всех секций
assets/css/style.css  стили; цвета и размеры — переменные в :root в начале файла
assets/js/form.js     проверка и отправка формы заявки
assets/fonts/         шрифт Tilda Sans (OFL)
assets/img/           картинки и favicon
.nojekyll             отключает обработку Jekyll на GitHub Pages
```

## Как посмотреть локально

Из папки проекта:

```
python -m http.server 8000
```

и открыть http://localhost:8000. Можно и просто открыть `index.html` двойным кликом.

## Как править

- **Тексты** — прямо в `index.html`, секции подписаны комментариями.
- **Цвета** — переменные в начале `assets/css/style.css` (`--green`, `--bg`, `--text` и т.д.).
- **Картинки** — заменить файл в `assets/img/` с тем же именем или поменять путь в CSS
  (`hero.jpg` — фон первого экрана, `training.jpg` — фото в блоке «Больше, чем просто секундомер»).
- Все пути относительные (без `/` в начале) — так сайт работает по адресу вида
  `username.github.io/repo`. Новые пути пишите так же.

## Форма заявки

Сейчас форма проверяет поля, но **никуда не отправляет** — посетитель видит сообщение
«Приём заявок скоро откроется». Чтобы подключить приём, укажите адрес обработчика
в `index.html`:

```html
<form class="form" id="pilot-form" data-endpoint="https://formspree.io/f/XXXXXXX" novalidate>
```

Подойдёт любой сервис, принимающий POST с FormData и отвечающий 2xx:
Formspree, Web3Forms, Google Apps Script и т.п. Поля: `name`, `contact`, `organization`.

## Публикация на GitHub Pages

Один раз:

1. Создать репозиторий на github.com (например, `athletescope`), без README.
2. В папке проекта:
   ```
   git add .
   git commit -m "Лендинг AthleteScope"
   git remote add origin https://github.com/USERNAME/athletescope.git
   git push -u origin main
   ```
3. На GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   ветка `main`, папка `/ (root)` → Save.
4. Через 1–2 минуты сайт откроется по адресу `https://USERNAME.github.io/athletescope/`.

Дальше любой `git push` в `main` обновляет сайт автоматически.
