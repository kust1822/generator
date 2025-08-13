const NOTIFICATION_TIMEOUT = 3000;
const SLIDER_THRESHOLD = 50;
const TYPING_SPEED = 100;

const DOM = {
    notification: document.getElementById('notification'),
    previewVideo: document.getElementById('previewVideo'),
    resultText: document.getElementById('resultText'),
    cursor: document.querySelector('.cursor'),
    resultColor: document.getElementById('resultColor'),
    generationForm: document.querySelector('.generation__form'),
    slider: document.getElementById('mySlider'),
    sliderValue: document.getElementById('sliderValue'),
    resultGift: document.getElementById('resultGift'),
    resultGiftHowDo: document.getElementById('resultGiftHowDo'),
    giftText: document.getElementById('giftText'),
    giftTitle: document.getElementById('giftTitle'),
    howDoText: document.getElementById('howDoText'),
    getIdeaBtn: document.getElementById('getIdea')
};

const messageTemplates = {
    colleagues: {
        inspiring: {
            min: {
                gift: {
                    title: "Рабочий нейрогороскоп",
                    text: "Сгенерируйте коллегам предсказания на следующий год. Если звёзды напророчат кому-то новые возможности, добавьте в послание промокод от Яндекс Практикума. Так ваш праздничный прогноз превратится в новые навыки или даже целую профессию."
                },
                howDo: "Расскажите YandexGPT о коллегах и попросите её написать новогодние поздравления в стиле гороскопа. Чтобы предсказания получились интереснее, задайте в промте роль для нейросети (например, «представь, что ты астролог с десятилетним стажем») и добавьте побольше деталей."
            },
            max: {
                gift: {
                    title: "Церемония «Коллега года»",
                    text: "Сделайте презентацию с итогами года и почётными грамотами для каждого. Если в офис по сугробам добираться никто не хочет, церемонию можно провести онлайн и отправить курьера. Закажите доставку от Яндекс Go прямо перед звонком, чтобы грамоты приезжали коллегам во время встречи."
                },
                howDo: "Расскажите факты о коллегах YandexGPT — она поможет составить текст. Необязательно вспоминать серьёзные достижения: подойдёт самое большое количество шуток или съеденных печений. Презентацию может сгенерировать сервис Presentsimple. Загрузите документ с информацией: нейросеть подберёт дизайн и картинки, а вы отредактируете слайды так, как вам нравится."
            }
        },
        funny: {
            min: {
                gift: {
                    title: "Стикеры для рабочего чата",
                    text: "Даже не самые смешные фразы коллег могут заиграть новыми красками в формате стикеров. Современные сервисы облегчили нам задачу: теперь их можно сделать в несколько простых действий."
                },
                howDo: "Прошерстите переписки на предмет забавных фраз и сделайте скриншоты. Если не хотите создавать стикеры вручную, воспользуйтесь специальными приложениями (например, Sticker Maker). Загрузите картинки, а оно само создаст набор. Вуаля, теперь вы самый смешной человек на работе!"
            },
            max: {
                gift: {
                    title: "Офисные мемы",
                    text: "Превратите смешные рабочие ситуации в мемы, чтобы использовать в самые подходящие (или совсем неподходящие) моменты. Можно даже сделать адвент-календарь и отправлять коллегам поднимающие настроение картинки каждый день до конца декабря."
                },
                howDo: "Вам поможет простой редактор, например Bazaart. Найдите подходящую картинку и напишите узнаваемый для коллег текст. Бонус: в картинку можно вставить лицо коллеги — самостоятельно или с помощью нейросети типа TurboText. Будет веселее, мы проверили."
            }
        },
        useful: {
            min: {
                gift: {
                    title: "Напоминалка для рабочего чата",
                    text: "Иногда в потоке задач коллеги забывают не только поздравить друг друга с днём рождения, но и пообедать вовремя. Позаботьтесь о них и добавьте в рабочий чат бота, который напомнит о важном."
                },
                howDo: "В телеграме, например, в чат можно пригласить бота Skeddy. Чтобы он напоминал о важных делах, настройте сообщения: укажите, как часто и о чём он должен писать. А если кто-то настойчиво забывает пообедать, приложите к сообщению промокод на первый заказ в Яндекс Лавке. Сервис быстро привезёт готовый обед и даже горячий кофе с десертом."
            },
            max: {
                gift: {
                    title: "Новогодний диджитал-уголок",
                    text: "Если на работе не хватает праздничного настроения, создайте его сами. Опросите коллег и соберите в одном месте поздравления, идеи досуга для каникул, подборку новогодних фильмов или рецептов. Не забудьте поставить и украсить диджитал-ёлку."
                },
                howDo: "Используйте интерактивную онлайн-доску, например Яндекс Концепт. Откройте доступ к редактированию, чтобы коллеги могли добавить что-то от себя. Вот идея для каникул от нас: когда надоест пересматривать «Иронию судьбы», можно пройти бесплатные курсы от Яндекс Практикума и вернуться на работу с новыми навыками."
            }
        }
    },
    partner: {
        inspiring: {
            min: {
                gift: {
                    title: "Киновечер воспоминаний",
                    text: "Соберите подборку фильмов, значимых для вашей пары. Например, фильм, на который вы впервые вместе сходили в кино или который дольше всего обсуждали. Пригласите партнёра на диванное свидание и устройте ностальгический киномарафон."
                },
                howDo: "Оформите фильмы в презентацию. После тёплых разговоров можно что-то и пересмотреть — из списка, который у вас получился. Чтобы создать киноатмосферу, закажите в Яндекс Лавке попкорн с разными вкусами, сладкую газировку и другие снеки под любимые фильмы."
            },
            max: {
                gift: {
                    title: "Аудиогид по вашим местам",
                    text: "Пригласите партнёра на прогулку, а потом предложите наушник, в котором вместо обычной экскурсии будет ваша история. Когда замёрзнете, загляните в раздел «Куда сходить» от Яндекс Еды — он поможет найти поблизости хорошее место с горячим глинтвейном или вкусной едой. Возможно, оно станет ещё одной точкой для вашего следующего маршрута."
                },
                howDo: "Составьте маршрут по значимым для вас местам (например, кафе, где прошло первое свидание). К каждой точке напишите небольшой текст, который начинается как аудиоэкскурсия о месте или здании, но продолжается историей о вас. Наговорите всё это на диктофон или сделайте озвучку с помощью нейросети (например, Robivox или Murf), чтобы сохранить эффект неожиданности."
            }
        },
        funny: {
            min: {
                gift: {
                    title: "Нейробаллады о любви",
                    text: "Вы когда-нибудь посвящали кому-то песни? Самое время это сделать — ведь сейчас можно не горланить романсы под окном второй половинки, а обойтись более современными решениями."
                },
                howDo: "Зарифмуйте текст про партнёра с помощью YandexGPT, а потом загрузите его в генератор Suno. Поэкспериментируйте с жанрами: может, вашей пассии больше понравится баллада в стиле пост-панк или джаз?"
            },
            max: {
                gift: {
                    title: "Рандомайзер подарков",
                    text: "Нейросеть + маркетплейсы = оригинальный и неожиданный подарок для тех, у кого закончились идеи. Путешествовать по каталогу самому не надо, дайте YandexGPT сгенерировать артикул."
                },
                howDo: "Обговорите бюджет заранее и попросите нейросеть сгенерировать рандомное число (стоит заранее посмотреть, как выглядят артикулы на вашем любимом маркетплейсе). Вбейте это число в поиск по каталогу и посмотрите,  что достанется вам или вашему партнёру. Если укладывается в бюджет — заказывайте."
            }
        },
        useful: {
            min: {
                gift: {
                    title: "Маршрут для следующего путешествия",
                    text: "Составьте план вашего совместного приключения с помощью нейросети. Она сможет учесть интересы обоих, предложить небанальные достопримечательности, рассчитать бюджет и посоветовать, как удобнее всего добраться до нужных мест."
                },
                howDo: "Соберите все пожелания в промт и отдайте, например, YandexGPT — пусть думает. Чтобы побольше ходить, но успеть хорошенько полежать, чтобы к морю, но чтобы и горы тоже были, чтобы посетить все достопримечательности, но не забыть и про рестораны, и всё это за выходные... Удачи тебе, дорогая нейросеть!"
            },
            max: {
                gift: {
                    title: "Генератор ужинов",
                    text: "Со временем вопрос «что приготовить на ужин» может вызывать не вдохновение, а усталость. Обратитесь к нейросетям: они помогут составить меню как в ресторане, только с теми блюдами, которые нравятся вам обоим. А если готовить совсем не хочется, всегда можно заказать Яндекс Еду — там найдётся кухня на любой вкус и настроение."
                },
                howDo: "Расскажите YandexGPT про предпочтения вашей пары, а она соберёт подходящие рецепты. Можете попросить разделить их на группы по настроению (например, «Быстро приготовить», «Попробовать новое», «Любимая классика»), чтобы получилось настоящее меню. В день Х вам останется только определиться с пожеланиями и выбрать понравившееся блюдо."
            }
        }
    },
    family: {
        inspiring: {
            min: {
                gift: {
                    title: "Семейное онлайн-чаепитие",
                    text: "Выведите звонки семье на новый уровень. Пряничный домик к чаю или пачку конфет из детства быстро привезёт Яндекс Лавка. Даже сидя по разные стороны экрана, можно стать ближе, уплетая карамель и вспоминая, как бабушка накладывала вам конфеты в карманы втайне от родителей."
                },
                howDo: "Выберите удобное всем приложение и организуйте видеозвонок. А если вы живёте рядом, то есть другой вариант: помогите бабушке с дедушкой выйти на связь с дальними родственниками, которых они давно не видели."
            },
            max: {
                gift: {
                    title: "Книга семейных рецептов",
                    text: "Узнайте секреты приготовления бабушкиных пирожков, маминых котлет и фирменной дедушкиной ухи. Дополните их семейными историями — и получится памятная книга. Можно сразу вместе опробовать рецепты. Чтобы не тратить время на магазины, закажите все ингредиенты в Яндекс Еде."
                },
                howDo: "Тёплые иллюстрации для рецептов можно сгенерировать в Шедевруме или других нейросетях. Дальше можете загрузить это всё в презентацию и сохранить в формате PDF, чтобы вся семья могла открыть «книгу» с телефона. Или пойти дальше — и обратиться в настоящую типографию."
            }
        },
        funny: {
            min: {
                gift: {
                    title: "Набор открыток на весь год",
                    text: "От потока открыток хочется отключить уведомления в семейном чате? Пора задать тон этому флешмобу! Сгенерируйте свои  поздравительные картинки с отсылками на интересы родных. И посмеётесь, и покажете, что неплохо знаете свою семью."
                },
                howDo: "Изображения удобно генерировать в Шедевруме и подобных нейросетях, а потом отдельно добавить текст. Открытку можно сделать в определённом стиле — не скупитесь на детали в описании. Получится и поздравление для сестры в стиле известного комикса, и открытка с огромным сомом для дедушки-рыбака. Главное, не перепутать."
            },
            max: {
                gift: {
                    title: "Заставки для телефона",
                    text: "Помните школьные фотографии из двухтысячных, где детей переодевали в пиратов и мушкетёров? Вдохновимся работами мастеров: придумайте для вашей семьи забавное амплуа, найдите общее  фото и сделайте из него обои на телефон."
                },
                howDo: "Faceswapper.AI вам в помощь! Если не получается придумать, в каком образе представить родных, в базе есть много шаблонов. Персонажи «Звёздных войн»? Мафиозный клан? Футбольная команда? Выбор за вами."
            }
        },
        useful: {
            min: {
                gift: {
                    title: "Реставрация старых фотографий",
                    text: "Сделайте чёрно-белые архивные снимки вашей семьи цветными и соберите их в альбом — чтобы листать его за вечерним чаем и спорить, у кого же всё-таки прадедушкины глаза."
                },
                howDo: "Сервисов, которые покрасят чёрно-белые фото, много — выбирайте на свой вкус. Есть, например, ИИ-редакторы Hotspot и Neural.love. С первого раза может получиться неидеально — пригодится капелька терпения, как и в любых семейных делах."
            },
            max: {
                gift: {
                    title: "Урок цифровой грамотности",
                    text: "Научите семью пользоваться приложениями, которые облегчат им жизнь. Составьте памятку для родителей, как оплачивать ЖКХ по QR-коду, а для бабушки с дедушкой — как заказывать лекарства или продукты онлайн."
                },
                howDo: "Подумайте, что пригодится вашим близким. Может, бабушке не нужен онлайн-банк, но поможет приложение со скидками на продукты? Соберите пошаговый гайд со скриншотами. А ещё его можно распечатать и провести «живой урок» — ещё одна идея совместного времяпрепровождения."
            }
        }
    },
    friends: {
        inspiring: {
            min: {
                gift: {
                    title: "Плейлист о вашей дружбе",
                    text: "Соберите в одном месте ностальгические треки: песни, которые напоминают о первой совместной поездке, которые вы знаете наизусть или под которые вас всегда тянет выйти на танцпол."
                },
                howDo: "Собрать плейлист можно почти в любом музыкальном сервисе. Например, в Яндекс Музыке нужно зайти в «Коллекцию» и нажать на плюс: дальше останется только придумать название с описанием и подобрать треки."
            },
            max: {
                gift: {
                    title: "Вдохновляющий to-do лист",
                    text: "Соберите для друзей список приключений на следующий год: новые хобби, мероприятия, курсы. Если они давно хотели решиться на карьерные изменения, добавьте промокод на курсы Яндекс Практикума — чтобы новые навыки или целую профессию можно было освоить со скидкой."
                },
                howDo: "Если идей не хватает, обратитесь к YandexGPT. Расскажите ей, чем увлекается друг, что ему нравится и что хочется попробовать. Нейросеть предложит креативные идеи, которые можно адаптировать под себя."
            }
        },
        funny: {
            min: {
                gift: {
                    title: "Инструкция по эксплуатации друга",
                    text: "У вас есть друг, который никогда не берёт трубку? Или не любит пиццу с ананасами? Напишите к нему инструкцию — облегчите жизнь себе и другим. А заодно сделаете первый подарок, который можно и нужно передаривать."
                },
                howDo: "Вспомните особенности друга, загрузите их в YandexGPT и попросите нейросеть написать текст в стиле, к примеру, инструкции к стиральной машинке. Добавьте иллюстрации, где ваш друг изображён в виде схемы. Это можно сделать с помощью нейросети или вручную — в простом редакторе типа Bazaart."
            },
            max: {
                gift: {
                    title: "Выдуманный фотоальбом",
                    text: "Соберите известные фотографии и вставьте в них лица своих друзей. Будет весело посмотреть на них на Луне, на Ялтинской конференции или на картине Ван Гога — можно собрать целый альбом."
                },
                howDo: "Главное — ракурс. Смело экспериментируйте с фотографиями и нейросетями (вам пригодится, например, TurboText или Artguru AI). Если вы претендуете на звание «Король приколов» — вставляйте лица в видеомемы, отрывки сериалов и фильмов. Такое можно провернуть с помощью Faceswap и подобных нейросетей."
            }
        },
        useful: {
            min: {
                gift: {
                    title: "Совместный виш-лист",
                    text: "Создайте телеграм-канал для друзей, куда каждый может писать о том, что его бы порадовало: например, на день рождения хочется приставку, а сегодня — пиццу, чтобы скрасить грустный вечер. Увидите такой пост — заказывайте такси в Яндекс Go и отправляйтесь по нужному адресу (не забыв заехать в пиццерию)."
                },
                howDo: "Создайте закрытый телеграм-канал, пригласите всех друзей, назначьте их администраторами и откройте комментарии. Такой виш-лист станет не только кладезью мыслей, как порадовать близких на Новый год и другие праздники, но и местом смешных обсуждений и генерации новых идей."
            },
            max: {
                gift: {
                    title: "Календарь встреч",
                    text: "Взрослая жизнь — это когда с друзьями о встрече нужно договариваться минимум за месяц, чтобы все нашли силы и время. Предлагаем пойти дальше и сгенерировать календарь поводов на целый год вперёд (а ещё наказания за неявку)."
                },
                howDo: "Вспомните все памятные даты: от годовщины дружбы до самой запоминающейся вечеринки. Занесите их календарь и поделитесь доступом. Воспользуйтесь YandexGPT и попросите покреативить с наказаниями, чтобы друзья 100 раз подумали, прежде чем придумывать новые отмазки."
            }
        }
    }
};


// Функция для копирования промокода
function copyPromoCode(element, code) {
    navigator.clipboard.writeText(code)
        .then(() => {
            showNotification();
        })
        .catch(err => {
            console.error('Ошибка копирования:', err);
            alert("Не удалось скопировать промокод. Попробуйте вручную.");
        });
}

function showNotification() {
    if (!DOM.notification) return;

    DOM.notification.classList.add('show');
    setTimeout(() => {
        DOM.notification.classList.remove('show');
    }, NOTIFICATION_TIMEOUT);
}

// Оптимизированная загрузка видео
function setupVideo() {
    if (!DOM.previewVideo) return;

    function setVideoSource() {
        const isPortrait = window.innerHeight > window.innerWidth;
        const videoSrc = isPortrait ? 'src/assets/video/mobile.mp4' : 'src/assets/video/dekstop.mp4';
        const posterSrc = isPortrait ? 'src/assets/img/bg-video-mobile.jpg' : 'src/assets/img/bg-video-dekstop.jpg';

        DOM.previewVideo.setAttribute('src', videoSrc);
        DOM.previewVideo.setAttribute('poster', posterSrc);
        DOM.previewVideo.load();
        DOM.previewVideo.play().catch(e => console.log('Автовоспроизведение заблокировано:', e));
    }

    setVideoSource();
    window.addEventListener('resize', debounce(setVideoSource, 200));
}


function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Настройка радио кнопок
function setupRadioButtons() {
    const setupRandomRadio = (selector) => {
        const radios = document.querySelectorAll(selector);
        if (radios.length) {
            const randomIndex = Math.floor(Math.random() * radios.length);
            radios[randomIndex].checked = true;
        }
    };

    setupRandomRadio('input[name="mood"]');
    setupRandomRadio('input[name="recipient"]');
    setupRandomRadio('input[name="color"]');
}

// Настройка текстового поля с анимацией
function setupTextAnimation() {
    if (!DOM.resultText || !DOM.cursor) return;

    const optionTexts = {
        'colleagues': 'Сканируем офисные будни',
        'partner': 'Запущена программа ROMANTIKA',
        'family': 'Уровень тепла настроен на 100%',
        'friends': 'Анализируем весёлые воспоминания'
    };

    let currentAnimation = null;
    let currentText = '';
    DOM.cursor.style.display = 'none';

    function startTypeWriter(text) {
        DOM.cursor.style.display = 'none';
        DOM.resultText.textContent = '';
        currentText = text;

        let i = 0;
        function typing() {
            if (i < currentText.length) {
                DOM.resultText.textContent += currentText.charAt(i);
                i++;
                currentAnimation = setTimeout(typing, TYPING_SPEED);
            } else {
                DOM.cursor.style.display = 'inline-block';
                currentAnimation = null;
            }
        }
        typing();
    }

    const radios = document.querySelectorAll('input[name="recipient"]');
    if (radios.length) {
        const randomIndex = Math.floor(Math.random() * radios.length);
        startTypeWriter(optionTexts[radios[randomIndex].id]);

        radios.forEach(radio => {
            radio.addEventListener('change', function () {
                if (currentAnimation) clearTimeout(currentAnimation);
                startTypeWriter(optionTexts[this.id]);
            });
        });
    }
}

// Настройка цветного подарка
function setupColorGift() {
    if (!DOM.resultColor) return;

    const optionColors = {
        'green': {
            desktop: 'src/assets/img/gift-1.jpg',
            mobile: 'src/assets/img/gift-1-mobile.jpg'
        },
        'turquoise': {
            desktop: 'src/assets/img/gift-2.jpg',
            mobile: 'src/assets/img/gift-2-mobile.jpg'
        },
        'blue': {
            desktop: 'src/assets/img/gift-3.jpg',
            mobile: 'src/assets/img/gift-3-mobile.jpg'
        },
        'violet': {
            desktop: 'src/assets/img/gift-4.jpg',
            mobile: 'src/assets/img/gift-4-mobile.jpg'
        }
    };

    function isMobileView() {
        return window.innerWidth <= 767;
    }

    function updateImage() {
        const selectedRadio = document.querySelector('input[name="color"]:checked');
        if (!selectedRadio) return;

        const colorData = optionColors[selectedRadio.value];
        if (!colorData) return;

        const newSrc = isMobileView() ? colorData.mobile : colorData.desktop;

        if (DOM.resultColor.src !== newSrc) {
            DOM.resultColor.src = newSrc;
        }
    }

    updateImage();

    document.querySelectorAll('input[name="color"]').forEach(radio => {
        radio.addEventListener('change', updateImage);
    });

    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateImage, 200);
    });
}

// Обработка формы
function setupForm() {
    if (!DOM.generationForm) return;

    function handleFormChange() {
        resetGetIdeaButton();
    }

    document.querySelectorAll('input[name="recipient"], input[name="mood"], input[name="color"], #mySlider').forEach(input => {
        input.addEventListener('change', handleFormChange);
        input.addEventListener('input', handleFormChange);
    });

    DOM.generationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const recipientRadio = document.querySelector('input[name="recipient"]:checked');
        const moodRadio = document.querySelector('input[name="mood"]:checked');
        const sliderValue = parseInt(DOM.slider.value);

        if (!recipientRadio || !moodRadio) return;

        if (DOM.getIdeaBtn) {
            DOM.getIdeaBtn.textContent = 'Поменяйте что-то в фильтрах';
            DOM.getIdeaBtn.disabled = true;
        }

        const difficultyLevel = sliderValue < SLIDER_THRESHOLD ? 'min' : 'max';
        const template = messageTemplates[recipientRadio.value][moodRadio.value][difficultyLevel];

        DOM.giftText.textContent = template.gift.text;
        DOM.giftTitle.textContent = template.gift.title;
        DOM.howDoText.textContent = template.howDo;
        DOM.resultGift.classList.add('active');
    });
}

// Навигация между результатами
function setupResultNavigation() {
    document.getElementById('howDoBtn').addEventListener('click', () => {
        setTimeout(() => {
            DOM.resultGift.classList.remove('active');
            DOM.resultGiftHowDo.classList.add('active');
        }, 10);
    });

    document.getElementById('comeBack').addEventListener('click', () => {
        setTimeout(() => {
            DOM.resultGiftHowDo.classList.remove('active');
            DOM.resultGift.classList.add('active');
        }, 10);
    });
}

// Обновление input range
function setupSlider() {
    if (!DOM.slider || !DOM.sliderValue) return;

    function updateSliderValue() {
        DOM.sliderValue.textContent = DOM.slider.value < SLIDER_THRESHOLD ? 'min' : 'max';
    }

    DOM.slider.addEventListener('input', updateSliderValue);
    updateSliderValue();
}

// Поделиться ссылкой
function setupShare() {
    window.shareLink = function () {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                url: window.location.href
            }).catch(() => fallbackShare());
        } else {
            fallbackShare();
        }
    }

    function fallbackShare() {
        const tempInput = document.createElement('input');
        tempInput.value = window.location.href;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Ссылка скопирована в буфер обмена: ' + window.location.href);
    }

    const shareBtn = document.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareLink);
    }
}

// Функция для сброса состояния кнопки
function resetGetIdeaButton() {
    if (DOM.getIdeaBtn) {
        DOM.getIdeaBtn.textContent = 'Получить идею';
        DOM.getIdeaBtn.disabled = false;
    }
}

// Инициализация всего при загрузке
document.addEventListener('DOMContentLoaded', () => {
    setupVideo();
    setupRadioButtons();
    setupTextAnimation();
    setupColorGift();
    setupResultNavigation();
    setupSlider();
    setupShare();
    resetGetIdeaButton();
    setupForm();
});
